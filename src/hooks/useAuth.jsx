
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserStore } from '@/stores/userStore';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { users, getRolePermissions } = useUserStore();
  const [supabaseUser, setSupabaseUser] = useState(null);
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setSupabaseUser(session?.user ?? null);
        
        // Don't make other Supabase calls directly in the callback
        if (session?.user) {
          setTimeout(() => {
            loadUserData(session.user.id);
          }, 0);
        } else {
          setCurrentUser(null);
          setPermissions({});
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  // Watch for user store changes
  useEffect(() => {
    if (supabaseUser && currentUser) {
      // Update permissions if user role changes
      const rolePermissions = getRolePermissions(currentUser.role) || {};
      setPermissions(rolePermissions);
    }
  }, [users, currentUser, supabaseUser]);

  const loadUserData = (userId) => {
    setIsLoading(true);
    
    try {
      // For now, we're using local user data until we set up user profiles in Supabase
      // In the future, this should query the database for the user profile
      
      // First look for a matching Supabase ID
      let userFromStore = users.find(user => user.id === userId);
      
      // If not found, try to match by email
      if (!userFromStore && supabaseUser?.email) {
        userFromStore = users.find(user => user.email === supabaseUser.email);
      }
      
      if (userFromStore) {
        setCurrentUser(userFromStore);
        localStorage.setItem('currentUser', userFromStore.id);
        
        // Get permissions based on role
        const rolePermissions = getRolePermissions(userFromStore.role) || {};
        setPermissions(rolePermissions);
      } else {
        // Fallback to admin if user not found
        const adminUser = users.find(user => user.role === "Administrator");
        if (adminUser) {
          setCurrentUser(adminUser);
          localStorage.setItem('currentUser', adminUser.id);
          
          const rolePermissions = getRolePermissions(adminUser.role) || {};
          setPermissions(rolePermissions);
        } else {
          // No valid user found, clear auth
          logout();
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setCurrentUser(null);
      setPermissions({});
    } finally {
      setIsLoading(false);
    }
  };
  
  const hasPermission = (module, action) => {
    if (!currentUser) return false;
    if (currentUser.role === "Administrator") return true;
    return permissions[module]?.[action] === true;
  };
  
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      localStorage.setItem('isAuthenticated', 'true');
      
      return { error: null };
    } catch (error) {
      toast({
        title: "Login error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };
  
  const signup = async (email, password, userData) => {
    try {
      // Register with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            role: userData.role || 'Pharmacy Technician', // Default role
          }
        }
      });
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      // Add user to local store for now
      // In production, we would use a Supabase trigger to create a profile
      const newUser = {
        id: data.user?.id || "",
        name: userData.name,
        email: email,
        role: userData.role || "Pharmacy Technician",
        status: "active",
        lastLogin: new Date().toISOString()
      };
      
      useUserStore.getState().addUser(newUser);
      
      return { error: null };
    } catch (error) {
      toast({
        title: "Signup error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setSupabaseUser(null);
    setSession(null);
    setPermissions({});
  };
  
  const value = {
    currentUser,
    supabaseUser,
    session,
    isAuthenticated: !!currentUser && !!supabaseUser,
    isLoading,
    hasPermission,
    login,
    signup,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;

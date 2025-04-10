
import { useState, useEffect, createContext, useContext } from 'react';
import { useUserStore } from '@/stores/userStore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { users } = useUserStore();
  const [currentUser, setCurrentUser] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadUserData = () => {
      setIsLoading(true);
      
      try {
        // Check for authenticated user
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const currentUserId = localStorage.getItem('currentUser');
        
        if (isAuthenticated && currentUserId) {
          const userFromStore = users.find(user => user.id === currentUserId);
          
          if (userFromStore) {
            setCurrentUser(userFromStore);
            
            // Get permissions based on role
            const rolePermissions = useUserStore.getState().getRolePermissions(userFromStore.role) || {};
            setPermissions(rolePermissions);
          } else {
            // Fallback to admin if user not found
            const adminUser = users.find(user => user.role === "Administrator");
            if (adminUser) {
              setCurrentUser(adminUser);
              localStorage.setItem('currentUser', adminUser.id);
              
              const rolePermissions = useUserStore.getState().getRolePermissions(adminUser.role) || {};
              setPermissions(rolePermissions);
            } else {
              // No valid user found, clear auth
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('currentUser');
              setCurrentUser(null);
              setPermissions({});
            }
          }
        } else {
          setCurrentUser(null);
          setPermissions({});
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setCurrentUser(null);
        setPermissions({});
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [users]);
  
  const hasPermission = (module, action) => {
    if (!currentUser) return false;
    if (currentUser.role === "Administrator") return true;
    return permissions[module]?.[action] === true;
  };
  
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setPermissions({});
  };
  
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    hasPermission,
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

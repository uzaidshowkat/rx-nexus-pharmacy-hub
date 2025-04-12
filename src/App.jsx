
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Customers from "./pages/Customers";
import Prescriptions from "./pages/Prescriptions";
import Returns from "./pages/Returns";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Compliance from "./pages/Compliance";
import EPrescriptions from "./pages/EPrescriptions";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Protected route component to wrap routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Render children if authenticated
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/e-prescriptions" element={<EPrescriptions />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

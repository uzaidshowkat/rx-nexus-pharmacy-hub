
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<NotFound />} />
            <Route path="/sales" element={<NotFound />} />
            <Route path="/purchases" element={<NotFound />} />
            <Route path="/customers" element={<NotFound />} />
            <Route path="/prescriptions" element={<NotFound />} />
            <Route path="/returns" element={<NotFound />} />
            <Route path="/alerts" element={<NotFound />} />
            <Route path="/reports" element={<NotFound />} />
            <Route path="/compliance" element={<NotFound />} />
            <Route path="/e-prescriptions" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

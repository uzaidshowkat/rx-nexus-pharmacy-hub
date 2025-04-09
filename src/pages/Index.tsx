
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast when redirecting
    toast({
      description: "Welcome to RxNexus! Redirecting to dashboard...",
    });
    
    // Redirect to dashboard page
    const redirectTimer = setTimeout(() => {
      navigate('/dashboard');
    }, 1500); // Give the toast a moment to be seen
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">RxNexus</h1>
        <p className="text-muted-foreground mt-2">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default Index;

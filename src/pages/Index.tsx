
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast when redirecting
    toast({
      title: "Welcome to RxNexus",
      description: "Redirecting to dashboard...",
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
        <h1 className="text-4xl font-bold mb-4">RxNexus</h1>
        <p className="text-lg text-muted-foreground">Your complete pharmacy management solution</p>
        <div className="mt-8">
          <div className="animate-pulse text-muted-foreground">
            Redirecting to dashboard...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

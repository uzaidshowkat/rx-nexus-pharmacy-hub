
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard page instead of login
    navigate('/dashboard');
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

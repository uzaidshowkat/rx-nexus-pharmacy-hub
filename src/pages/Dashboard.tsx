
import React from 'react';
import { 
  Package, 
  CreditCard, 
  Users, 
  FileText, 
  ShieldCheck
} from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import RecentSalesList from '@/components/dashboard/RecentSalesList';
import ExpiryAlerts from '@/components/dashboard/ExpiryAlerts';
import LowStockItems from '@/components/dashboard/LowStockItems';
import SalesChart from '@/components/dashboard/SalesChart';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your pharmacy management system.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Inventory Items"
          value="1,285"
          icon={<Package size={20} />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Today's Sales"
          value="$3,428"
          icon={<CreditCard size={20} />}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Active Customers"
          value="842"
          icon={<Users size={20} />}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Pending Prescriptions"
          value="24"
          icon={<FileText size={20} />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <ExpiryAlerts />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentSalesList />
        </div>
        <div className="lg:col-span-1">
          <LowStockItems />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

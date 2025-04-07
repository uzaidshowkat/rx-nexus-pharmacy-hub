
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  Activity, 
  Users, 
  ShoppingCart, 
  Package, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  ShieldCheck,
  Mail,
  RotateCcw,
  Pill
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();

  const mainMenuItems = [
    { icon: Activity, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: ShoppingCart, label: 'Sales', path: '/sales' },
    { icon: Pill, label: 'Purchases', path: '/purchases' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: FileText, label: 'Prescriptions', path: '/prescriptions' },
  ];

  const managementMenuItems = [
    { icon: RotateCcw, label: 'Returns', path: '/returns' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: ShieldCheck, label: 'Compliance', path: '/compliance' },
    { icon: Mail, label: 'E-Prescriptions', path: '/e-prescriptions' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="py-6 px-6">
        <div className="flex items-center space-x-2">
          <Pill size={24} className="text-pharma-600" />
          <span className="font-bold text-xl">RxNexus</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">Pharmacy Management System</div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "flex items-center space-x-3",
                        location.pathname === item.path && "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "flex items-center space-x-3",
                        location.pathname === item.path && "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-6 py-4 border-t text-xs text-center text-muted-foreground">
          RxNexus v1.0 © 2025
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;

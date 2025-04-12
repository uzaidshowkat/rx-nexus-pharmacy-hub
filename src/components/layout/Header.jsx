
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search, Settings, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { useInventoryStore } from '@/stores/inventoryStore';
import { useCustomerStore } from '@/stores/customerStore';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// New component for notifications
const NotificationsMenu = () => {
  const { items } = useInventoryStore();
  const today = new Date();
  
  // Generate notifications for low stock and expiring items
  const lowStockItems = items.filter(item => item.stock <= item.reorderLevel);
  const expiringItems = items.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  });
  
  const notifications = [
    ...lowStockItems.map(item => ({
      id: `low-stock-${item.id}`,
      title: 'Low Stock Alert',
      message: `${item.name} is running low (${item.stock} left)`,
      time: new Date().toISOString(),
      type: 'warning',
      read: false
    })),
    ...expiringItems.map(item => ({
      id: `expiry-${item.id}`,
      title: 'Expiry Alert',
      message: `${item.name} will expire on ${new Date(item.expiryDate).toLocaleDateString()}`,
      time: new Date().toISOString(),
      type: 'danger',
      read: false
    }))
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleNotificationClick = (notification) => {
    // Mark as read logic would go here
    if (notification.type === 'warning') {
      toast({
        title: "Low Stock Item",
        description: notification.message,
      });
    } else {
      toast({
        title: "Expiring Item",
        description: notification.message,
      });
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="py-2 px-4 font-medium border-b">
          Notifications ({notifications.length})
        </div>
        {notifications.length > 0 ? (
          <div className="max-h-[300px] overflow-auto">
            {notifications.map(notification => (
              <DropdownMenuItem 
                key={notification.id} 
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${notification.type === 'danger' ? 'text-red-600' : 'text-amber-600'}`}>
                      {notification.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification.time).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{notification.message}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            No new notifications
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center font-medium cursor-pointer" onClick={() => toast({ title: "All notifications marked as read" })}>
          Mark all as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const { getItemsByCategoryOrSearch } = useInventoryStore();
  const { customers } = useCustomerStore();

  const handleLogout = async () => {
    // Log out using Supabase
    await logout();
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Navigate to login page
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }
    
    const items = getItemsByCategoryOrSearch(searchQuery);
    const foundCustomers = customers.filter(customer => 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Show results count in a toast
    toast({
      title: "Search Results",
      description: `Found ${items.length} items and ${foundCustomers.length} customers`,
    });
    
    // Navigate to search results page or open a modal with results
    if (items.length > 0) {
      navigate('/inventory', { state: { searchQuery } });
    } else if (foundCustomers.length > 0) {
      navigate('/customers', { state: { searchQuery } });
    } else {
      toast({
        title: "No Results",
        description: "No items or customers found for your search",
      });
    }
  };

  return (
    <header className="border-b bg-white flex items-center justify-between p-4">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="flex items-center border rounded-md px-3 py-1.5 bg-gray-50 w-64 lg:w-96">
            <Search size={18} className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" variant="ghost" className="ml-1">
            <Search size={18} />
          </Button>
        </form>
      </div>
      <div className="flex items-center space-x-3">
        <NotificationsMenu />
        
        <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
          <Settings size={20} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-3 py-2 text-sm font-medium border-b mb-1">
              {currentUser?.name || "User"}
              <div className="text-xs font-normal text-muted-foreground">{currentUser?.role || "User"}</div>
            </div>
            <DropdownMenuItem onClick={() => navigate('/settings?tab=profile')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

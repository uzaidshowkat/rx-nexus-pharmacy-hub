
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, UserPlus, Calendar } from "lucide-react";
import { customers } from '@/components/purchases/PurchaseData';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerViewDialog from '@/components/customers/CustomerViewDialog';
import { toast } from "@/hooks/use-toast";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateRegistered: string;
  prescriptions: number;
  lastVisit: string;
}

const Customers = () => {
  const [customersList, setCustomersList] = useState<Customer[]>(customers);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Calculate customer metrics
  const totalCustomers = customersList.length;
  const newCustomersThisMonth = customersList.filter(customer => {
    const registeredDate = new Date(customer.dateRegistered);
    const today = new Date();
    return (
      registeredDate.getMonth() === today.getMonth() &&
      registeredDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const visitorsThisWeek = customersList.filter(customer => {
    const visitDate = new Date(customer.lastVisit);
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    return visitDate >= sevenDaysAgo && visitDate <= today;
  }).length;

  const activeCustomers = customersList.filter(customer => 
    customer.prescriptions > 0
  ).length;

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
    
    // For demo purposes, just show a toast since we haven't implemented the edit dialog
    toast({
      title: "Edit Customer",
      description: `Editing customer ${customer.name}`,
    });
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomersList(customersList.filter(customer => customer.id !== id));
    
    toast({
      title: "Customer Deleted",
      description: "The customer has been removed successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Customer Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Customer
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">registered patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserPlus className="h-4 w-4 mr-2 text-primary" />
              New This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newCustomersThisMonth}</div>
            <p className="text-xs text-muted-foreground">newly registered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Recent Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorsThisWeek}</div>
            <p className="text-xs text-muted-foreground">past 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">customers with active prescriptions</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>Manage your pharmacy customers and patients</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerTable 
            customers={customersList}
            onView={handleViewCustomer}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
          />
        </CardContent>
      </Card>
      
      <CustomerViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        customer={selectedCustomer}
        onEdit={handleEditCustomer}
      />
    </div>
  );
};

export default Customers;

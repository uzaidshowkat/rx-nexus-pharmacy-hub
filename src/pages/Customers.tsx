
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Customers = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Customer Management</h1>
        <Button>Add New Customer</Button>
      </div>
      
      <div className="w-full flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="w-full pl-8"
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>Manage your pharmacy customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Contact</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Email</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Prescriptions</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Last Visit</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Total Spent</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">John Smith</td>
                  <td className="p-2 align-middle">(555) 123-4567</td>
                  <td className="p-2 align-middle">john.smith@example.com</td>
                  <td className="p-2 align-middle">3 active</td>
                  <td className="p-2 align-middle">Apr 02, 2025</td>
                  <td className="p-2 align-middle">$325.75</td>
                  <td className="p-2 align-middle">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">Sarah Johnson</td>
                  <td className="p-2 align-middle">(555) 987-6543</td>
                  <td className="p-2 align-middle">sarah.j@example.com</td>
                  <td className="p-2 align-middle">1 active</td>
                  <td className="p-2 align-middle">Apr 05, 2025</td>
                  <td className="p-2 align-middle">$142.50</td>
                  <td className="p-2 align-middle">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;

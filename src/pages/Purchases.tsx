
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Purchases = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Purchase Management</h1>
        <Button>New Purchase Order</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Awaiting delivery</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month's Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5 days</div>
            <p className="text-xs text-muted-foreground">-0.5 days from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>Manage your supplier orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">Order ID</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Supplier</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Total Items</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Total Cost</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">PO-2025-001</td>
                  <td className="p-2 align-middle">PharmaSupply Inc.</td>
                  <td className="p-2 align-middle">Apr 05, 2025</td>
                  <td className="p-2 align-middle">42 items</td>
                  <td className="p-2 align-middle">$3,560.75</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">Pending</span>
                  </td>
                  <td className="p-2 align-middle">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">PO-2025-002</td>
                  <td className="p-2 align-middle">MediWholesale Co.</td>
                  <td className="p-2 align-middle">Apr 03, 2025</td>
                  <td className="p-2 align-middle">28 items</td>
                  <td className="p-2 align-middle">$2,145.30</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white">Delivered</span>
                  </td>
                  <td className="p-2 align-middle">
                    <Button variant="ghost" size="sm">View</Button>
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

export default Purchases;

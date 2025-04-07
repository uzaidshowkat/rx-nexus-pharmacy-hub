
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Returns = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Returns Management</h1>
        <Button>Process New Return</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Returns Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,240</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">Of total sales</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Returns</CardTitle>
          <CardDescription>Manage product returns and exchanges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">Return ID</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Customer</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Product</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Quantity</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Reason</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">RET-001</td>
                  <td className="p-2 align-middle">John Smith</td>
                  <td className="p-2 align-middle">Paracetamol 500mg</td>
                  <td className="p-2 align-middle">Apr 04, 2025</td>
                  <td className="p-2 align-middle">1</td>
                  <td className="p-2 align-middle">Expired product</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">Pending</span>
                  </td>
                  <td className="p-2 align-middle">
                    <Button variant="ghost" size="sm">Process</Button>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">RET-002</td>
                  <td className="p-2 align-middle">Sarah Johnson</td>
                  <td className="p-2 align-middle">Ibuprofen 200mg</td>
                  <td className="p-2 align-middle">Apr 03, 2025</td>
                  <td className="p-2 align-middle">2</td>
                  <td className="p-2 align-middle">Wrong medication</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white">Completed</span>
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

export default Returns;

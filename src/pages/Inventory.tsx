
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Inventory = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          Add New Product
        </button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            Manage your pharmacy product inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">Product Name</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">SKU</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Category</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Stock Level</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Unit Price</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Expiry Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">Paracetamol 500mg</td>
                  <td className="p-2 align-middle">PCM-500</td>
                  <td className="p-2 align-middle">Analgesics</td>
                  <td className="p-2 align-middle">230</td>
                  <td className="p-2 align-middle">$5.99</td>
                  <td className="p-2 align-middle">2025-10-15</td>
                  <td className="p-2 align-middle">
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center justify-center rounded-md text-xs bg-blue-500 text-white h-8 px-2">Edit</button>
                      <button className="inline-flex items-center justify-center rounded-md text-xs bg-red-500 text-white h-8 px-2">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">Amoxicillin 250mg</td>
                  <td className="p-2 align-middle">AMX-250</td>
                  <td className="p-2 align-middle">Antibiotics</td>
                  <td className="p-2 align-middle">120</td>
                  <td className="p-2 align-middle">$8.50</td>
                  <td className="p-2 align-middle">2025-06-30</td>
                  <td className="p-2 align-middle">
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center justify-center rounded-md text-xs bg-blue-500 text-white h-8 px-2">Edit</button>
                      <button className="inline-flex items-center justify-center rounded-md text-xs bg-red-500 text-white h-8 px-2">Delete</button>
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

export default Inventory;

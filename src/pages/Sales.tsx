
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Sales = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Sales & Billing</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Sale</CardTitle>
              <CardDescription>Create a new sales transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Customer
                  </label>
                  <Input placeholder="Search customer" className="mt-2" />
                </div>

                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Products
                  </label>
                  <div className="flex mt-2">
                    <Input placeholder="Search products" className="rounded-r-none" />
                    <Button className="rounded-l-none">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex justify-between font-medium pb-2 border-b">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                  </div>
                  <div className="py-2">
                    <p className="text-center text-muted-foreground text-sm py-4">No products added yet</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Complete Sale</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>Today's transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((sale) => (
                  <div key={sale} className="flex justify-between items-start p-3 rounded-md border">
                    <div>
                      <p className="font-medium">Sale #{sale}0234</p>
                      <p className="text-sm text-muted-foreground">Customer: John Doe</p>
                      <p className="text-sm text-muted-foreground">Items: 3</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$32.50</p>
                      <p className="text-sm text-muted-foreground">Today, 10:2{sale} AM</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sales;

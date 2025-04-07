
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Plus, Search, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

// Sample returns data
const initialReturns = [
  { 
    id: "RET-001", 
    customer: "John Smith", 
    product: "Paracetamol 500mg", 
    date: "Apr 04, 2025", 
    quantity: 1, 
    reason: "Expired product", 
    refundAmount: 5.99,
    status: "pending"
  },
  { 
    id: "RET-002", 
    customer: "Sarah Johnson", 
    product: "Ibuprofen 200mg", 
    date: "Apr 03, 2025", 
    quantity: 2, 
    reason: "Wrong medication", 
    refundAmount: 12.50,
    status: "completed"
  },
];

// Sample products for returns
const products = [
  { id: 1, name: "Paracetamol 500mg", price: 5.99 },
  { id: 2, name: "Amoxicillin 250mg", price: 8.50 },
  { id: 3, name: "Ibuprofen 200mg", price: 6.25 },
  { id: 4, name: "Omeprazole 20mg", price: 9.75 },
];

// Sample customers
const customers = [
  { id: 1, name: "John Smith", phone: "(555) 123-4567" },
  { id: 2, name: "Sarah Johnson", phone: "(555) 987-6543" },
  { id: 3, name: "Michael Brown", phone: "(555) 234-5678" },
];

// Return reasons
const returnReasons = [
  "Expired product",
  "Wrong medication",
  "Adverse reaction",
  "Packaging damaged",
  "Patient deceased",
  "Medication discontinued",
  "Other"
];

const Returns = () => {
  const [returns, setReturns] = useState(initialReturns);
  const [isNewReturnDialogOpen, setIsNewReturnDialogOpen] = useState(false);
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  
  const [newReturn, setNewReturn] = useState({
    customer: "",
    product: "",
    quantity: 1,
    reason: "",
    additionalNotes: ""
  });

  // Calculate metrics
  const totalReturns = returns.length;
  const returnsValue = returns.reduce((sum, item) => sum + item.refundAmount, 0);
  const returnRate = 2.4; // This would be calculated based on actual sales data

  // Handle selecting a return for processing
  const handleProcessReturn = (returnItem) => {
    setSelectedReturn(returnItem);
    setIsProcessDialogOpen(true);
  };

  // Update new return field
  const updateNewReturn = (field, value) => {
    setNewReturn({
      ...newReturn,
      [field]: value
    });
  };

  // Handle completing the processing of a return
  const completeReturnProcessing = () => {
    setReturns(returns.map(r => 
      r.id === selectedReturn.id ? { ...r, status: "completed" } : r
    ));
    
    setIsProcessDialogOpen(false);
    
    toast({
      title: "Return Processed",
      description: `Return ${selectedReturn.id} has been processed successfully.`,
    });
  };

  // Handle adding a new return
  const submitNewReturn = () => {
    if (!newReturn.customer || !newReturn.product || !newReturn.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Find product and price
    const product = products.find(p => p.id.toString() === newReturn.product);
    if (!product) return;
    
    // Calculate refund amount
    const refundAmount = product.price * newReturn.quantity;
    
    // Generate new return ID
    const returnCount = returns.length + 1;
    const newReturnId = `RET-${String(returnCount).padStart(3, '0')}`;
    
    // Get customer name
    const customer = customers.find(c => c.id.toString() === newReturn.customer)?.name || "Unknown Customer";
    
    // Create new return
    const returnItem = {
      id: newReturnId,
      customer: customer,
      product: product.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      quantity: Number(newReturn.quantity),
      reason: newReturn.reason,
      refundAmount: refundAmount,
      status: "pending",
      notes: newReturn.additionalNotes
    };
    
    setReturns([returnItem, ...returns]);
    setIsNewReturnDialogOpen(false);
    
    // Reset form
    setNewReturn({
      customer: "",
      product: "",
      quantity: 1,
      reason: "",
      additionalNotes: ""
    });
    
    toast({
      title: "Return Created",
      description: `Return ${newReturnId} has been created and is pending processing.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Returns Management</h1>
        <Button onClick={() => setIsNewReturnDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Process New Return
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReturns}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Returns Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${returnsValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{returnRate}%</div>
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
                {returns.map((returnItem) => (
                  <tr key={returnItem.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-2 align-middle">{returnItem.id}</td>
                    <td className="p-2 align-middle">{returnItem.customer}</td>
                    <td className="p-2 align-middle">{returnItem.product}</td>
                    <td className="p-2 align-middle">{returnItem.date}</td>
                    <td className="p-2 align-middle">{returnItem.quantity}</td>
                    <td className="p-2 align-middle">{returnItem.reason}</td>
                    <td className="p-2 align-middle">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                        returnItem.status === "pending"
                          ? "bg-amber-500 text-white"
                          : "bg-green-500 text-white"
                      }`}>
                        {returnItem.status === "pending" ? "Pending" : "Completed"}
                      </span>
                    </td>
                    <td className="p-2 align-middle">
                      {returnItem.status === "pending" ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleProcessReturn(returnItem)}
                        >
                          Process
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm">View</Button>
                      )}
                    </td>
                  </tr>
                ))}
                {returns.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-muted-foreground">
                      No returns found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* New Return Dialog */}
      <Dialog open={isNewReturnDialogOpen} onOpenChange={setIsNewReturnDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Process New Return</DialogTitle>
            <DialogDescription>
              Enter details about the product being returned.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customer">Customer*</Label>
              <Select
                value={newReturn.customer}
                onValueChange={(value) => updateNewReturn('customer', value)}
              >
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.name} ({customer.phone})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product">Product*</Label>
              <Select
                value={newReturn.product}
                onValueChange={(value) => updateNewReturn('product', value)}
              >
                <SelectTrigger id="product">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name} (${product.price.toFixed(2)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity*</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newReturn.quantity}
                onChange={(e) => updateNewReturn('quantity', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Return Reason*</Label>
              <Select
                value={newReturn.reason}
                onValueChange={(value) => updateNewReturn('reason', value)}
              >
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {returnReasons.map((reason, index) => (
                    <SelectItem key={index} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                rows={3}
                value={newReturn.additionalNotes}
                onChange={(e) => updateNewReturn('additionalNotes', e.target.value)}
                placeholder="Enter any additional details about this return"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsNewReturnDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={submitNewReturn}>
              Submit Return
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Process Return Dialog */}
      <Dialog open={isProcessDialogOpen} onOpenChange={setIsProcessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Process Return</DialogTitle>
            <DialogDescription>
              Review and process this return.
            </DialogDescription>
          </DialogHeader>
          {selectedReturn && (
            <div className="py-4">
              <div className="rounded-md bg-amber-50 p-4 mb-4 border border-amber-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Return Processing Checklist</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Verify product condition</li>
                        <li>Check return eligibility</li>
                        <li>Confirm original purchase</li>
                        <li>Process refund if applicable</li>
                        <li>Update inventory system</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Return ID:</div>
                  <div className="col-span-2">{selectedReturn.id}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Customer:</div>
                  <div className="col-span-2">{selectedReturn.customer}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Product:</div>
                  <div className="col-span-2">{selectedReturn.product}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Quantity:</div>
                  <div className="col-span-2">{selectedReturn.quantity}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Return Reason:</div>
                  <div className="col-span-2">{selectedReturn.reason}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Return Date:</div>
                  <div className="col-span-2">{selectedReturn.date}</div>
                </div>
                <div className="grid grid-cols-3 gap-1 border-t pt-2">
                  <div className="font-medium">Refund Amount:</div>
                  <div className="col-span-2 font-bold">${selectedReturn.refundAmount.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="processingNotes">Processing Notes</Label>
                  <Textarea
                    id="processingNotes"
                    rows={3}
                    placeholder="Enter any notes regarding the processing of this return"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsProcessDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={completeReturnProcessing}>
              <Check className="mr-2 h-4 w-4" />
              Complete Processing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Returns;

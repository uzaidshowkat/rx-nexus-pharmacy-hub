
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, DollarSign, TrendingUp, CreditCard, UserPlus } from "lucide-react";
import { sales as initialSales } from '@/components/purchases/PurchaseData';
import SalesTable from '@/components/sales/SalesTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';

type SaleItem = {
  product: string;
  quantity: number;
  price: number;
  total: number;
}

type Sale = {
  id: string;
  date: string;
  customer: string;
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: string;
}

// Sample products and customers data for demonstration
const sampleProducts = [
  { id: 1, name: 'Paracetamol', price: 5.99 },
  { id: 2, name: 'Amoxicillin', price: 12.50 },
  { id: 3, name: 'Ibuprofen', price: 4.99 },
  { id: 4, name: 'Loratadine', price: 8.75 },
  { id: 5, name: 'Aspirin', price: 3.25 },
  { id: 6, name: 'Omeprazole', price: 15.99 },
  { id: 7, name: 'Simvastatin', price: 22.50 },
];

const sampleCustomers = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Emily Johnson' },
  { id: 3, name: 'Michael Brown' },
  { id: 4, name: 'Sarah Davis' },
  { id: 5, name: 'Robert Wilson' },
];

const Sales = () => {
  const [salesList, setSalesList] = useState<Sale[]>(initialSales);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isSaleDetailsOpen, setIsSaleDetailsOpen] = useState(false);
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  
  // New sale form states
  const [newSaleCustomer, setNewSaleCustomer] = useState('');
  const [newSaleItems, setNewSaleItems] = useState<SaleItem[]>([
    { product: 'Paracetamol', quantity: 1, price: 5.99, total: 5.99 }
  ]);
  const [newSalePaymentMethod, setNewSalePaymentMethod] = useState('Credit Card');
  
  // Calculate sales metrics
  const todaySales = salesList
    .filter(sale => new Date(sale.date).toDateString() === new Date().toDateString())
    .reduce((sum, sale) => sum + sale.totalAmount, 0);
    
  const thisMonthSales = salesList
    .filter(sale => {
      const saleDate = new Date(sale.date);
      const today = new Date();
      return saleDate.getMonth() === today.getMonth() && saleDate.getFullYear() === today.getFullYear();
    })
    .reduce((sum, sale) => sum + sale.totalAmount, 0);
    
  const totalTransactions = salesList.length;
  
  const uniqueCustomers = new Set(salesList.map(sale => sale.customer)).size;

  const handleViewSale = (sale: Sale) => {
    setSelectedSale(sale);
    setIsSaleDetailsOpen(true);
  };

  const handleCreateNewSale = () => {
    setIsNewSaleOpen(true);
  };
  
  const addItemToSale = () => {
    setNewSaleItems(prev => [...prev, { product: '', quantity: 1, price: 0, total: 0 }]);
  };
  
  const updateNewSaleItem = (index: number, field: keyof SaleItem, value: string | number) => {
    const updatedItems = [...newSaleItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    // Recalculate total if quantity or price changes
    if (field === 'quantity' || field === 'price') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    }
    
    // If selecting a product from dropdown, update the price too
    if (field === 'product') {
      const selectedProduct = sampleProducts.find(p => p.name === value);
      if (selectedProduct) {
        updatedItems[index].price = selectedProduct.price;
        updatedItems[index].total = updatedItems[index].quantity * selectedProduct.price;
      }
    }
    
    setNewSaleItems(updatedItems);
  };
  
  const removeItemFromSale = (index: number) => {
    if (newSaleItems.length > 1) {
      setNewSaleItems(prev => prev.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot Remove Item",
        description: "Sale must have at least one item",
        variant: "destructive"
      });
    }
  };
  
  const calculateNewSaleTotal = () => {
    return newSaleItems.reduce((sum, item) => sum + item.total, 0);
  };
  
  const handleSaveNewSale = () => {
    if (!newSaleCustomer) {
      toast({
        title: "Missing Information",
        description: "Please enter a customer name",
        variant: "destructive"
      });
      return;
    }
    
    if (newSaleItems.some(item => !item.product || item.quantity <= 0)) {
      toast({
        title: "Invalid Items",
        description: "Please fill in all product details correctly",
        variant: "destructive"
      });
      return;
    }
    
    const newSale: Sale = {
      id: uuidv4().substring(0, 8),
      date: new Date().toISOString(),
      customer: newSaleCustomer,
      items: newSaleItems,
      totalAmount: calculateNewSaleTotal(),
      paymentMethod: newSalePaymentMethod
    };
    
    setSalesList(prev => [newSale, ...prev]);
    setIsNewSaleOpen(false);
    resetNewSaleForm();
    
    toast({
      title: "Sale Created",
      description: `Sale #${newSale.id} has been created successfully`,
    });
  };
  
  const resetNewSaleForm = () => {
    setNewSaleCustomer('');
    setNewSaleItems([{ product: 'Paracetamol', quantity: 1, price: 5.99, total: 5.99 }]);
    setNewSalePaymentMethod('Credit Card');
  };
  
  const handleGenerateInvoice = (saleId: string) => {
    toast({
      title: "Invoice Generated",
      description: `Invoice for sale ${saleId} has been generated.`,
    });
    setIsSaleDetailsOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Sales Management</h1>
        <Button onClick={handleCreateNewSale}>
          <Plus className="mr-2 h-4 w-4" />
          New Sale
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-primary" />
              Today's Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${todaySales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${thisMonthSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserPlus className="h-4 w-4 mr-2 text-primary" />
              Unique Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCustomers}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>View and manage your sales transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <SalesTable 
            sales={salesList}
            onView={handleViewSale}
          />
        </CardContent>
      </Card>
      
      {/* Sale Details Dialog */}
      <Dialog open={isSaleDetailsOpen} onOpenChange={setIsSaleDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sale Details</DialogTitle>
          </DialogHeader>
          
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Sale ID:</div>
                <div className="col-span-2">{selectedSale.id}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Date:</div>
                <div className="col-span-2">{new Date(selectedSale.date).toLocaleDateString()}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Customer:</div>
                <div className="col-span-2">{selectedSale.customer}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Payment Method:</div>
                <div className="col-span-2">{selectedSale.paymentMethod}</div>
              </div>
              
              <div className="border-t pt-2">
                <h3 className="font-medium mb-2">Items</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-1 text-left">Product</th>
                      <th className="py-1 text-center">Qty</th>
                      <th className="py-1 text-right">Price</th>
                      <th className="py-1 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSale.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-1">{item.product}</td>
                        <td className="py-1 text-center">{item.quantity}</td>
                        <td className="py-1 text-right">${item.price.toFixed(2)}</td>
                        <td className="py-1 text-right">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td className="py-2" colSpan={3} align="right">Total:</td>
                      <td className="py-2 text-right">${selectedSale.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setIsSaleDetailsOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleGenerateInvoice(selectedSale.id)}>
                  Generate Invoice
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* New Sale Dialog */}
      <Dialog open={isNewSaleOpen} onOpenChange={setIsNewSaleOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Sale</DialogTitle>
            <DialogDescription>Add products and customer information to create a new sale</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Select 
                  value={newSaleCustomer}
                  onValueChange={setNewSaleCustomer}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleCustomers.map(customer => (
                      <SelectItem key={customer.id} value={customer.name}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Method</Label>
                <Select 
                  value={newSalePaymentMethod}
                  onValueChange={setNewSalePaymentMethod}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Items</h3>
                <Button size="sm" variant="outline" onClick={addItemToSale}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>
              
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-2 px-3 text-left">Product</th>
                      <th className="py-2 px-3 text-center w-24">Quantity</th>
                      <th className="py-2 px-3 text-right w-32">Price</th>
                      <th className="py-2 px-3 text-right w-32">Total</th>
                      <th className="py-2 px-3 w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {newSaleItems.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-3">
                          <Select 
                            value={item.product}
                            onValueChange={(value) => updateNewSaleItem(index, 'product', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent>
                              {sampleProducts.map(product => (
                                <SelectItem key={product.id} value={product.name}>
                                  {product.name} - ${product.price.toFixed(2)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-2 px-3">
                          <Input 
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateNewSaleItem(index, 'quantity', parseInt(e.target.value) || 1)}
                          />
                        </td>
                        <td className="py-2 px-3">
                          <Input 
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateNewSaleItem(index, 'price', parseFloat(e.target.value) || 0)}
                            className="text-right"
                            placeholder="0.00"
                          />
                        </td>
                        <td className="py-2 px-3 text-right font-medium">
                          ${item.total.toFixed(2)}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => removeItemFromSale(index)}
                            className="h-8 w-8 p-0"
                          >
                            &times;
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td className="py-3 px-3 text-right" colSpan={3}>Total:</td>
                      <td className="py-3 px-3 text-right">${calculateNewSaleTotal().toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewSaleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewSale}>
              Create Sale
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sales;

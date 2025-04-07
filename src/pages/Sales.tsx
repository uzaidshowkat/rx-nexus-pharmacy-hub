
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Check, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// Sample product data
const availableProducts = [
  { id: 1, name: "Paracetamol 500mg", price: 5.99, stock: 230 },
  { id: 2, name: "Amoxicillin 250mg", price: 8.50, stock: 120 },
  { id: 3, name: "Cetirizine 10mg", price: 4.25, stock: 85 },
  { id: 4, name: "Omeprazole 20mg", price: 6.75, stock: 65 },
  { id: 5, name: "Metformin 500mg", price: 3.99, stock: 110 },
];

// Sample customer data
const customers = [
  { id: 1, name: "John Smith", phone: "(555) 123-4567" },
  { id: 2, name: "Sarah Johnson", phone: "(555) 987-6543" },
  { id: 3, name: "Michael Brown", phone: "(555) 234-5678" },
  { id: 4, name: "Emma Wilson", phone: "(555) 345-6789" },
  { id: 5, name: "Robert Davis", phone: "(555) 456-7890" },
];

// Sample payment methods
const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Insurance", "Mobile Payment"];

const Sales = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [receiptItems, setReceiptItems] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptTotal, setReceiptTotal] = useState(0);
  const [receiptId, setReceiptId] = useState("");

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(
        availableProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  // Handle product search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add product to cart
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // If product already in cart, increment quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // If product not in cart, add it
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    setSearchTerm("");
    setFilteredProducts([]);
    
    toast({
      title: "Product Added",
      description: `${product.name} added to cart.`,
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Update product quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Select a customer
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDialog(false);
    
    toast({
      title: "Customer Selected",
      description: `${customer.name} selected for this transaction.`,
    });
  };

  // Complete the sale
  const completeSale = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add products to complete the sale.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedCustomer) {
      setShowCustomerDialog(true);
      return;
    }
    
    setShowPaymentDialog(true);
  };

  // Process payment
  const processPayment = () => {
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a receipt ID
    const newReceiptId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptId(newReceiptId);
    setReceiptItems([...cartItems]);
    setReceiptTotal(total);
    setShowPaymentDialog(false);
    setShowReceipt(true);
    
    // Reset the cart after successful payment
    setCartItems([]);
    
    toast({
      title: "Sale Complete",
      description: `Transaction processed successfully. Receipt: ${newReceiptId}`,
    });
  };

  // Close receipt and reset
  const closeReceipt = () => {
    setShowReceipt(false);
    setSelectedCustomer(null);
    setPaymentMethod("");
  };

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
                  <div className="flex mt-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowCustomerDialog(true)}
                    >
                      {selectedCustomer ? selectedCustomer.name : "Select customer"}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Products
                  </label>
                  <div className="flex mt-2 relative">
                    <Input 
                      placeholder="Search products" 
                      className="rounded-r-none" 
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <Button className="rounded-l-none" disabled={searchTerm.trim() === ""}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                    
                    {filteredProducts.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-md z-10 max-h-60 overflow-auto">
                        {filteredProducts.map(product => (
                          <div 
                            key={product.id} 
                            className="p-2 hover:bg-muted cursor-pointer border-b flex justify-between items-center"
                            onClick={() => addToCart(product)}
                          >
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground">${product.price.toFixed(2)}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Stock: {product.stock}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex justify-between font-medium pb-2 border-b">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                  </div>
                  <div className="py-2">
                    {cartItems.length > 0 ? (
                      <div className="space-y-2">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex-1">{item.name}</div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            <div className="w-20 text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="ml-2 h-7 w-7 p-0 text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground text-sm py-4">No products added yet</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={completeSale}>Complete Sale</Button>
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
      
      {/* Customer Selection Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Customer</DialogTitle>
            <DialogDescription>
              Choose a customer for this transaction.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Search customers..."
              className="mb-4"
            />
            <div className="space-y-2 max-h-60 overflow-auto">
              {customers.map(customer => (
                <div 
                  key={customer.id}
                  className="p-2 border rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => handleSelectCustomer(customer)}
                >
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.phone}</div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomerDialog(false)}>
              Cancel
            </Button>
            <Button>
              New Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Select payment method to complete the transaction.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map(method => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={processPayment}>
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Receipt</DialogTitle>
            <DialogDescription>
              Transaction completed successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold">RxNexus Pharmacy</h3>
              <p className="text-sm text-muted-foreground">123 Main St, Anytown</p>
              <p className="text-sm text-muted-foreground">Tel: (555) 123-4567</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>Receipt: {receiptId}</span>
                <span>Date: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="text-sm">
                <p>Customer: {selectedCustomer?.name}</p>
              </div>
            </div>
            
            <div className="border-t border-b py-2 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="py-1">Item</th>
                    <th className="py-1 text-right">Qty</th>
                    <th className="py-1 text-right">Price</th>
                    <th className="py-1 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptItems.map(item => (
                    <tr key={item.id}>
                      <td className="py-1">{item.name}</td>
                      <td className="py-1 text-right">{item.quantity}</td>
                      <td className="py-1 text-right">${item.price.toFixed(2)}</td>
                      <td className="py-1 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${(receiptTotal / 1.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%):</span>
                <span>${(receiptTotal - receiptTotal / 1.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${receiptTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Payment Method:</span>
                <span>{paymentMethod}</span>
              </div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Thank you for your purchase!</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeReceipt}>
              <Check className="mr-2 h-4 w-4" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sales;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Plus, Package, Calendar, FileText, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample suppliers
const suppliers = [
  { id: 1, name: "PharmaSupply Inc.", contact: "(555) 234-5678", email: "orders@pharmasupply.com" },
  { id: 2, name: "MediWholesale Co.", contact: "(555) 876-5432", email: "sales@mediwholesale.com" },
  { id: 3, name: "HealthDist Partners", contact: "(555) 345-6789", email: "info@healthdist.com" },
];

// Sample products for purchasing
const purchaseProducts = [
  { id: 1, name: "Paracetamol 500mg", sku: "PCM-500", category: "Analgesics", unitCost: 2.50 },
  { id: 2, name: "Amoxicillin 250mg", sku: "AMX-250", category: "Antibiotics", unitCost: 4.25 },
  { id: 3, name: "Cetirizine 10mg", sku: "CET-10", category: "Antihistamines", unitCost: 1.75 },
  { id: 4, name: "Omeprazole 20mg", sku: "OMP-20", category: "Gastrointestinal", unitCost: 3.45 },
];

// Sample purchase orders
const initialPurchaseOrders = [
  { 
    id: "PO-2025-001", 
    supplier: "PharmaSupply Inc.", 
    date: "Apr 05, 2025",
    items: 42,
    total: 3560.75,
    status: "pending"
  },
  { 
    id: "PO-2025-002", 
    supplier: "MediWholesale Co.", 
    date: "Apr 03, 2025",
    items: 28,
    total: 2145.30,
    status: "delivered"
  },
];

const Purchases = () => {
  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders);
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedTab, setSelectedTab] = useState("products");
  const [orderItems, setOrderItems] = useState([]);
  const [productSearch, setProductSearch] = useState("");

  // Handle viewing an order
  const handleViewOrder = (orderId) => {
    const order = purchaseOrders.find(order => order.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsViewOrderDialogOpen(true);
    }
  };

  // Handle adding product to order
  const addProductToOrder = (product) => {
    const existingItem = orderItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setOrderItems(orderItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.unitCost } 
          : item
      ));
    } else {
      setOrderItems([
        ...orderItems,
        { 
          ...product,
          quantity: 1,
          total: product.unitCost
        }
      ]);
    }
    
    toast({
      title: "Product Added",
      description: `${product.name} added to purchase order.`,
    });
  };

  // Handle updating product quantity
  const updateProductQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setOrderItems(orderItems.map(item => 
      item.id === productId 
        ? { ...item, quantity, total: quantity * item.unitCost } 
        : item
    ));
  };

  // Handle removing product from order
  const removeProductFromOrder = (productId) => {
    setOrderItems(orderItems.filter(item => item.id !== productId));
    
    toast({
      title: "Product Removed",
      description: "Product removed from purchase order.",
    });
  };

  // Calculate order total
  const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  
  // Handle creating new purchase order
  const createPurchaseOrder = () => {
    if (!selectedSupplier) {
      toast({
        title: "Supplier Required",
        description: "Please select a supplier for this order.",
        variant: "destructive",
      });
      return;
    }
    
    if (orderItems.length === 0) {
      toast({
        title: "No Products Selected",
        description: "Please add products to the purchase order.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate new order ID
    const orderCount = purchaseOrders.length + 1;
    const newOrderId = `PO-2025-${String(orderCount).padStart(3, '0')}`;
    
    // Get the supplier name
    const supplier = suppliers.find(s => s.id.toString() === selectedSupplier)?.name || "Unknown Supplier";
    
    // Create new purchase order
    const newOrder = {
      id: newOrderId,
      supplier: supplier,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      total: orderTotal,
      status: "pending"
    };
    
    setPurchaseOrders([newOrder, ...purchaseOrders]);
    setIsNewOrderDialogOpen(false);
    setSelectedSupplier("");
    setOrderItems([]);
    
    toast({
      title: "Purchase Order Created",
      description: `Order ${newOrderId} has been created successfully.`,
    });
  };

  // Filtered products based on search
  const filteredProducts = productSearch 
    ? purchaseProducts.filter(product => 
        product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        product.sku.toLowerCase().includes(productSearch.toLowerCase())
      )
    : purchaseProducts;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Purchase Management</h1>
        <Button onClick={() => setIsNewOrderDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Purchase Order
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {purchaseOrders.filter(order => order.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting delivery</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month's Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${purchaseOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
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
                {purchaseOrders.map((order) => (
                  <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-2 align-middle">{order.id}</td>
                    <td className="p-2 align-middle">{order.supplier}</td>
                    <td className="p-2 align-middle">{order.date}</td>
                    <td className="p-2 align-middle">{order.items} items</td>
                    <td className="p-2 align-middle">${order.total.toFixed(2)}</td>
                    <td className="p-2 align-middle">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                        order.status === "pending"
                          ? "bg-amber-500 text-white"
                          : "bg-green-500 text-white"
                      }`}>
                        {order.status === "pending" ? "Pending" : "Delivered"}
                      </span>
                    </td>
                    <td className="p-2 align-middle">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* New Purchase Order Dialog */}
      <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>New Purchase Order</DialogTitle>
            <DialogDescription>
              Create a new order to purchase products from suppliers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-4 items-start gap-4 py-4">
            <div className="col-span-4">
              <Label htmlFor="supplier" className="text-sm font-medium">Select Supplier</Label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger id="supplier" className="mt-2">
                  <SelectValue placeholder="Choose a supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedSupplier && (
              <>
                <div className="col-span-4">
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="products">
                        <Package className="h-4 w-4 mr-2" />
                        Products
                      </TabsTrigger>
                      <TabsTrigger value="order">
                        <FileText className="h-4 w-4 mr-2" />
                        Order Summary
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="products" className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="search-products">Search Products</Label>
                        <Input
                          id="search-products"
                          placeholder="Search by name or SKU"
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b bg-muted/50">
                            <tr>
                              <th className="h-10 px-4 text-left align-middle font-medium">Product</th>
                              <th className="h-10 px-4 text-left align-middle font-medium">SKU</th>
                              <th className="h-10 px-4 text-left align-middle font-medium">Category</th>
                              <th className="h-10 px-4 text-right align-middle font-medium">Unit Cost</th>
                              <th className="h-10 px-4 text-center align-middle font-medium">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredProducts.map(product => (
                              <tr key={product.id} className="border-b">
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.sku}</td>
                                <td className="p-2">{product.category}</td>
                                <td className="p-2 text-right">${product.unitCost.toFixed(2)}</td>
                                <td className="p-2 text-center">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => addProductToOrder(product)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                              <tr>
                                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                  No products found matching your search.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="order" className="space-y-4 pt-4">
                      {orderItems.length > 0 ? (
                        <>
                          <div className="border rounded-md overflow-hidden">
                            <table className="w-full caption-bottom text-sm">
                              <thead className="[&_tr]:border-b bg-muted/50">
                                <tr>
                                  <th className="h-10 px-4 text-left align-middle font-medium">Product</th>
                                  <th className="h-10 px-4 text-left align-middle font-medium">SKU</th>
                                  <th className="h-10 px-4 text-center align-middle font-medium">Quantity</th>
                                  <th className="h-10 px-4 text-right align-middle font-medium">Unit Cost</th>
                                  <th className="h-10 px-4 text-right align-middle font-medium">Total</th>
                                  <th className="h-10 px-4 text-center align-middle font-medium">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderItems.map(item => (
                                  <tr key={item.id} className="border-b">
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.sku}</td>
                                    <td className="p-2 text-center">
                                      <div className="flex items-center justify-center">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="h-7 w-7 p-0"
                                          onClick={() => updateProductQuantity(item.id, item.quantity - 1)}
                                        >
                                          -
                                        </Button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="h-7 w-7 p-0"
                                          onClick={() => updateProductQuantity(item.id, item.quantity + 1)}
                                        >
                                          +
                                        </Button>
                                      </div>
                                    </td>
                                    <td className="p-2 text-right">${item.unitCost.toFixed(2)}</td>
                                    <td className="p-2 text-right">${item.total.toFixed(2)}</td>
                                    <td className="p-2 text-center">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-red-500"
                                        onClick={() => removeProductFromOrder(item.id)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan={4} className="p-2 text-right font-medium">
                                    Total Cost:
                                  </td>
                                  <td className="p-2 text-right font-bold">
                                    ${orderTotal.toFixed(2)}
                                  </td>
                                  <td></td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-sm text-muted-foreground">
                                Expected Delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline">
                                <Calendar className="h-4 w-4 mr-2" />
                                Set Delivery Date
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <Package className="h-10 w-10 text-muted-foreground mb-2" />
                          <h3 className="font-medium">No Products Added</h3>
                          <p className="text-sm text-muted-foreground">
                            Go to the Products tab to add items to this order.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={createPurchaseOrder}
              disabled={!selectedSupplier || orderItems.length === 0}
            >
              Create Purchase Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Purchase Order Dialog */}
      <Dialog open={isViewOrderDialogOpen} onOpenChange={setIsViewOrderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Order Details</DialogTitle>
            <DialogDescription>
              View information about this purchase order.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Order ID:</div>
                  <div className="col-span-2">{selectedOrder.id}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Supplier:</div>
                  <div className="col-span-2">{selectedOrder.supplier}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Date Created:</div>
                  <div className="col-span-2">{selectedOrder.date}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Total Items:</div>
                  <div className="col-span-2">{selectedOrder.items}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Total Cost:</div>
                  <div className="col-span-2">${selectedOrder.total.toFixed(2)}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="font-medium">Status:</div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                      selectedOrder.status === "pending"
                        ? "bg-amber-500 text-white"
                        : "bg-green-500 text-white"
                    }`}>
                      {selectedOrder.status === "pending" ? "Pending" : "Delivered"}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedOrder.status === "pending" && (
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">Edit Order</Button>
                  <Button onClick={() => {
                    setPurchaseOrders(purchaseOrders.map(order => 
                      order.id === selectedOrder.id ? { ...order, status: "delivered" } : order
                    ));
                    setIsViewOrderDialogOpen(false);
                    toast({
                      title: "Order Marked as Delivered",
                      description: `${selectedOrder.id} has been marked as delivered.`,
                    });
                  }}>
                    Mark as Delivered
                  </Button>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOrderDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Purchases;

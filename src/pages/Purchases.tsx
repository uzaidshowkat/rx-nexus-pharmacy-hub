
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { suppliers, purchaseProducts, initialPurchaseOrders } from "@/components/purchases/PurchaseData";
import PurchaseStatCards from "@/components/purchases/PurchaseStatCards";
import PurchaseOrdersTable from "@/components/purchases/PurchaseOrdersTable";
import NewOrderDialog from "@/components/purchases/NewOrderDialog";
import ViewOrderDialog from "@/components/purchases/ViewOrderDialog";

// Type definitions
type PurchaseOrder = {
  id: string;
  supplier: string;
  date: string;
  items: number;
  total: number;
  status: string;
}

type OrderItem = {
  id: number;
  name: string;
  sku: string;
  category: string;
  unitCost: number;
  quantity: number;
  total: number;
}

const Purchases = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState<boolean>(false);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);

  // Calculate stats
  const pendingOrdersCount = purchaseOrders.filter(order => order.status === "pending").length;
  const totalPurchases = purchaseOrders.reduce((sum, order) => sum + order.total, 0);

  // Handle viewing an order
  const handleViewOrder = (orderId: string) => {
    const order = purchaseOrders.find(order => order.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsViewOrderDialogOpen(true);
    }
  };

  // Handle creating new purchase order
  const createPurchaseOrder = (supplierId: string, orderItems: OrderItem[]) => {
    if (!supplierId) {
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
    const supplier = suppliers.find(s => s.id.toString() === supplierId)?.name || "Unknown Supplier";
    
    // Create new purchase order
    const newOrder = {
      id: newOrderId,
      supplier: supplier,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      total: orderItems.reduce((sum, item) => sum + item.total, 0),
      status: "pending"
    };
    
    setPurchaseOrders([newOrder, ...purchaseOrders]);
    setIsNewOrderDialogOpen(false);
    
    toast({
      title: "Purchase Order Created",
      description: `Order ${newOrderId} has been created successfully.`,
    });
  };

  // Handle marking an order as delivered
  const handleMarkDelivered = (orderId: string) => {
    setPurchaseOrders(purchaseOrders.map(order => 
      order.id === orderId ? { ...order, status: "delivered" } : order
    ));
    setIsViewOrderDialogOpen(false);
    
    toast({
      title: "Order Marked as Delivered",
      description: `${orderId} has been marked as delivered.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Purchase Management</h1>
        <Button onClick={() => setIsNewOrderDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Purchase Order
        </Button>
      </div>
      
      <PurchaseStatCards 
        pendingOrdersCount={pendingOrdersCount}
        totalPurchases={totalPurchases}
        averageProcessingDays={3.5}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>Manage your supplier orders</CardDescription>
        </CardHeader>
        <CardContent>
          <PurchaseOrdersTable 
            purchaseOrders={purchaseOrders}
            onViewOrder={handleViewOrder}
          />
        </CardContent>
      </Card>
      
      <NewOrderDialog
        open={isNewOrderDialogOpen}
        onOpenChange={setIsNewOrderDialogOpen}
        suppliers={suppliers}
        products={purchaseProducts}
        onCreateOrder={createPurchaseOrder}
      />
      
      <ViewOrderDialog
        open={isViewOrderDialogOpen}
        onOpenChange={setIsViewOrderDialogOpen}
        order={selectedOrder}
        onMarkDelivered={handleMarkDelivered}
      />
    </div>
  );
};

export default Purchases;

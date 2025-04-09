
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, User, Package, TrendingUp, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PurchaseStatCards from "@/components/purchases/PurchaseStatCards";
import PurchaseOrdersTable from "@/components/purchases/PurchaseOrdersTable";
import NewOrderDialog from "@/components/purchases/NewOrderDialog";
import ViewOrderDialog from "@/components/purchases/ViewOrderDialog";
import { useSupplierStore } from '@/stores/supplierStore';
import { useInventoryStore } from '@/stores/inventoryStore';
import SupplierFormDialog from '@/components/purchases/SupplierFormDialog';

type OrderItem = {
  id: number;
  name: string;
  sku: string;
  category: string;
  unitCost: number;
  quantity: number;
  total: number;
};

type PurchaseOrder = {
  id: number;
  orderNumber: string;
  supplier: string;
  supplierId: number;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
};

const Purchases = () => {
  const { suppliers, addSupplier } = useSupplierStore();
  const { items: inventoryItems } = useInventoryStore();
  
  // Transform inventory items to product format for order dialog
  const products = inventoryItems.map(item => ({
    id: item.id,
    name: item.name,
    sku: item.sku,
    category: item.category,
    unitCost: item.unitPrice * 0.7, // Example cost calculation (70% of retail price)
  }));

  const [orders, setOrders] = useState<PurchaseOrder[]>([
    {
      id: 1,
      orderNumber: "PO-2023-001",
      supplier: "MedSupply Corp",
      supplierId: 1,
      date: "2025-04-01",
      total: 1250.75,
      status: "Received",
      items: [
        { id: 1, name: "Generic Paracetamol", sku: "MED001", category: "Analgesics", unitCost: 0.50, quantity: 500, total: 250 },
        { id: 2, name: "Generic Cetirizine", sku: "MED015", category: "Antihistamines", unitCost: 0.75, quantity: 300, total: 225 },
        { id: 3, name: "Generic Ibuprofen", sku: "MED003", category: "Anti-inflammatory", unitCost: 0.55, quantity: 1410, total: 775.5 }
      ]
    },
    {
      id: 2,
      orderNumber: "PO-2023-002",
      supplier: "Healthcare Distributors",
      supplierId: 2,
      date: "2025-04-03",
      total: 875.25,
      status: "Processing",
      items: [
        { id: 4, name: "Vitamin D Supplements", sku: "VIT002", category: "Vitamins", unitCost: 3.50, quantity: 100, total: 350 },
        { id: 5, name: "Vitamin C Tablets", sku: "VIT001", category: "Vitamins", unitCost: 2.75, quantity: 120, total: 330 },
        { id: 6, name: "Calcium Supplements", sku: "VIT003", category: "Vitamins", unitCost: 3.90, quantity: 50, total: 195 }
      ]
    },
    {
      id: 3,
      orderNumber: "PO-2023-003",
      supplier: "PharmWholesale Inc",
      supplierId: 3,
      date: "2025-04-05",
      total: 2190.80,
      status: "Pending",
      items: [
        { id: 7, name: "Asthma Inhaler", sku: "MED101", category: "Respiratory", unitCost: 18.50, quantity: 50, total: 925 },
        { id: 8, name: "Blood Pressure Monitor", sku: "DEV001", category: "Devices", unitCost: 45.25, quantity: 15, total: 678.75 },
        { id: 9, name: "Diabetic Test Strips", sku: "DEV005", category: "Devices", unitCost: 19.75, quantity: 30, total: 592.5 }
      ]
    }
  ]);

  const [viewOrder, setViewOrder] = useState<PurchaseOrder | null>(null);
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);

  const handleViewOrder = (order: PurchaseOrder) => {
    setViewOrder(order);
    setIsViewOrderDialogOpen(true);
  };

  const handleCreateOrder = (supplierId: string, orderItems: OrderItem[]) => {
    const supplier = suppliers.find(s => s.id === parseInt(supplierId));
    
    if (!supplier || orderItems.length === 0) return;
    
    const total = orderItems.reduce((sum, item) => sum + item.total, 0);
    
    const newOrder: PurchaseOrder = {
      id: orders.length + 1,
      orderNumber: `PO-2025-${String(orders.length + 1).padStart(3, '0')}`,
      supplier: supplier.name,
      supplierId: supplier.id,
      date: new Date().toISOString().split('T')[0],
      total,
      status: "Pending",
      items: orderItems
    };
    
    setOrders([...orders, newOrder]);
    
    setIsNewOrderDialogOpen(false);
    
    toast({
      title: "Purchase Order Created",
      description: `Order ${newOrder.orderNumber} has been created successfully.`,
    });
  };

  const handleAddSupplier = (supplierData: Partial<Supplier>) => {
    const newSupplierId = Math.max(0, ...suppliers.map(s => s.id)) + 1;
    
    const newSupplier = {
      id: newSupplierId,
      name: supplierData.name || "",
      contact: supplierData.contact || "",
      email: supplierData.email || "",
      phone: supplierData.phone || "",
      address: supplierData.address || "",
    };
    
    addSupplier(newSupplier);
    
    toast({
      title: "Supplier Added",
      description: `${newSupplier.name} has been added to your suppliers.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Purchase Orders</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setIsSupplierDialogOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
          <Button onClick={() => setIsNewOrderDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
        </div>
      </div>
      
      <PurchaseStatCards orders={orders} />
      
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>Manage your purchase orders and suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <PurchaseOrdersTable 
            orders={orders} 
            onViewOrder={handleViewOrder}
          />
        </CardContent>
      </Card>

      <NewOrderDialog 
        open={isNewOrderDialogOpen}
        onOpenChange={setIsNewOrderDialogOpen}
        suppliers={suppliers}
        products={products}
        onCreateOrder={handleCreateOrder}
      />

      <ViewOrderDialog 
        open={isViewOrderDialogOpen}
        onOpenChange={setIsViewOrderDialogOpen}
        order={viewOrder}
      />

      <SupplierFormDialog
        open={isSupplierDialogOpen}
        onOpenChange={setIsSupplierDialogOpen}
        onSave={handleAddSupplier}
      />
    </div>
  );
};

export default Purchases;

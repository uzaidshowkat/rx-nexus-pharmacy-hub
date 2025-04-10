
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchaseOrdersTable from "@/components/purchases/PurchaseOrdersTable";
import NewOrderDialog from "@/components/purchases/NewOrderDialog";
import ViewOrderDialog from "@/components/purchases/ViewOrderDialog";
import { toast } from "@/hooks/use-toast";
import { useSupplierStore } from '@/stores/supplierStore';
import SupplierFormDialog from '@/components/purchases/SupplierFormDialog';
import PurchaseStats from '@/components/purchases/PurchaseStats';

// Define PurchaseOrder interface to match what's expected
interface PurchaseOrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface PurchaseOrder {
  id: string;
  date: string;
  supplier: string;
  status: string;
  total: number;
  items: PurchaseOrderItem[];
}

// Sample purchase orders for the demo
const demoOrders: PurchaseOrder[] = [
  {
    id: "PO-00123",
    date: "2023-04-01",
    supplier: "MedSupply Corp",
    status: "Received",
    total: 1250.99,
    items: [
      { name: "Acetaminophen 500mg", quantity: 10, price: 25.99, total: 259.90 },
      { name: "Amoxicillin 250mg", quantity: 5, price: 42.50, total: 212.50 },
      { name: "Lisinopril 10mg", quantity: 8, price: 18.95, total: 151.60 },
      { name: "Metformin 500mg", quantity: 15, price: 15.20, total: 228.00 },
      { name: "Atorvastatin 40mg", quantity: 20, price: 19.95, total: 399.00 }
    ]
  },
  {
    id: "PO-00124",
    date: "2023-04-03",
    supplier: "Healthcare Distributors",
    status: "Pending",
    total: 876.50,
    items: [
      { name: "Aspirin 81mg", quantity: 30, price: 8.99, total: 269.70 },
      { name: "Ibuprofen 200mg", quantity: 20, price: 12.45, total: 249.00 },
      { name: "Ranitidine 150mg", quantity: 15, price: 23.85, total: 357.75 }
    ]
  },
  {
    id: "PO-00125",
    date: "2023-04-05",
    supplier: "PharmWholesale Inc",
    status: "In Transit",
    total: 2154.25,
    items: [
      { name: "Sertraline 50mg", quantity: 10, price: 45.25, total: 452.50 },
      { name: "Fluoxetine 20mg", quantity: 12, price: 38.75, total: 465.00 },
      { name: "Omeprazole 20mg", quantity: 25, price: 29.75, total: 743.75 },
      { name: "Simvastatin 20mg", quantity: 18, price: 27.39, total: 493.02 }
    ]
  }
];

// Ensure this matches the type in supplierStore
interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
}

const Purchases = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<PurchaseOrder[]>(demoOrders);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);

  // Supplier management
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [supplierSearchQuery, setSupplierSearchQuery] = useState("");
  
  const { suppliers, deleteSupplier } = useSupplierStore();

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(supplierSearchQuery.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(supplierSearchQuery.toLowerCase()) ||
    supplier.email.toLowerCase().includes(supplierSearchQuery.toLowerCase())
  );

  const handleCreateOrder = () => {
    setIsNewOrderOpen(true);
  };

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setIsSupplierFormOpen(true);
  };

  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier as Supplier);
    setIsSupplierFormOpen(true);
  };

  const handleDeleteSupplier = (id: any) => {
    deleteSupplier(id);
    toast({
      title: "Supplier Deleted",
      description: "The supplier has been successfully removed.",
    });
  };
  
  const handleOrderCreated = (order: PurchaseOrder) => {
    setOrders([...orders, order]);
    toast({
      title: "Order Created",
      description: `Purchase order ${order.id} has been created successfully.`,
    });
    setIsNewOrderOpen(false);
  };

  const handleViewOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsViewOrderOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Purchase Management</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <PurchaseStats orders={orders} />
          
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Purchase Orders</h2>
            <Button onClick={handleCreateOrder}>New Order</Button>
          </div>
          
          <PurchaseOrdersTable 
            data={orders} 
            onViewOrder={handleViewOrder} 
          />
        </TabsContent>
        
        <TabsContent value="suppliers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Suppliers</h2>
            <Button onClick={handleAddSupplier}>Add Supplier</Button>
          </div>
          
          <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
            <Input 
              placeholder="Search suppliers..." 
              value={supplierSearchQuery}
              onChange={(e) => setSupplierSearchQuery(e.target.value)}
            />
            <Button variant="secondary" onClick={() => setSupplierSearchQuery("")}>Clear</Button>
          </div>
          
          {filteredSuppliers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSuppliers.map((supplier) => (
                <Card key={supplier.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription>{supplier.contact}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Email: </span>{supplier.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone: </span>{supplier.phone}
                    </div>
                    <div>
                      <span className="font-medium">Address: </span>{supplier.address}
                    </div>
                  </CardContent>
                  <div className="flex justify-end p-4 pt-0">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditSupplier(supplier)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteSupplier(supplier.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border rounded-lg bg-gray-50">
              <p className="text-muted-foreground">No suppliers found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {isNewOrderOpen && (
        <NewOrderDialog
          isOpen={isNewOrderOpen}
          onClose={() => setIsNewOrderOpen(false)}
          onOrderCreated={handleOrderCreated}
          suppliers={suppliers}
        />
      )}
      
      {isViewOrderOpen && selectedOrder && (
        <ViewOrderDialog
          isOpen={isViewOrderOpen}
          onClose={() => setIsViewOrderOpen(false)}
          order={selectedOrder}
        />
      )}
      
      <SupplierFormDialog
        open={isSupplierFormOpen}
        onClose={() => setIsSupplierFormOpen(false)}
        supplier={selectedSupplier}
      />
    </div>
  );
};

export default Purchases;

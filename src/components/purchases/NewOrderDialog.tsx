
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/purchases/ProductList";
import OrderSummary from "@/components/purchases/OrderSummary";

type Supplier = {
  id: number;
  name: string;
  contact: string;
  email: string;
};

type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  unitCost: number;
};

type OrderItem = Product & {
  quantity: number;
  total: number;
};

interface NewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suppliers: Supplier[];
  products: Product[];
  onCreateOrder: (supplierId: string, items: OrderItem[]) => void;
}

const NewOrderDialog: React.FC<NewOrderDialogProps> = ({
  open,
  onOpenChange,
  suppliers,
  products,
  onCreateOrder
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("products");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productSearch, setProductSearch] = useState<string>("");

  // Filtered products based on search
  const filteredProducts = productSearch 
    ? products.filter(product => 
        product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        product.sku.toLowerCase().includes(productSearch.toLowerCase())
      )
    : products;

  // Handle adding product to order
  const addProductToOrder = (product: Product) => {
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
  };

  // Handle updating product quantity
  const updateProductQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setOrderItems(orderItems.map(item => 
      item.id === productId 
        ? { ...item, quantity, total: quantity * item.unitCost } 
        : item
    ));
  };

  // Handle removing product from order
  const removeProductFromOrder = (productId: number) => {
    setOrderItems(orderItems.filter(item => item.id !== productId));
  };

  // Calculate order total
  const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);

  // Reset form state when dialog closes
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setSelectedSupplier("");
      setOrderItems([]);
      setProductSearch("");
      setSelectedTab("products");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
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
                  <ProductList
                    products={filteredProducts}
                    searchTerm={productSearch}
                    onSearchChange={setProductSearch}
                    onAddProduct={addProductToOrder}
                  />
                </TabsContent>
                
                <TabsContent value="order" className="space-y-4 pt-4">
                  <OrderSummary
                    orderItems={orderItems}
                    onQuantityChange={updateProductQuantity}
                    onRemoveItem={removeProductFromOrder}
                    orderTotal={orderTotal}
                  />
                </TabsContent>
              </Tabs>
            </div>
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
            onClick={() => onCreateOrder(selectedSupplier, orderItems)}
            disabled={!selectedSupplier || orderItems.length === 0}
          >
            Create Purchase Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderDialog;

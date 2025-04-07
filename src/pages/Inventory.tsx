
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Sample product data
const initialProducts = [
  { 
    id: 1, 
    name: "Paracetamol 500mg", 
    sku: "PCM-500", 
    category: "Analgesics", 
    stock: 230, 
    price: 5.99, 
    expiry: "2025-10-15" 
  },
  { 
    id: 2, 
    name: "Amoxicillin 250mg", 
    sku: "AMX-250", 
    category: "Antibiotics", 
    stock: 120, 
    price: 8.50, 
    expiry: "2025-06-30" 
  }
];

// Product categories
const categories = ["Analgesics", "Antibiotics", "Antihistamines", "Cardiovascular", "Diabetes", "Respiratory"];

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    stock: 0,
    price: 0,
    expiry: ''
  });

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku || !newProduct.category || !newProduct.expiry) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const product = {
      id,
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      stock: Number(newProduct.stock),
      price: Number(newProduct.price),
      expiry: newProduct.expiry
    };
    
    setProducts([...products, product]);
    setNewProduct({ name: '', sku: '', category: '', stock: 0, price: 0, expiry: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Product Added",
      description: `${product.name} has been added to inventory.`,
    });
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  // Handle saving edited product
  const handleSaveEdit = () => {
    if (currentProduct) {
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
      setIsEditDialogOpen(false);
      
      toast({
        title: "Product Updated",
        description: `${currentProduct.name} has been updated.`,
      });
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = (product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Confirm product deletion
  const confirmDelete = () => {
    if (currentProduct) {
      setProducts(products.filter(p => p.id !== currentProduct.id));
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "Product Deleted",
        description: `${currentProduct.name} has been removed from inventory.`,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
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
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-2 align-middle">{product.name}</td>
                      <td className="p-2 align-middle">{product.sku}</td>
                      <td className="p-2 align-middle">{product.category}</td>
                      <td className="p-2 align-middle">{product.stock}</td>
                      <td className="p-2 align-middle">${product.price.toFixed(2)}</td>
                      <td className="p-2 align-middle">{product.expiry}</td>
                      <td className="p-2 align-middle">
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                            className="h-8 px-2 text-blue-500 hover:text-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteProduct(product)}
                            className="h-8 px-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                      No products found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add New Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter product details to add to your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name*
              </Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sku" className="text-right">
                SKU*
              </Label>
              <Input
                id="sku"
                value={newProduct.sku}
                onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category*
              </Label>
              <Select 
                value={newProduct.category}
                onValueChange={(value) => setNewProduct({...newProduct, category: value})}
              >
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock*
              </Label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price*
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry" className="text-right">
                Expiry Date*
              </Label>
              <Input
                id="expiry"
                type="date"
                value={newProduct.expiry}
                onChange={(e) => setNewProduct({...newProduct, expiry: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleAddProduct}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-sku" className="text-right">
                    SKU
                  </Label>
                  <Input
                    id="edit-sku"
                    value={currentProduct.sku}
                    onChange={(e) => setCurrentProduct({...currentProduct, sku: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-category" className="text-right">
                    Category
                  </Label>
                  <Select 
                    value={currentProduct.category}
                    onValueChange={(value) => setCurrentProduct({...currentProduct, category: value})}
                  >
                    <SelectTrigger id="edit-category" className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-stock" className="text-right">
                    Stock
                  </Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-expiry" className="text-right">
                    Expiry Date
                  </Label>
                  <Input
                    id="edit-expiry"
                    type="date"
                    value={currentProduct.expiry}
                    onChange={(e) => setCurrentProduct({...currentProduct, expiry: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="button" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Product Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="py-4">
              <p className="font-medium">{currentProduct.name}</p>
              <p className="text-sm text-muted-foreground">SKU: {currentProduct.sku}</p>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;

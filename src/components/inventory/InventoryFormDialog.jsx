
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInventoryStore, medicineCategories, medicineManufacturers } from '@/stores/inventoryStore';
import { toast } from "@/hooks/use-toast";

const InventoryFormDialog = ({ open, onOpenChange, onSave, item }) => {
  const isEditMode = !!item;
  const { categories, manufacturers, addCategory, addManufacturer } = useInventoryStore();
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    sku: "",
    category: "",
    medicineType: "strip", // Default to strip
    tabletsPerStrip: 10, // Default tablets per strip
    manufacturer: "",
    stock: 0,
    unitPrice: 0,
    reorderLevel: 0,
    expiryDate: "",
    location: ""
  });
  
  // State for new category/manufacturer inputs
  const [newCategory, setNewCategory] = useState("");
  const [newManufacturer, setNewManufacturer] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingManufacturer, setIsAddingManufacturer] = useState(false);
  
  // Fix for date selection issues
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Update form with item data when editing
  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name || "",
        sku: item.sku || "",
        category: item.category || "",
        medicineType: item.medicineType || "strip",
        tabletsPerStrip: item.tabletsPerStrip || 10,
        manufacturer: item.manufacturer || "",
        stock: item.stock || 0,
        unitPrice: item.unitPrice || 0,
        reorderLevel: item.reorderLevel || 0,
        expiryDate: item.expiryDate || "",
        location: item.location || ""
      });
      
      if (item.expiryDate) {
        setSelectedDate(new Date(item.expiryDate));
      } else {
        setSelectedDate(null);
      }
    } else {
      // Reset form for new item
      setFormData({
        id: "",
        name: "",
        sku: "",
        category: "",
        medicineType: "strip",
        tabletsPerStrip: 10,
        manufacturer: "",
        stock: 0,
        unitPrice: 0,
        reorderLevel: 0,
        expiryDate: "",
        location: ""
      });
      setSelectedDate(null);
    }
  }, [item, open]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setFormData((prev) => ({
        ...prev,
        expiryDate: date.toISOString()
      }));
    }
  };
  
  const handleAddNewCategory = () => {
    if (newCategory.trim() === "") {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    addCategory(newCategory);
    setFormData(prev => ({
      ...prev,
      category: newCategory
    }));
    setNewCategory("");
    setIsAddingCategory(false);
    
    toast({
      title: "Success",
      description: "New category added successfully"
    });
  };
  
  const handleAddNewManufacturer = () => {
    if (newManufacturer.trim() === "") {
      toast({
        title: "Error",
        description: "Manufacturer name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    addManufacturer(newManufacturer);
    setFormData(prev => ({
      ...prev,
      manufacturer: newManufacturer
    }));
    setNewManufacturer("");
    setIsAddingManufacturer(false);
    
    toast({
      title: "Success",
      description: "New manufacturer added successfully"
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Inventory Item" : "Add Inventory Item"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update details of this inventory item." : "Add a new product to your inventory."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Enter SKU"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              {isAddingCategory ? (
                <div className="flex space-x-2 items-center">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                  />
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={handleAddNewCategory}
                  >
                    Add
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAddingCategory(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 items-center">
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAddingCategory(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="medicineType">Medicine Type</Label>
              <Select
                value={formData.medicineType}
                onValueChange={(value) => handleSelectChange("medicineType", value)}
              >
                <SelectTrigger id="medicineType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strip">Strip</SelectItem>
                  <SelectItem value="syrup">Syrup</SelectItem>
                  <SelectItem value="unit">Unit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {formData.medicineType === "strip" && (
            <div className="space-y-2">
              <Label htmlFor="tabletsPerStrip">Tablets Per Strip</Label>
              <Input
                id="tabletsPerStrip"
                name="tabletsPerStrip"
                type="number"
                value={formData.tabletsPerStrip}
                onChange={handleNumberChange}
                min={1}
                required
              />
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              {isAddingManufacturer ? (
                <div className="flex space-x-2 items-center">
                  <Input
                    value={newManufacturer}
                    onChange={(e) => setNewManufacturer(e.target.value)}
                    placeholder="New manufacturer name"
                  />
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={handleAddNewManufacturer}
                  >
                    Add
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAddingManufacturer(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 items-center">
                  <Select
                    value={formData.manufacturer}
                    onValueChange={(value) => handleSelectChange("manufacturer", value)}
                  >
                    <SelectTrigger id="manufacturer" className="w-full">
                      <SelectValue placeholder="Select manufacturer" />
                    </SelectTrigger>
                    <SelectContent>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem key={manufacturer} value={manufacturer}>
                          {manufacturer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAddingManufacturer(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Storage Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter storage location"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Current Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleNumberChange}
                min={0}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reorderLevel">Reorder Level</Label>
              <Input
                id="reorderLevel"
                name="reorderLevel"
                type="number"
                value={formData.reorderLevel}
                onChange={handleNumberChange}
                min={0}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitPrice">Unit Price (₹)</Label>
              <Input
                id="unitPrice"
                name="unitPrice"
                type="number"
                value={formData.unitPrice}
                onChange={handleNumberChange}
                min={0}
                step={0.01}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update" : "Add"} Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryFormDialog;

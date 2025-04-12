
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const InventoryFormDialog = ({ open, onOpenChange, onSave, item }) => {
  const isEditMode = !!item;
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    sku: "",
    description: "",
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
  
  // Update form with item data when editing
  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name || "",
        sku: item.sku || "",
        description: item.description || "",
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
    } else {
      // Reset form for new item
      setFormData({
        id: "",
        name: "",
        sku: "",
        description: "",
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
    setFormData((prev) => ({
      ...prev,
      expiryDate: date ? date.toISOString() : ""
    }));
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
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tablets">Tablets</SelectItem>
                  <SelectItem value="Syrup">Syrup</SelectItem>
                  <SelectItem value="Injection">Injection</SelectItem>
                  <SelectItem value="Capsules">Capsules</SelectItem>
                  <SelectItem value="Topical">Topical</SelectItem>
                  <SelectItem value="Drops">Drops</SelectItem>
                  <SelectItem value="Inhaler">Inhaler</SelectItem>
                  <SelectItem value="OTC">OTC</SelectItem>
                </SelectContent>
              </Select>
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
              <Input
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                placeholder="Enter manufacturer"
              />
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
                      !formData.expiryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.expiryDate ? format(new Date(formData.expiryDate), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.expiryDate ? new Date(formData.expiryDate) : undefined}
                    onSelect={handleDateChange}
                    initialFocus
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

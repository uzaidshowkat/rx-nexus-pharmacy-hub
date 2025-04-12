
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useInventoryStore } from '@/stores/inventoryStore';

const CategoryManagementDialog = ({ open, onClose, type = 'categories' }) => {
  const { 
    categories, 
    manufacturers, 
    addCategory, 
    addManufacturer 
  } = useInventoryStore();
  
  const items = type === 'categories' ? categories : manufacturers;
  const addItem = type === 'categories' ? addCategory : addManufacturer;
  
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState('');

  const handleAddItem = () => {
    if (!newItem.trim()) {
      setError(`Please enter a ${type === 'categories' ? 'category' : 'manufacturer'} name`);
      return;
    }
    
    if (items.includes(newItem.trim())) {
      setError(`This ${type === 'categories' ? 'category' : 'manufacturer'} already exists`);
      return;
    }
    
    addItem(newItem.trim());
    setNewItem('');
    setError('');
    
    toast({
      title: `${type === 'categories' ? 'Category' : 'Manufacturer'} Added`,
      description: `${newItem.trim()} has been added to the list.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Manage {type === 'categories' ? 'Medicine Categories' : 'Manufacturers'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder={`Add new ${type === 'categories' ? 'category' : 'manufacturer'}`}
              value={newItem}
              onChange={(e) => {
                setNewItem(e.target.value);
                setError('');
              }}
              className="flex-1"
            />
            <Button onClick={handleAddItem}>Add</Button>
          </div>
          
          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}
          
          <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
            <h3 className="font-medium mb-2">
              Current {type === 'categories' ? 'Categories' : 'Manufacturers'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-muted/30 rounded-md px-3 py-1"
                >
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryManagementDialog;

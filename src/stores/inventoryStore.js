
import { create } from 'zustand';
import { inventoryItems as initialItems } from '@/components/purchases/PurchaseData';

export const useInventoryStore = create((set, get) => ({
  items: initialItems,
  
  addItem: (item) => {
    set((state) => ({
      items: [...state.items, item]
    }));
  },
  
  updateItem: (item) => {
    set((state) => ({
      items: state.items.map((i) => 
        i.id === item.id ? item : i
      )
    }));
  },
  
  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id)
    }));
  },
  
  getItemById: (id) => {
    return get().items.find(item => item.id === id);
  },
  
  getItemsByCategoryOrSearch: (term) => {
    const lowerTerm = term.toLowerCase();
    return get().items.filter(item => 
      item.name.toLowerCase().includes(lowerTerm) ||
      item.category.toLowerCase().includes(lowerTerm) ||
      item.sku.toLowerCase().includes(lowerTerm)
    );
  }
}));

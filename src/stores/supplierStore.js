
import { create } from 'zustand';

// Initial suppliers data
const initialSuppliers = [
  {
    id: "1",
    name: "MedSupply Corp",
    contact: "John Smith",
    email: "contact@medsupplycorp.com",
    phone: "(555) 123-4567",
    address: "123 Medical Way, Pharma City, CA 90001"
  },
  {
    id: "2",
    name: "Healthcare Distributors",
    contact: "Sarah Johnson",
    email: "info@healthcaredist.com",
    phone: "(555) 234-5678",
    address: "456 Pharmacy Drive, Medicine Town, NY 10001"
  },
  {
    id: "3",
    name: "PharmWholesale Inc",
    contact: "Michael Davis",
    email: "service@pharmwholesale.com",
    phone: "(555) 345-6789",
    address: "789 Prescription Lane, Remedy City, TX 75001"
  }
];

export const useSupplierStore = create((set, get) => ({
  suppliers: initialSuppliers,
  
  addSupplier: (supplier) => {
    set((state) => ({
      suppliers: [...state.suppliers, supplier]
    }));
  },
  
  updateSupplier: (supplier) => {
    set((state) => ({
      suppliers: state.suppliers.map((s) => 
        s.id === supplier.id ? supplier : s
      )
    }));
  },
  
  deleteSupplier: (id) => {
    set((state) => ({
      suppliers: state.suppliers.filter((s) => s.id !== id)
    }));
  },
  
  getSupplierById: (id) => {
    return get().suppliers.find(supplier => supplier.id === id);
  }
}));


import { create } from 'zustand';
import { customers as initialCustomers } from '@/components/purchases/PurchaseData';

export const useCustomerStore = create((set, get) => ({
  customers: initialCustomers,
  
  addCustomer: (customer) => {
    set((state) => ({
      customers: [...state.customers, customer]
    }));
  },
  
  updateCustomer: (customer) => {
    set((state) => ({
      customers: state.customers.map((c) => 
        c.id === customer.id ? customer : c
      )
    }));
  },
  
  deleteCustomer: (id) => {
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id)
    }));
  },
  
  getCustomerById: (id) => {
    return get().customers.find(customer => customer.id === id);
  }
}));


import { create } from 'zustand';
import { customers as initialCustomers } from '@/components/purchases/PurchaseData';

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateRegistered: string;
  prescriptions: number;
  lastVisit: string;
}

type CustomerStore = {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: number) => void;
  getCustomerById: (id: number) => Customer | undefined;
}

export const useCustomerStore = create<CustomerStore>((set, get) => ({
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


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { customers as initialCustomers } from '@/components/purchases/PurchaseData';

export const useCustomerStore = create(
  persist(
    (set) => ({
      customers: initialCustomers,
      
      addCustomer: (customer) => {
        set((state) => ({
          customers: [...state.customers, customer]
        }));
      },
      
      updateCustomer: (updatedCustomer) => {
        set((state) => ({
          customers: state.customers.map((customer) => 
            customer.id === updatedCustomer.id ? updatedCustomer : customer
          )
        }));
      },
      
      deleteCustomer: (id) => {
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id)
        }));
      },
      
      getCustomerById: (id) => {
        return useCustomerStore.getState().customers.find(customer => customer.id === id);
      }
    }),
    {
      name: 'pharmacy-customers-storage', // Name for localStorage
    }
  )
);


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sales as initialSales } from '@/components/purchases/PurchaseData';
import { useInventoryStore } from './inventoryStore';

export const useSalesStore = create(
  persist(
    (set, get) => ({
      sales: initialSales,
      
      addSale: (sale) => {
        // Update inventory stock when a sale is made
        const updatedSale = {
          ...sale,
          date: sale.date || new Date().toISOString()
        };
        
        // Update inventory stock based on this sale
        useInventoryStore.getState().updateStockFromSale(sale.items);
        
        set((state) => ({
          sales: [updatedSale, ...state.sales]
        }));
      },
      
      updateSale: (updatedSale) => {
        set((state) => ({
          sales: state.sales.map((sale) => 
            sale.id === updatedSale.id ? updatedSale : sale
          )
        }));
      },
      
      deleteSale: (id) => {
        set((state) => ({
          sales: state.sales.filter((sale) => sale.id !== id)
        }));
      },
      
      getSaleById: (id) => {
        return get().sales.find(sale => sale.id === id);
      },
      
      getSalesByCustomerId: (customerId) => {
        return get().sales.filter(sale => sale.customerId === customerId);
      },
      
      // Statistics for dashboard
      getTodaySales: () => {
        const today = new Date().toDateString();
        return get().sales
          .filter(sale => new Date(sale.date).toDateString() === today)
          .reduce((sum, sale) => sum + sale.totalAmount, 0);
      },
      
      getMonthSales: () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        return get().sales
          .filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
          })
          .reduce((sum, sale) => sum + sale.totalAmount, 0);
      },
      
      getUniqueCustomerCount: () => {
        const uniqueCustomers = new Set();
        get().sales.forEach(sale => {
          if (sale.customerId) {
            uniqueCustomers.add(sale.customerId);
          }
        });
        return uniqueCustomers.size;
      }
    }),
    {
      name: 'pharmacy-sales-storage', // Name for localStorage
    }
  )
);

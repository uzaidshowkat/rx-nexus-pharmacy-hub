
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye } from "lucide-react";

type SaleItem = {
  product: string;
  quantity: number;
  price: number;
  total: number;
}

type Sale = {
  id: string;
  date: string;
  customer: string;
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: string;
}

interface SalesTableProps {
  sales: Sale[];
  onView: (sale: Sale) => void;
}

const SalesTable: React.FC<SalesTableProps> = ({ sales, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSales, setFilteredSales] = useState<Sale[]>(sales);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term) {
      setFilteredSales(sales);
      return;
    }
    
    const filtered = sales.filter(
      sale => 
        sale.id.toLowerCase().includes(term) || 
        sale.customer.toLowerCase().includes(term)
    );
    
    setFilteredSales(filtered);
  };

  // Update filtered sales when original list changes
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = sales.filter(
        sale => 
          sale.id.toLowerCase().includes(term) || 
          sale.customer.toLowerCase().includes(term)
      );
      setFilteredSales(filtered);
    } else {
      setFilteredSales(sales);
    }
  }, [sales, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search sales..." 
            className="pl-8 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="relative w-full overflow-auto rounded-md border">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b bg-muted/50">
            <tr>
              <th className="h-10 px-4 text-left align-middle font-medium">Sale ID</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Date</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Customer</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Items</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Total Amount</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Payment Method</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-2 align-middle">{sale.id}</td>
                <td className="p-2 align-middle">{new Date(sale.date).toLocaleDateString()}</td>
                <td className="p-2 align-middle">{sale.customer}</td>
                <td className="p-2 align-middle">{sale.items.length} items</td>
                <td className="p-2 align-middle">${sale.totalAmount.toFixed(2)}</td>
                <td className="p-2 align-middle">{sale.paymentMethod}</td>
                <td className="p-2 align-middle">
                  <Button variant="ghost" size="sm" onClick={() => onView(sale)}>
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;

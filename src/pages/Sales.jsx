
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, DollarSign, TrendingUp, CreditCard, UserPlus } from "lucide-react";
import SalesTable from '@/components/sales/SalesTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import NewSaleForm from '@/components/sales/NewSaleForm';
import InvoiceGenerator from '@/components/sales/InvoiceGenerator';
import { useSalesStore } from '@/stores/salesStore';
import { useInventoryStore } from '@/stores/inventoryStore';

const Sales = () => {
  const { sales, addSale, getSaleById } = useSalesStore();
  const { updateStockFromSale } = useInventoryStore();
  
  const [selectedSale, setSelectedSale] = useState(null);
  const [isSaleDetailsOpen, setIsSaleDetailsOpen] = useState(false);
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  
  // Calculate sales metrics
  const todaySales = sales
    .filter(sale => new Date(sale.date).toDateString() === new Date().toDateString())
    .reduce((sum, sale) => sum + sale.totalAmount, 0);
    
  const thisMonthSales = sales
    .filter(sale => {
      const saleDate = new Date(sale.date);
      const today = new Date();
      return saleDate.getMonth() === today.getMonth() && saleDate.getFullYear() === today.getFullYear();
    })
    .reduce((sum, sale) => sum + sale.totalAmount, 0);
    
  const totalTransactions = sales.length;
  
  const uniqueCustomers = new Set(sales.map(sale => sale.customer)).size;

  const handleViewSale = (sale) => {
    setSelectedSale(sale);
    setIsSaleDetailsOpen(true);
  };

  const handleCreateNewSale = () => {
    setIsNewSaleOpen(true);
  };
  
  const handleSaveNewSale = (sale) => {
    addSale(sale);
    setIsNewSaleOpen(false);
    
    toast({
      title: "Sale Created",
      description: `Sale #${sale.id} has been created successfully`,
    });
  };
  
  const handleGenerateInvoice = () => {
    setIsSaleDetailsOpen(false);
    setIsInvoiceOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Sales Management</h1>
        <Button onClick={handleCreateNewSale}>
          <Plus className="mr-2 h-4 w-4" />
          New Sale
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-primary" />
              Today's Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{todaySales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{thisMonthSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserPlus className="h-4 w-4 mr-2 text-primary" />
              Unique Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCustomers}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>View and manage your sales transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <SalesTable 
            sales={sales}
            onView={handleViewSale}
          />
        </CardContent>
      </Card>
      
      {/* Sale Details Dialog */}
      <Dialog open={isSaleDetailsOpen} onOpenChange={setIsSaleDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sale Details</DialogTitle>
          </DialogHeader>
          
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Sale ID:</div>
                <div className="col-span-2">{selectedSale.id}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Date:</div>
                <div className="col-span-2">{new Date(selectedSale.date).toLocaleDateString()}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Customer:</div>
                <div className="col-span-2">{selectedSale.customer}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Payment Method:</div>
                <div className="col-span-2">{selectedSale.paymentMethod}</div>
              </div>
              
              <div className="border-t pt-2">
                <h3 className="font-medium mb-2">Items</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-1 text-left">Product</th>
                      <th className="py-1 text-center">Qty</th>
                      <th className="py-1 text-right">Price</th>
                      <th className="py-1 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSale.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-1">{item.product}</td>
                        <td className="py-1 text-center">{item.quantity}</td>
                        <td className="py-1 text-right">₹{item.price.toFixed(2)}</td>
                        <td className="py-1 text-right">₹{item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td className="py-2" colSpan={3} align="right">Total:</td>
                      <td className="py-2 text-right">₹{selectedSale.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setIsSaleDetailsOpen(false)}>
                  Close
                </Button>
                <Button onClick={handleGenerateInvoice}>
                  Generate Invoice
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* New Sale Dialog */}
      <Dialog open={isNewSaleOpen} onOpenChange={setIsNewSaleOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Sale</DialogTitle>
            <DialogDescription>Add products and customer information to create a new sale</DialogDescription>
          </DialogHeader>
          
          <NewSaleForm 
            onCreateSale={handleSaveNewSale}
            onCancel={() => setIsNewSaleOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Invoice Dialog */}
      <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Invoice</DialogTitle>
            <DialogDescription>Sale invoice ready to download</DialogDescription>
          </DialogHeader>
          
          {selectedSale && <InvoiceGenerator sale={selectedSale} />}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvoiceOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sales;

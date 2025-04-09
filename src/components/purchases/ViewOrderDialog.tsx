
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Download, Printer } from "lucide-react";

type PurchaseOrder = {
  id: string;
  supplier: string;
  date: string;
  items: number;
  total: number;
  status: string;
};

interface ViewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: PurchaseOrder | null;
  onMarkDelivered: (orderId: string) => void;
}

const ViewOrderDialog: React.FC<ViewOrderDialogProps> = ({
  open,
  onOpenChange,
  order,
  onMarkDelivered
}) => {
  if (!order) return null;

  const handleEditOrder = () => {
    toast({
      title: "Edit Order",
      description: `Opening edit form for order ${order.id}`,
    });
    // In a real app, this would open an edit form or navigate to an edit page
  };

  const handleMarkDelivered = () => {
    onMarkDelivered(order.id);
    onOpenChange(false);
  };
  
  const handlePrintOrder = () => {
    toast({
      title: "Printing Order",
      description: `Printing purchase order ${order.id}`,
    });
    // In a real app, this would print the order
    window.print();
  };
  
  const handleDownloadOrder = () => {
    toast({
      title: "Download Started",
      description: `Purchase order ${order.id} is being downloaded`,
    });
    
    // Create and trigger download of order data
    const orderData = `Order ID,Supplier,Date,Items,Total,Status\n${order.id},${order.supplier},${order.date},${order.items},${order.total},${order.status}`;
    const blob = new Blob([orderData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `purchase_order_${order.id}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase Order Details</DialogTitle>
          <DialogDescription>
            View information about this purchase order.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-1">
              <div className="font-medium">Order ID:</div>
              <div className="col-span-2">{order.id}</div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="font-medium">Supplier:</div>
              <div className="col-span-2">{order.supplier}</div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="font-medium">Date Created:</div>
              <div className="col-span-2">{order.date}</div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="font-medium">Total Items:</div>
              <div className="col-span-2">{order.items}</div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="font-medium">Total Cost:</div>
              <div className="col-span-2">${order.total.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="font-medium">Status:</div>
              <div className="col-span-2">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                  order.status === "pending"
                    ? "bg-amber-500 text-white"
                    : "bg-green-500 text-white"
                }`}>
                  {order.status === "pending" ? "Pending" : "Delivered"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handlePrintOrder} className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadOrder} className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
            
            {order.status === "pending" && (
              <>
                <Button variant="outline" onClick={handleEditOrder}>Edit Order</Button>
                <Button onClick={handleMarkDelivered}>
                  Mark as Delivered
                </Button>
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrderDialog;

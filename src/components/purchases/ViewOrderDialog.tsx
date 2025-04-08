
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
          
          {order.status === "pending" && (
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleEditOrder}>Edit Order</Button>
              <Button onClick={handleMarkDelivered}>
                Mark as Delivered
              </Button>
            </div>
          )}
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

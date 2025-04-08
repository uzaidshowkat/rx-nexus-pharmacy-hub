
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateRegistered: string;
  prescriptions: number;
  lastVisit: string;
}

interface CustomerViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  onEdit: (customer: Customer) => void;
}

const CustomerViewDialog: React.FC<CustomerViewDialogProps> = ({
  open,
  onOpenChange,
  customer,
  onEdit
}) => {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>
            View detailed information about this customer.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">Name:</div>
            <div className="col-span-2">{customer.name}</div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">Email:</div>
            <div className="col-span-2">{customer.email}</div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">Phone:</div>
            <div className="col-span-2">{customer.phone}</div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">Address:</div>
            <div className="col-span-2">{customer.address}</div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">Registered:</div>
            <div className="col-span-2">{new Date(customer.dateRegistered).toLocaleDateString()}</div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">Prescriptions:</div>
            <div className="col-span-2">{customer.prescriptions} active prescriptions</div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="font-medium">Last Visit:</div>
            <div className="col-span-2">{new Date(customer.lastVisit).toLocaleDateString()}</div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Prescription refill on {new Date(customer.lastVisit).toLocaleDateString()}</p>
            <p className="text-sm text-muted-foreground">Purchase of over-the-counter medication on {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
        </div>
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => {
            onOpenChange(false);
            onEdit(customer);
          }}>
            Edit Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerViewDialog;

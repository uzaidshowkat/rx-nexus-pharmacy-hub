
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
  
  const handlePrintDetails = () => {
    toast({
      title: "Customer Details",
      description: "Printing customer details...",
    });
    // In a real app, this would trigger a print functionality
    window.print();
  };

  const handleDownloadData = () => {
    toast({
      title: "Download Started",
      description: "Customer data is being downloaded as CSV",
    });
    
    // Create and trigger a download for the customer data
    const csvContent = `Name,Email,Phone,Address,Date Registered,Prescriptions,Last Visit\n${customer.name},${customer.email},${customer.phone},"${customer.address}",${customer.dateRegistered},${customer.prescriptions},${customer.lastVisit}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `customer_${customer.id}_details.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button variant="outline" onClick={handlePrintDetails} className="w-full sm:w-auto">
            Print Details
          </Button>
          <Button variant="outline" onClick={handleDownloadData} className="w-full sm:w-auto">
            Download Data
          </Button>
          <Button onClick={() => {
            onOpenChange(false);
            onEdit(customer);
          }} className="w-full sm:w-auto">
            Edit Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerViewDialog;

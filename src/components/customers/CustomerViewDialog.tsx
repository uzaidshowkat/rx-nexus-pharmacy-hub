
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Download, Printer, File, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  
  const [activeTab, setActiveTab] = useState('details');

  // Mock prescriptions data - in a real app, this would come from your store
  const mockPrescriptions = [
    {
      id: 1,
      date: new Date().toISOString(),
      doctor: "Dr. Sharma",
      medications: ["Crocin 500mg", "Azithromycin 250mg"],
      status: "Active"
    },
    {
      id: 2,
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      doctor: "Dr. Patel",
      medications: ["Pantoprazole 40mg", "Montelukast 10mg"],
      status: "Completed"
    }
  ];
  
  // Mock sales/invoices data - in a real app, this would come from your store
  const mockSales = [
    {
      id: "INV-2023-001",
      date: new Date().toISOString(),
      amount: 1250.75,
      items: 3,
      status: "Paid"
    },
    {
      id: "INV-2023-002",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 785.50,
      items: 2,
      status: "Paid"
    }
  ];
  
  const handlePrintDetails = () => {
    toast({
      title: "Printing Customer Details",
      description: "Sending customer details to printer...",
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
  
  const handleViewInvoice = (invoiceId: string) => {
    toast({
      title: "Opening Invoice",
      description: `Viewing invoice ${invoiceId}`,
    });
    // In a real app, this would open the invoice viewer
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
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="prescriptions">
              Prescriptions <span className="ml-1 text-xs bg-primary/10 px-1 rounded-full">{mockPrescriptions.length}</span>
            </TabsTrigger>
            <TabsTrigger value="invoices">
              Invoices <span className="ml-1 text-xs bg-primary/10 px-1 rounded-full">{mockSales.length}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="prescriptions" className="space-y-4">
            {mockPrescriptions.length > 0 ? (
              <div className="space-y-4">
                {mockPrescriptions.map(prescription => (
                  <div key={prescription.id} className="border rounded p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Prescription #{prescription.id}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(prescription.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        prescription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {prescription.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Doctor:</span> {prescription.doctor}</p>
                      <p className="text-sm"><span className="font-medium">Medications:</span></p>
                      <ul className="text-sm list-disc pl-5">
                        {prescription.medications.map((med, idx) => (
                          <li key={idx}>{med}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" variant="ghost">
                        <File className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No prescriptions found for this customer.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="invoices" className="space-y-4">
            {mockSales.length > 0 ? (
              <div className="space-y-4">
                {mockSales.map(sale => (
                  <div key={sale.id} className="border rounded p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{sale.id}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(sale.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        {sale.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm"><span className="font-medium">Items:</span> {sale.items}</p>
                      </div>
                      <p className="text-md font-medium">₹{sale.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" variant="ghost" onClick={() => handleViewInvoice(sale.id)}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        View Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No invoices found for this customer.
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button variant="outline" onClick={handlePrintDetails} className="w-full sm:w-auto">
            <Printer className="mr-2 h-4 w-4" />
            Print Details
          </Button>
          <Button variant="outline" onClick={handleDownloadData} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
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

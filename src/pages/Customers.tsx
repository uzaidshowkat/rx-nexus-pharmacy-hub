
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  FileExport, 
  Eye, 
  Edit, 
  Plus, 
  UserPlus 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "@/hooks/use-toast";

// Sample customer data
const initialCustomers = [
  { 
    id: 1, 
    name: "John Smith", 
    contact: "(555) 123-4567", 
    email: "john.smith@example.com", 
    prescriptions: 3, 
    lastVisit: "Apr 02, 2025", 
    totalSpent: 325.75 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    contact: "(555) 987-6543", 
    email: "sarah.j@example.com", 
    prescriptions: 1, 
    lastVisit: "Apr 05, 2025", 
    totalSpent: 142.50 
  },
  { 
    id: 3, 
    name: "Michael Brown", 
    contact: "(555) 234-5678", 
    email: "m.brown@example.com", 
    prescriptions: 5, 
    lastVisit: "Apr 01, 2025", 
    totalSpent: 427.80 
  },
  { 
    id: 4, 
    name: "Emma Wilson", 
    contact: "(555) 345-6789", 
    email: "emma.w@example.com", 
    prescriptions: 2, 
    lastVisit: "Apr 03, 2025", 
    totalSpent: 213.25 
  },
  { 
    id: 5, 
    name: "Robert Davis", 
    contact: "(555) 456-7890", 
    email: "robert.d@example.com", 
    prescriptions: 0, 
    lastVisit: "Mar 28, 2025", 
    totalSpent: 89.99 
  }
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    notes: ''
  });

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.includes(searchTerm)
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle adding a new customer
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.contact) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const id = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    
    const customer = {
      id,
      name: newCustomer.name,
      contact: newCustomer.contact,
      email: newCustomer.email,
      prescriptions: 0,
      lastVisit: today,
      totalSpent: 0
    };
    
    setCustomers([...customers, customer]);
    setNewCustomer({ name: '', contact: '', email: '', address: '', notes: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Customer Added",
      description: `${customer.name} has been added successfully.`,
    });
  };

  // Handle viewing customer details
  const handleViewCustomer = (customer) => {
    setCurrentCustomer(customer);
    setIsViewDialogOpen(true);
  };

  // Handle editing customer
  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer);
    setIsEditDialogOpen(true);
  };

  // Handle saving edited customer
  const handleSaveEdit = () => {
    if (currentCustomer) {
      setCustomers(customers.map(c => c.id === currentCustomer.id ? currentCustomer : c));
      setIsEditDialogOpen(false);
      
      toast({
        title: "Customer Updated",
        description: `${currentCustomer.name}'s information has been updated.`,
      });
    }
  };

  // Handle exporting customers data
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Customer data export has begun. The file will download shortly.",
    });

    // Simulated export delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Customer data has been exported successfully.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Customer Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Customer
        </Button>
      </div>
      
      <div className="w-full flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium leading-none mb-3">Filter Customers</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="active-prescriptions" />
                  <Label htmlFor="active-prescriptions">Has Active Prescriptions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="recent-visit" />
                  <Label htmlFor="recent-visit">Visited in Last 30 Days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="high-value" />
                  <Label htmlFor="high-value">High Value ({'>'}$300 spent)</Label>
                </div>
              </div>
              <div className="pt-2 flex justify-between">
                <Button variant="outline" size="sm">Reset</Button>
                <Button size="sm">Apply Filters</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button variant="outline" onClick={handleExport}>
          <FileExport className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>Manage your pharmacy customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Contact</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Email</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Prescriptions</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Last Visit</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Total Spent</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-2 align-middle">{customer.name}</td>
                      <td className="p-2 align-middle">{customer.contact}</td>
                      <td className="p-2 align-middle">{customer.email}</td>
                      <td className="p-2 align-middle">
                        {customer.prescriptions > 0 ? (
                          <Badge variant="secondary" className="text-xs">
                            {customer.prescriptions} active
                          </Badge>
                        ) : (
                          "None"
                        )}
                      </td>
                      <td className="p-2 align-middle">{customer.lastVisit}</td>
                      <td className="p-2 align-middle">${customer.totalSpent.toFixed(2)}</td>
                      <td className="p-2 align-middle">
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewCustomer(customer)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditCustomer(customer)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                      No customers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      
      {/* Add New Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter customer details below to add them to your system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name*
              </Label>
              <Input
                id="name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email*
              </Label>
              <Input
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact*
              </Label>
              <Input
                id="contact"
                value={newCustomer.contact}
                onChange={(e) => setNewCustomer({...newCustomer, contact: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                value={newCustomer.notes}
                onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleAddCustomer}>
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {currentCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Name:</div>
                <div className="col-span-2">{currentCustomer.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Contact:</div>
                <div className="col-span-2">{currentCustomer.contact}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Email:</div>
                <div className="col-span-2">{currentCustomer.email}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Prescriptions:</div>
                <div className="col-span-2">{currentCustomer.prescriptions} active</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Last Visit:</div>
                <div className="col-span-2">{currentCustomer.lastVisit}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-medium">Total Spent:</div>
                <div className="col-span-2">${currentCustomer.totalSpent.toFixed(2)}</div>
              </div>
              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => handleEditCustomer(currentCustomer)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Details
                </Button>
                <Button onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              Update customer information below.
            </DialogDescription>
          </DialogHeader>
          {currentCustomer && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={currentCustomer.name}
                    onChange={(e) => setCurrentCustomer({...currentCustomer, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentCustomer.email}
                    onChange={(e) => setCurrentCustomer({...currentCustomer, email: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-contact" className="text-right">
                    Contact
                  </Label>
                  <Input
                    id="edit-contact"
                    value={currentCustomer.contact}
                    onChange={(e) => setCurrentCustomer({...currentCustomer, contact: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="button" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;

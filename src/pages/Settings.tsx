
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your pharmacy system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Pharmacy Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pharmacyName">Pharmacy Name</Label>
                    <Input id="pharmacyName" placeholder="Enter pharmacy name" defaultValue="RxNexus Pharmacy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input id="licenseNumber" placeholder="Enter license number" defaultValue="PL-2025-00123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email" defaultValue="contact@rxnexus.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" defaultValue="(555) 123-4567" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Address</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="Enter address" defaultValue="123 Main Street" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Enter city" defaultValue="Anytown" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="Enter state" defaultValue="CA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input id="zipCode" placeholder="Enter zip code" defaultValue="12345" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-10 px-4 text-left align-middle font-medium">Name</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Email</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Role</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Last Login</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-2 align-middle">Admin User</td>
                      <td className="p-2 align-middle">admin@rxnexus.com</td>
                      <td className="p-2 align-middle">Administrator</td>
                      <td className="p-2 align-middle">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white">Active</span>
                      </td>
                      <td className="p-2 align-middle">Today, 8:30 AM</td>
                      <td className="p-2 align-middle">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-2 align-middle">Pharmacist</td>
                      <td className="p-2 align-middle">pharmacist@rxnexus.com</td>
                      <td className="p-2 align-middle">Pharmacist</td>
                      <td className="p-2 align-middle">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white">Active</span>
                      </td>
                      <td className="p-2 align-middle">Today, 9:15 AM</td>
                      <td className="p-2 align-middle">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-2 align-middle">Technician</td>
                      <td className="p-2 align-middle">tech@rxnexus.com</td>
                      <td className="p-2 align-middle">Pharmacy Technician</td>
                      <td className="p-2 align-middle">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white">Active</span>
                      </td>
                      <td className="p-2 align-middle">Yesterday, 5:30 PM</td>
                      <td className="p-2 align-middle">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <Button>Add New User</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b py-4">
                  <div>
                    <h4 className="font-medium">Low Stock Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify when inventory items fall below threshold
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b py-4">
                  <div>
                    <h4 className="font-medium">Expiry Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify when products are close to expiration date
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b py-4">
                  <div>
                    <h4 className="font-medium">New E-Prescription Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify when new digital prescriptions are received
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b py-4">
                  <div>
                    <h4 className="font-medium">Prescription Refill Reminders</h4>
                    <p className="text-sm text-muted-foreground">
                      Send reminders for prescriptions due for refill
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="font-medium">System Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify about system updates and maintenance
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pharmacy" className="mt-4">
          <p className="text-muted-foreground">Pharmacy settings content</p>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-4">
          <p className="text-muted-foreground">Integrations settings content</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

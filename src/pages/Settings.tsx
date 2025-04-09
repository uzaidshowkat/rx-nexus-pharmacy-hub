
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const generalSchema = z.object({
  pharmacyName: z.string().min(2, "Pharmacy name is required"),
  licenseNumber: z.string().min(2, "License number is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid zip code is required")
});

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  darkMode: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
  };
};

const Settings = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam || 'general');
  const [notificationSettings, setNotificationSettings] = useState({
    lowStock: true,
    expiry: true,
    ePrescription: true,
    refill: true,
    systemUpdates: true
  });
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "Admin",
    lastName: "User",
    email: "admin@rxnexus.com",
    role: "Administrator",
    phone: "(555) 987-6543",
    darkMode: false,
    notifications: {
      email: true,
      push: true,
      inApp: true
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30
    }
  });

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  
  const generalForm = useForm<z.infer<typeof generalSchema>>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      pharmacyName: "RxNexus Pharmacy",
      licenseNumber: "PL-2025-00123",
      email: "contact@rxnexus.com",
      phone: "(555) 123-4567",
      address: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zipCode: "12345"
    }
  });

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };

  const toggleDarkMode = () => {
    setProfileData({
      ...profileData,
      darkMode: !profileData.darkMode
    });
    
    toast({
      title: "Display Setting Changed",
      description: `Dark mode has been ${!profileData.darkMode ? "enabled" : "disabled"}.`,
    });
  };
  
  const toggleNotificationSetting = (key: keyof ProfileData["notifications"]) => {
    setProfileData({
      ...profileData,
      notifications: {
        ...profileData.notifications,
        [key]: !profileData.notifications[key]
      }
    });
  };
  
  const toggleTwoFactor = () => {
    setProfileData({
      ...profileData,
      security: {
        ...profileData.security,
        twoFactor: !profileData.security.twoFactor
      }
    });
    
    toast({
      title: "Security Setting Updated",
      description: `Two-factor authentication has been ${!profileData.security.twoFactor ? "enabled" : "disabled"}.`,
    });
  };
  
  const handleSessionTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 5) {
      setProfileData({
        ...profileData,
        security: {
          ...profileData.security,
          sessionTimeout: value
        }
      });
    }
  };
  
  const onGeneralSubmit = (data: z.infer<typeof generalSchema>) => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
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
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Pharmacy Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={generalForm.control}
                        name="pharmacyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pharmacy Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="licenseNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>License Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Address</h3>
                    <div className="grid gap-4">
                      <FormField
                        control={generalForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid gap-4 md:grid-cols-3">
                        <FormField
                          control={generalForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <h3 className="font-medium">Personal Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" value={profileData.role} readOnly className="bg-gray-50" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Update Profile</Button>
                  </div>
                </form>
                
                <Separator />
                
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  <div className="grid gap-4 md:grid-cols-1">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Change Password</Button>
                  </div>
                </form>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">Enable dark mode for the interface</p>
                    </div>
                    <Switch checked={profileData.darkMode} onCheckedChange={toggleDarkMode} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={profileData.notifications.email} 
                      onCheckedChange={() => toggleNotificationSetting('email')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive push notifications</p>
                    </div>
                    <Switch 
                      checked={profileData.notifications.push} 
                      onCheckedChange={() => toggleNotificationSetting('push')} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Security</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch checked={profileData.security.twoFactor} onCheckedChange={toggleTwoFactor} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number" 
                      min="5"
                      value={profileData.security.sessionTimeout} 
                      onChange={handleSessionTimeoutChange}
                    />
                  </div>
                </div>
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
                        <Button variant="ghost" size="sm" onClick={() => {
                          toast({
                            title: "Edit User",
                            description: "Editing Admin User",
                          });
                        }}>Edit</Button>
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
                        <Button variant="ghost" size="sm" onClick={() => {
                          toast({
                            title: "Edit User",
                            description: "Editing Pharmacist User",
                          });
                        }}>Edit</Button>
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
                        <Button variant="ghost" size="sm" onClick={() => {
                          toast({
                            title: "Edit User",
                            description: "Editing Technician User",
                          });
                        }}>Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={() => {
                  toast({
                    title: "Add User",
                    description: "Opening user creation form",
                  });
                }}>Add New User</Button>
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
                  <Switch 
                    checked={notificationSettings.lowStock}
                    onCheckedChange={() => handleNotificationChange('lowStock')}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b py-4">
                  <div>
                    <h4 className="font-medium">Expiry Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify when products are close to expiration date
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.expiry}
                    onCheckedChange={() => handleNotificationChange('expiry')}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b py-4">
                  <div>
                    <h4 className="font-medium">New E-Prescription Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify when new digital prescriptions are received
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.ePrescription}
                    onCheckedChange={() => handleNotificationChange('ePrescription')}
                  />
                </div>
                
                <div className="flex items-center justify-between border-b py-4">
                  <div>
                    <h4 className="font-medium">Prescription Refill Reminders</h4>
                    <p className="text-sm text-muted-foreground">
                      Send reminders for prescriptions due for refill
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.refill}
                    onCheckedChange={() => handleNotificationChange('refill')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="font-medium">System Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Notify about system updates and maintenance
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={() => handleNotificationChange('systemUpdates')}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={() => {
                  toast({
                    title: "Settings Saved",
                    description: "Notification settings have been updated successfully.",
                  });
                }}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>Manage connections with external systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b pb-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Electronic Health Records (EHR)</h3>
                    <p className="text-sm text-muted-foreground">Connect to major EHR systems</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-xs font-medium">Connected</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "EHR Settings",
                      description: "Opening EHR integration settings",
                    });
                  }}>Configure</Button>
                </div>
                
                <div className="flex items-start justify-between border-b pb-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Insurance Provider API</h3>
                    <p className="text-sm text-muted-foreground">Validate insurance coverage in real-time</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-xs font-medium">Connected</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Insurance API Settings",
                      description: "Opening insurance integration settings",
                    });
                  }}>Configure</Button>
                </div>
                
                <div className="flex items-start justify-between border-b pb-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">E-Prescription Network</h3>
                    <p className="text-sm text-muted-foreground">Connect to national e-prescription networks</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span className="text-xs font-medium">Partially Connected</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "E-Prescription Settings",
                      description: "Opening e-prescription network settings",
                    });
                  }}>Configure</Button>
                </div>
                
                <div className="flex items-start justify-between pb-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Payment Processor</h3>
                    <p className="text-sm text-muted-foreground">Connect payment processing services</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      <span className="text-xs font-medium">Not Connected</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Payment Settings",
                      description: "Opening payment integration settings",
                    });
                  }}>Configure</Button>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={() => {
                    toast({
                      title: "Add New Integration",
                      description: "Opening integration marketplace",
                    });
                  }}>Add New Integration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

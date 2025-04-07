
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, FileCheck, Shield, AlertTriangle } from "lucide-react";

const Compliance = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Regulatory Compliance</h1>
        <Button>Upload Documentation</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BadgeCheck className="h-4 w-4 mr-2 text-green-500" />
              License Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold">Active</div>
            <p className="text-xs text-muted-foreground">Valid until: Dec 31, 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileCheck className="h-4 w-4 mr-2 text-green-500" />
              Compliance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold">96%</div>
            <p className="text-xs text-muted-foreground">Last audit: Mar 15, 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              Pending Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold">3</div>
            <p className="text-xs text-muted-foreground">Due within 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-blue-500" />
              Audits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold">Next: May 2025</div>
            <p className="text-xs text-muted-foreground">30 days remaining</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>License Management</CardTitle>
          <CardDescription>Track and manage regulatory licenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">License Type</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">License Number</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Issuing Authority</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Issue Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Expiry Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">Pharmacy License</td>
                  <td className="p-2 align-middle">PL-2025-00123</td>
                  <td className="p-2 align-middle">State Board of Pharmacy</td>
                  <td className="p-2 align-middle">Jan 01, 2025</td>
                  <td className="p-2 align-middle">Dec 31, 2025</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white">Active</span>
                  </td>
                  <td className="p-2 align-middle">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">Controlled Substance License</td>
                  <td className="p-2 align-middle">CSL-2025-45678</td>
                  <td className="p-2 align-middle">DEA</td>
                  <td className="p-2 align-middle">Jan 15, 2025</td>
                  <td className="p-2 align-middle">Jan 14, 2026</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white">Active</span>
                  </td>
                  <td className="p-2 align-middle">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Compliance Requirements</CardTitle>
          <CardDescription>Track regulatory requirements and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-medium">Annual Inspection</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Schedule inspection with the State Board of Pharmacy.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Due: May 15, 2025</span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">Pending</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <h4 className="font-medium">Controlled Substance Inventory</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Conduct biennial physical inventory of all controlled substances.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Due: Jun 30, 2025</span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">Pending</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <h4 className="font-medium">Staff Training Update</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Complete annual HIPAA compliance training for all staff.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Due: Apr 30, 2025</span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">In Progress</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Compliance;

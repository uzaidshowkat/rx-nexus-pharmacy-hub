
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const EPrescriptions = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">E-Prescription Management</h1>
        <Button>Sync E-Prescriptions</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New E-Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Being prepared</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ready for Pickup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">Awaiting patient pickup</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Successfully dispensed</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search prescriptions..." className="pl-8 w-full" />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[150px]">
            <option>All Status</option>
            <option>New</option>
            <option>Processing</option>
            <option>Ready</option>
            <option>Completed</option>
          </select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>E-Prescriptions Queue</CardTitle>
          <CardDescription>Manage digital prescriptions from healthcare providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">Rx Number</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Patient</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Provider</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Medication</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Received</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Priority</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">ERX00456</td>
                  <td className="p-2 align-middle">Maria Rodriguez</td>
                  <td className="p-2 align-middle">Dr. Anthony Miller</td>
                  <td className="p-2 align-middle">Metformin 500mg</td>
                  <td className="p-2 align-middle">Today, 9:45 AM</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-red-500 text-white">High</span>
                  </td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-500 text-white">New</span>
                  </td>
                  <td className="p-2 align-middle">
                    <Button variant="outline" size="sm">Process</Button>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">ERX00455</td>
                  <td className="p-2 align-middle">James Wilson</td>
                  <td className="p-2 align-middle">Dr. Sarah Johnson</td>
                  <td className="p-2 align-middle">Lisinopril 10mg</td>
                  <td className="p-2 align-middle">Today, 9:30 AM</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">Medium</span>
                  </td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-500 text-white">New</span>
                  </td>
                  <td className="p-2 align-middle">
                    <Button variant="outline" size="sm">Process</Button>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">ERX00454</td>
                  <td className="p-2 align-middle">Robert Taylor</td>
                  <td className="p-2 align-middle">Dr. Lisa Wong</td>
                  <td className="p-2 align-middle">Atorvastatin 20mg</td>
                  <td className="p-2 align-middle">Today, 9:15 AM</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white">Low</span>
                  </td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">Processing</span>
                  </td>
                  <td className="p-2 align-middle">
                    <Button variant="outline" size="sm">Complete</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EPrescriptions;

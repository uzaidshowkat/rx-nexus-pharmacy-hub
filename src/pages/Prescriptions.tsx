
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const Prescriptions = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Prescription Management</h1>
        <Button>Add New Prescription</Button>
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
            <option>Active</option>
            <option>Completed</option>
            <option>Expired</option>
          </select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Prescriptions</CardTitle>
          <CardDescription>Manage patient prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">ID</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Patient</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Doctor</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Medication</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Issue Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Expiry Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">RX00123</td>
                  <td className="p-2 align-middle">John Smith</td>
                  <td className="p-2 align-middle">Dr. Robert Wilson</td>
                  <td className="p-2 align-middle">Amoxicillin 500mg</td>
                  <td className="p-2 align-middle">Mar 28, 2025</td>
                  <td className="p-2 align-middle">Apr 28, 2025</td>
                  <td className="p-2 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white">Active</span>
                  </td>
                  <td className="p-2 align-middle">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-2 align-middle">RX00124</td>
                  <td className="p-2 align-middle">Sarah Johnson</td>
                  <td className="p-2 align-middle">Dr. Emily Chen</td>
                  <td className="p-2 align-middle">Lisinopril 10mg</td>
                  <td className="p-2 align-middle">Apr 02, 2025</td>
                  <td className="p-2 align-middle">Jul 02, 2025</td>
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
    </div>
  );
};

export default Prescriptions;

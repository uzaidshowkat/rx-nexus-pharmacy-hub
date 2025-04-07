
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Bell, CheckCircle2 } from "lucide-react";

const Alerts = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">System Alerts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">6</div>
            <p className="text-xs text-red-600">Require immediate attention</p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">12</div>
            <p className="text-xs text-amber-600">Require attention soon</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">24</div>
            <p className="text-xs text-blue-600">For your information</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">18</div>
            <p className="text-xs text-green-600">In the past 7 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Alerts</CardTitle>
          <CardDescription>System alerts requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Inventory Alert: 3 Products Expired</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Amoxicillin 250mg, Paracetamol 500mg, and Aspirin 75mg have expired. Please remove from inventory.
                  </p>
                  <div className="flex items-center mt-2 text-xs text-red-700">
                    <span>April 7, 2025 - 10:23 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Low Stock Warning: 5 Products Below Threshold</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Multiple products including Insulin and Antihistamines are below the minimum stock level.
                  </p>
                  <div className="flex items-center mt-2 text-xs text-amber-700">
                    <span>April 7, 2025 - 9:45 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Expiring Soon: 8 Products Expiring in 30 Days</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Several products will expire within the next month. Consider scheduling a sale or return to supplier.
                  </p>
                  <div className="flex items-center mt-2 text-xs text-amber-700">
                    <span>April 6, 2025 - 2:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
              <div className="flex">
                <Bell className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Order Notification: New Shipment Arriving</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Order #PO-2025-003 from MediWholesale is scheduled for delivery tomorrow.
                  </p>
                  <div className="flex items-center mt-2 text-xs text-blue-700">
                    <span>April 6, 2025 - 11:15 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;

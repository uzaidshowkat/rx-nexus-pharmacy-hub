
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, Calendar, Download, FileText, Filter } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>Generate Report</Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Available Reports</CardTitle>
            <CardDescription>Select a report type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                Sales Summary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AreaChart className="mr-2 h-4 w-4" />
                Inventory Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Financial Statement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Prescription Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Customer Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Monthly sales overview for 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Sales chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-12 text-muted-foreground text-sm">{i}.</div>
                  <div className="flex-1">
                    <div className="font-medium">Product {i}</div>
                    <div className="text-sm text-muted-foreground">Category</div>
                  </div>
                  <div className="font-medium text-right">${(100 - i * 12).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Report History</CardTitle>
            <CardDescription>Recent reports generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="flex-1">
                    <div className="font-medium">Sales Report - April 2025</div>
                    <div className="text-sm text-muted-foreground">Generated on Apr {i}, 2025</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;

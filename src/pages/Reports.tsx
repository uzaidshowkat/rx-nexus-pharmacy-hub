
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, Calendar, Download, FileText, Filter, LineChart, PieChart } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart as RechartsAreaChart, Line, LineChart as RechartsLineChart } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { sales } from "@/components/purchases/PurchaseData";

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Reports = () => {
  const [activeReport, setActiveReport] = useState<string>("sales");
  
  // Generate sales data by month based on the sales data
  const monthlySalesData = monthNames.map(month => {
    const salesForMonth = sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return monthNames[saleDate.getMonth()] === month;
    });
    const totalAmount = salesForMonth.reduce((sum, sale) => sum + sale.totalAmount, 0);
    return { name: month, sales: totalAmount };
  });

  // Top products data
  const productSales: Record<string, number> = {};
  sales.forEach(sale => {
    sale.items.forEach(item => {
      if (productSales[item.product]) {
        productSales[item.product] += item.total;
      } else {
        productSales[item.product] = item.total;
      }
    });
  });

  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, sales], index) => ({
      name,
      sales,
      rank: index + 1
    }));

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "The report has been downloaded successfully",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "New report has been generated and is ready for download",
    });
  };

  const handleSelectReport = (report: string) => {
    setActiveReport(report);
    toast({
      description: `${report.charAt(0).toUpperCase() + report.slice(1)} report selected`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleGenerateReport}>Generate Report</Button>
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
              <Button 
                variant={activeReport === "sales" ? "default" : "outline"} 
                className="w-full justify-start" 
                onClick={() => handleSelectReport("sales")}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Sales Summary
              </Button>
              <Button 
                variant={activeReport === "inventory" ? "default" : "outline"} 
                className="w-full justify-start" 
                onClick={() => handleSelectReport("inventory")}
              >
                <AreaChart className="mr-2 h-4 w-4" />
                Inventory Analysis
              </Button>
              <Button 
                variant={activeReport === "financial" ? "default" : "outline"} 
                className="w-full justify-start" 
                onClick={() => handleSelectReport("financial")}
              >
                <LineChart className="mr-2 h-4 w-4" />
                Financial Statement
              </Button>
              <Button 
                variant={activeReport === "prescription" ? "default" : "outline"} 
                className="w-full justify-start" 
                onClick={() => handleSelectReport("prescription")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Prescription Report
              </Button>
              <Button 
                variant={activeReport === "customer" ? "default" : "outline"} 
                className="w-full justify-start" 
                onClick={() => handleSelectReport("customer")}
              >
                <PieChart className="mr-2 h-4 w-4" />
                Customer Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>
              {activeReport === "sales" && "Sales Performance"}
              {activeReport === "inventory" && "Inventory Analysis"}
              {activeReport === "financial" && "Financial Statement"}
              {activeReport === "prescription" && "Prescription Trends"}
              {activeReport === "customer" && "Customer Demographics"}
            </CardTitle>
            <CardDescription>Monthly overview for 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="w-full justify-start mb-4">
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="area">Area</TabsTrigger>
                  <TabsTrigger value="line">Line</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={monthlySalesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Sales']}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      />
                      <Bar dataKey="sales" fill="#0e99eb" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="area">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart data={monthlySalesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Sales']}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      />
                      <Area type="monotone" dataKey="sales" fill="#0e99eb" stroke="#0e99eb" fillOpacity={0.3} />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="line">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={monthlySalesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Sales']}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      />
                      <Line type="monotone" dataKey="sales" stroke="#0e99eb" strokeWidth={2} dot={{ stroke: '#0e99eb', strokeWidth: 2, r: 4 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
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
              {topProducts.map((product) => (
                <div key={product.name} className="flex items-center">
                  <div className="w-12 text-muted-foreground text-sm">{product.rank}.</div>
                  <div className="flex-1">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">Pharmaceuticals</div>
                  </div>
                  <div className="font-medium text-right">${product.sales.toFixed(2)}</div>
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
                    <div className="font-medium">
                      {i % 2 === 0 ? "Inventory" : "Sales"} Report - April 2025
                    </div>
                    <div className="text-sm text-muted-foreground">Generated on Apr {i}, 2025</div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleDownload}>
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

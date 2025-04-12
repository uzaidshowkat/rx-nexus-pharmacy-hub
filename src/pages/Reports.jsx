
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventoryStore } from "@/stores/inventoryStore";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { sales as initialSales } from '@/components/purchases/PurchaseData';

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B8E23', '#483D8B'];

const Reports = () => {
  const { items } = useInventoryStore();
  const [sales, setSales] = useState(initialSales);
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('sales');
  
  // Calculate summary metrics
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalItems = items.length;
  const lowStockItems = items.filter(item => item.stock <= item.reorderLevel).length;
  const totalInventoryValue = items.reduce((sum, item) => sum + (item.stock * item.unitPrice), 0);
  
  // Function to prepare data for charts based on time range
  const prepareChartData = () => {
    // Current date for filtering
    const now = new Date();
    const startDate = new Date();
    
    // Set start date based on selected time range
    if (timeRange === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (timeRange === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (timeRange === 'quarter') {
      startDate.setMonth(now.getMonth() - 3);
    } else if (timeRange === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }
    
    // Filter sales within selected time range
    const filteredSales = sales.filter(sale => new Date(sale.date) >= startDate);
    
    // Group sales by date
    const salesByDate = {};
    filteredSales.forEach(sale => {
      const saleDate = new Date(sale.date).toLocaleDateString();
      if (!salesByDate[saleDate]) {
        salesByDate[saleDate] = 0;
      }
      salesByDate[saleDate] += sale.totalAmount;
    });
    
    // Convert to array format for charts
    const salesChartData = Object.keys(salesByDate).map(date => ({
      date,
      amount: salesByDate[date]
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Group sales by item
    const salesByItem = {};
    filteredSales.forEach(sale => {
      sale.items.forEach(item => {
        if (!salesByItem[item.product]) {
          salesByItem[item.product] = 0;
        }
        salesByItem[item.product] += item.total;
      });
    });
    
    // Convert to array format and take top 5 items
    const topItemsChartData = Object.keys(salesByItem)
      .map(product => ({
        name: product,
        value: salesByItem[product]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    
    // Prepare inventory category data
    const inventoryByCategory = {};
    items.forEach(item => {
      if (!inventoryByCategory[item.category]) {
        inventoryByCategory[item.category] = 0;
      }
      inventoryByCategory[item.category] += 1;
    });
    
    const inventoryCategoryData = Object.keys(inventoryByCategory).map(category => ({
      name: category,
      value: inventoryByCategory[category]
    }));
    
    return {
      salesChartData,
      topItemsChartData,
      inventoryCategoryData
    };
  };
  
  const { salesChartData, topItemsChartData, inventoryCategoryData } = prepareChartData();
  
  const handleExportReport = () => {
    // In a real implementation, this would generate a PDF report
    alert('Exporting report for ' + timeRange);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Reports Dashboard</h1>
        
        <div className="flex items-center space-x-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">in inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">need reordering</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalInventoryValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">total value</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sales">
            <BarChart3 className="h-4 w-4 mr-2" />
            Sales Analysis
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <PieChart className="h-4 w-4 mr-2" />
            Inventory Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Sales performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`₹${value.toFixed(2)}`, 'Sales']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="amount" name="Sales Amount" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Most revenue generating products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={topItemsChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {topItemsChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory by Category</CardTitle>
                <CardDescription>Distribution of products by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={inventoryCategoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {inventoryCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Stock level status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'In Stock', value: items.filter(i => i.stock > i.reorderLevel).length },
                        { name: 'Low Stock', value: items.filter(i => i.stock <= i.reorderLevel && i.stock > 0).length },
                        { name: 'Out of Stock', value: items.filter(i => i.stock === 0).length }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Products" fill="#22c55e">
                        <Cell fill="#22c55e" />
                        <Cell fill="#eab308" />
                        <Cell fill="#ef4444" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;

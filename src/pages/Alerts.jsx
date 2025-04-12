
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInventoryStore } from '@/stores/inventoryStore';
import { 
  AlertTriangle, 
  Clock, 
  Search, 
  Package, 
  Calendar,
  CheckCircle2
} from "lucide-react";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const AlertsPage = () => {
  const { items } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('expiry');
  
  const today = new Date();
  
  // Generate different alert categories
  const expiryAlerts = items.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90;
  }).sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
  
  const stockAlerts = items.filter(item => item.stock <= item.reorderLevel)
    .sort((a, b) => a.stock - b.stock);
    
  // Filter alerts based on search term
  const filteredExpiryAlerts = expiryAlerts.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredStockAlerts = stockAlerts.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAcknowledge = (id, type) => {
    toast({
      title: "Alert Acknowledged",
      description: `${type} alert for item #${id} has been acknowledged`,
    });
  };
  
  const handleReorder = (item) => {
    toast({
      title: "Reorder Initiated",
      description: `Reorder for ${item.name} has been initiated`,
    });
  };
  
  const getDaysUntilExpiry = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry;
  };
  
  const getExpiryStatusClass = (daysUntilExpiry) => {
    if (daysUntilExpiry <= 30) return "bg-red-500";
    if (daysUntilExpiry <= 60) return "bg-amber-500";
    return "bg-blue-500";
  };
  
  const getStockStatusClass = (stock, reorderLevel) => {
    if (stock === 0) return "bg-red-500";
    if (stock <= reorderLevel / 2) return "bg-amber-500";
    return "bg-blue-500";
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
        <p className="text-muted-foreground">Important notifications about your inventory</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-red-500" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiryAlerts.length}</div>
            <p className="text-xs text-muted-foreground">items expiring within 90 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockAlerts.length}</div>
            <p className="text-xs text-muted-foreground">items at or below reorder level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Package className="h-4 w-4 mr-2 text-red-500" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.filter(item => item.stock === 0).length}</div>
            <p className="text-xs text-muted-foreground">items with zero stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              Total Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiryAlerts.length + stockAlerts.length}</div>
            <p className="text-xs text-muted-foreground">requiring attention</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="expiry" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Expiry Alerts ({filteredExpiryAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="stock" className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Stock Alerts ({filteredStockAlerts.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="expiry">
          <Card>
            <CardHeader>
              <CardTitle>Expiry Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredExpiryAlerts.length > 0 ? (
                <div className="space-y-4">
                  {filteredExpiryAlerts.map((item) => {
                    const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
                    return (
                      <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <Badge
                              className={`ml-2 ${getExpiryStatusClass(daysUntilExpiry)}`}
                            >
                              {daysUntilExpiry <= 0
                                ? "Expired"
                                : `Expires in ${daysUntilExpiry} days`}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>SKU: {item.sku}</p>
                            <p>Stock: {item.stock} units | Expiry: {new Date(item.expiryDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleAcknowledge(item.id, "Expiry")}
                        >
                          Acknowledge
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No expiry alerts found matching your search criteria
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stock">
          <Card>
            <CardHeader>
              <CardTitle>Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredStockAlerts.length > 0 ? (
                <div className="space-y-4">
                  {filteredStockAlerts.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <Badge
                            className={`ml-2 ${getStockStatusClass(item.stock, item.reorderLevel)}`}
                          >
                            {item.stock === 0
                              ? "Out of Stock"
                              : `Low Stock: ${item.stock} units left`}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>SKU: {item.sku}</p>
                          <p>Reorder Level: {item.reorderLevel} | Category: {item.category}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="default"
                          onClick={() => handleReorder(item)}
                        >
                          Reorder
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleAcknowledge(item.id, "Stock")}
                        >
                          Acknowledge
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No stock alerts found matching your search criteria
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPage;

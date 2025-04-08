
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RotateCcw, AlertCircle, CheckCircle } from "lucide-react";
import { returns } from '@/components/purchases/PurchaseData';
import ReturnsTable from '@/components/returns/ReturnsTable';
import { toast } from "@/hooks/use-toast";

type Return = {
  id: string;
  product: string;
  customer: string;
  quantity: number;
  reason: string;
  date: string;
  status: string;
  refundAmount: number;
}

const Returns = () => {
  const [returnsList, setReturnsList] = useState<Return[]>(returns);

  // Calculate return metrics
  const pendingReturns = returnsList.filter(item => item.status === "pending").length;
  const processedReturns = returnsList.filter(item => item.status === "processed").length;
  
  const totalRefundAmount = returnsList
    .filter(item => item.status === "processed")
    .reduce((sum, item) => sum + item.refundAmount, 0);

  const handleProcessReturn = (returnId: string) => {
    setReturnsList(returnsList.map(item => 
      item.id === returnId ? { ...item, status: "processed" } : item
    ));
    
    toast({
      title: "Return Processed",
      description: `Return ${returnId} has been successfully processed.`,
    });
  };

  const handleViewReturn = (returnData: Return) => {
    toast({
      title: "Return Details",
      description: `Viewing details for return ${returnData.id}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Returns Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Return
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <RotateCcw className="h-4 w-4 mr-2 text-primary" />
              Total Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{returnsList.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
              Pending Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReturns}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Processed Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processedReturns}</div>
            <p className="text-xs text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRefundAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Returns Queue</CardTitle>
          <CardDescription>Manage product returns and refunds</CardDescription>
        </CardHeader>
        <CardContent>
          <ReturnsTable 
            returns={returnsList}
            onProcess={handleProcessReturn}
            onView={handleViewReturn}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Returns;

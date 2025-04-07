
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExpiryItem {
  id: string;
  name: string;
  quantity: number;
  expiryDate: string;
  daysRemaining: number;
}

const expiryItems: ExpiryItem[] = [
  { id: 'MED001', name: 'Amoxicillin 500mg', quantity: 200, expiryDate: '2025-05-10', daysRemaining: 30 },
  { id: 'MED002', name: 'Lisinopril 10mg', quantity: 150, expiryDate: '2025-05-15', daysRemaining: 35 },
  { id: 'MED003', name: 'Metformin 850mg', quantity: 120, expiryDate: '2025-04-20', daysRemaining: 10 },
  { id: 'MED004', name: 'Atorvastatin 20mg', quantity: 80, expiryDate: '2025-04-15', daysRemaining: 5 },
];

const ExpiryAlerts = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Expiry Alerts</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs gap-1">
          View All <ArrowRight size={14} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {expiryItems.map((item) => (
          <div 
            key={item.id}
            className={`border rounded-lg p-3 ${
              item.daysRemaining <= 10 ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <AlertTriangle 
                  size={16} 
                  className={item.daysRemaining <= 10 ? 'text-red-500' : 'text-yellow-500'} 
                />
                <span className="font-medium ml-2">{item.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-7 text-xs ${
                  item.daysRemaining <= 10 ? 'border-red-200 hover:bg-red-100' : 'border-yellow-200 hover:bg-yellow-100'
                }`}
              >
                Action
              </Button>
            </div>
            <div className="flex justify-between text-sm">
              <span>Quantity: {item.quantity}</span>
              <span className="font-medium">
                {item.daysRemaining <= 10 
                  ? `Expires in ${item.daysRemaining} days!` 
                  : `Expires in ${item.daysRemaining} days`
                }
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ExpiryAlerts;


import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/stores/userStore";
import { toast } from "@/hooks/use-toast";

const UserRolePermissionsDialog = ({ open, onClose, userId }) => {
  const { getUserById, getRolePermissions } = useUserStore();
  const user = userId ? getUserById(userId) : null;
  const rolePermissions = user ? getRolePermissions(user.role) : null;
  
  const [isLoading, setIsLoading] = useState(false);

  if (!user || !rolePermissions) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  const permissionSections = [
    { key: 'inventory', name: 'Inventory Management' },
    { key: 'sales', name: 'Sales' },
    { key: 'purchases', name: 'Purchases' },
    { key: 'customers', name: 'Customers' },
    { key: 'prescriptions', name: 'Prescriptions' },
    { key: 'returns', name: 'Returns' },
    { key: 'reports', name: 'Reports' },
    { key: 'settings', name: 'Settings' },
    { key: 'users', name: 'User Management' },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Permissions for {user.name} ({user.role})</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-muted/30 rounded-md p-4">
              <p className="text-sm text-muted-foreground mb-2">
                These permissions are based on the user's role. To modify permissions, change the user's role.
              </p>
            </div>
            
            <div className="grid grid-cols-3 text-sm font-medium border-b pb-2 text-muted-foreground">
              <div>Module</div>
              <div className="col-span-2 grid grid-cols-4">
                <div>View</div>
                <div>Add</div>
                <div>Edit</div>
                <div>Delete</div>
              </div>
            </div>
            
            {permissionSections.map((section) => (
              <div key={section.key} className="grid grid-cols-3 py-3 border-b">
                <div className="font-medium">{section.name}</div>
                <div className="col-span-2 grid grid-cols-4">
                  <div>
                    <Checkbox 
                      checked={rolePermissions[section.key]?.view || false} 
                      disabled={true}
                    />
                  </div>
                  <div>
                    <Checkbox 
                      checked={rolePermissions[section.key]?.add || false} 
                      disabled={true}
                    />
                  </div>
                  <div>
                    <Checkbox 
                      checked={rolePermissions[section.key]?.edit || false} 
                      disabled={true}
                    />
                  </div>
                  <div>
                    <Checkbox 
                      checked={rolePermissions[section.key]?.delete || false} 
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={handleClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserRolePermissionsDialog;

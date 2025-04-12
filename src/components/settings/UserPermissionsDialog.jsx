
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/stores/userStore";

const UserPermissionsDialog = ({ open, onClose, userId }) => {
  const { getUserById, getRolePermissions, getUserPermissions, setUserPermissions, clearUserPermissions } = useUserStore();
  const user = userId ? getUserById(userId) : null;
  const rolePermissions = user ? getRolePermissions(user.role) : null;
  const customPermissions = user ? getUserPermissions(userId) : null;
  
  const [permissions, setPermissions] = useState({});
  const [useCustomPermissions, setUseCustomPermissions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && rolePermissions) {
      // Check if user has custom permissions
      const userCustomPermissions = getUserPermissions(userId);
      const hasCustom = userCustomPermissions !== rolePermissions;
      
      setUseCustomPermissions(hasCustom);
      setPermissions(hasCustom ? userCustomPermissions : rolePermissions);
    }
  }, [user, rolePermissions, userId, getUserPermissions]);

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
  
  const handleTogglePermission = (section, action) => {
    setPermissions({
      ...permissions,
      [section]: {
        ...permissions[section],
        [action]: !permissions[section]?.[action]
      }
    });
  };
  
  const handleToggleCustomPermissions = (value) => {
    setUseCustomPermissions(value);
    
    // If turning off custom permissions, reset to role defaults
    if (!value) {
      setPermissions(rolePermissions);
    }
  };
  
  const handleSavePermissions = () => {
    setIsLoading(true);
    
    try {
      if (useCustomPermissions) {
        setUserPermissions(userId, permissions);
      } else {
        clearUserPermissions(userId);
      }
      
      toast({
        title: "Permissions Updated",
        description: `Permissions for ${user.name} have been updated successfully.`,
      });
      
      onClose();
    } catch (error) {
      console.error("Error saving permissions:", error);
      toast({
        title: "Error",
        description: "Failed to update permissions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Permissions for {user.name} ({user.role})</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-muted/30 rounded-md p-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {useCustomPermissions 
                  ? "Using custom permissions for this user" 
                  : "Using role-based permissions from the user's role"}
              </p>
              <div className="flex items-center space-x-2">
                <Label htmlFor="custom-permissions">Use Custom Permissions</Label>
                <Switch 
                  id="custom-permissions" 
                  checked={useCustomPermissions} 
                  onCheckedChange={handleToggleCustomPermissions} 
                />
              </div>
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
                      checked={permissions[section.key]?.view || false} 
                      disabled={!useCustomPermissions}
                      onCheckedChange={() => handleTogglePermission(section.key, 'view')}
                    />
                  </div>
                  <div>
                    <Checkbox 
                      checked={permissions[section.key]?.add || false} 
                      disabled={!useCustomPermissions}
                      onCheckedChange={() => handleTogglePermission(section.key, 'add')}
                    />
                  </div>
                  <div>
                    <Checkbox 
                      checked={permissions[section.key]?.edit || false} 
                      disabled={!useCustomPermissions}
                      onCheckedChange={() => handleTogglePermission(section.key, 'edit')}
                    />
                  </div>
                  <div>
                    <Checkbox 
                      checked={permissions[section.key]?.delete || false} 
                      disabled={!useCustomPermissions}
                      onCheckedChange={() => handleTogglePermission(section.key, 'delete')}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSavePermissions} disabled={isLoading || !useCustomPermissions}>
            {isLoading ? "Saving..." : "Save Permissions"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserPermissionsDialog;

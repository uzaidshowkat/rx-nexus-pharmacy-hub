
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserStore } from "@/stores/userStore";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a role"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

const UserFormDialog = ({ open, onClose, user = null, isEdit = false }) => {
  const { addUser, updateUser, getAvailableRoles } = useUserStore();
  const roles = getAvailableRoles();
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    status: 'active'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && isEdit) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        confirmPassword: '',
        status: user.status || 'active'
      });
    } else {
      setFormData({
        id: '',
        name: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
        status: 'active'
      });
    }
    setErrors({});
  }, [user, isEdit, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  const validateForm = () => {
    try {
      // If editing, we don't require password unless it's being changed
      const schema = isEdit ? 
        userSchema.partial({ password: true, confirmPassword: true }) : 
        userSchema;
      
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      const fieldErrors = {};
      if (error.errors) {
        error.errors.forEach(err => {
          const field = err.path[0];
          fieldErrors[field] = err.message;
        });
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const userData = {
        id: formData.id || Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        lastLogin: isEdit ? user.lastLogin : 'Never'
      };

      if (isEdit) {
        updateUser(userData);
        toast({
          title: "User Updated",
          description: `${userData.name} has been successfully updated.`
        });
      } else {
        addUser(userData);
        toast({
          title: "User Added",
          description: `${userData.name} has been successfully added.`
        });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? 'update' : 'add'} user. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={formData.role} 
              onValueChange={handleRoleChange}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
          </div>
          
          {(!isEdit || (isEdit && formData.password)) && (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">
                  {isEdit ? "New Password (leave blank to keep current)" : "Password"}
                </Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isEdit ? "Enter new password (optional)" : "Enter password"}
                  required={!isEdit}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {isEdit ? "Confirm New Password" : "Confirm Password"}
                </Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required={!isEdit || (isEdit && formData.password)}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </>
          )}
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? 'Update' : 'Add'} User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;

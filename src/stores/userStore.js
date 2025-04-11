
// This file was already JavaScript, but I'll include it here for completeness
import { create } from 'zustand';

// Initial users data
const initialUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rxnexus.com",
    role: "Administrator",
    status: "active",
    lastLogin: "Today, 8:30 AM"
  },
  {
    id: "2",
    name: "Pharmacist",
    email: "pharmacist@rxnexus.com",
    role: "Pharmacist",
    status: "active",
    lastLogin: "Today, 9:15 AM"
  },
  {
    id: "3",
    name: "Technician",
    email: "tech@rxnexus.com",
    role: "Pharmacy Technician",
    status: "active",
    lastLogin: "Yesterday, 5:30 PM"
  }
];

// Define role permissions
const rolePermissions = {
  Administrator: {
    inventory: { view: true, add: true, edit: true, delete: true },
    sales: { view: true, add: true, edit: true, delete: true },
    purchases: { view: true, add: true, edit: true, delete: true },
    customers: { view: true, add: true, edit: true, delete: true },
    prescriptions: { view: true, add: true, edit: true, delete: true },
    returns: { view: true, add: true, edit: true, delete: true },
    reports: { view: true, add: true, edit: true, delete: true },
    settings: { view: true, add: true, edit: true, delete: true },
    users: { view: true, add: true, edit: true, delete: true },
  },
  Pharmacist: {
    inventory: { view: true, add: true, edit: true, delete: false },
    sales: { view: true, add: true, edit: true, delete: false },
    purchases: { view: true, add: false, edit: false, delete: false },
    customers: { view: true, add: true, edit: true, delete: false },
    prescriptions: { view: true, add: true, edit: true, delete: false },
    returns: { view: true, add: true, edit: true, delete: false },
    reports: { view: true, add: false, edit: false, delete: false },
    settings: { view: false, add: false, edit: false, delete: false },
    users: { view: false, add: false, edit: false, delete: false },
  },
  "Pharmacy Technician": {
    inventory: { view: true, add: false, edit: false, delete: false },
    sales: { view: true, add: true, edit: false, delete: false },
    purchases: { view: true, add: false, edit: false, delete: false },
    customers: { view: true, add: true, edit: true, delete: false },
    prescriptions: { view: true, add: false, edit: false, delete: false },
    returns: { view: true, add: true, edit: false, delete: false },
    reports: { view: false, add: false, edit: false, delete: false },
    settings: { view: false, add: false, edit: false, delete: false },
    users: { view: false, add: false, edit: false, delete: false },
  },
  Cashier: {
    inventory: { view: true, add: false, edit: false, delete: false },
    sales: { view: true, add: true, edit: false, delete: false },
    purchases: { view: false, add: false, edit: false, delete: false },
    customers: { view: true, add: true, edit: false, delete: false },
    prescriptions: { view: false, add: false, edit: false, delete: false },
    returns: { view: true, add: true, edit: false, delete: false },
    reports: { view: false, add: false, edit: false, delete: false },
    settings: { view: false, add: false, edit: false, delete: false },
    users: { view: false, add: false, edit: false, delete: false },
  }
};

export const useUserStore = create((set, get) => ({
  users: initialUsers,
  rolePermissions: rolePermissions,
  
  addUser: (user) => {
    set((state) => ({
      users: [...state.users, { ...user, id: Date.now().toString() }]
    }));
  },
  
  updateUser: (updatedUser) => {
    set((state) => ({
      users: state.users.map((user) => 
        user.id === updatedUser.id ? updatedUser : user
      )
    }));
  },
  
  deleteUser: (userId) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId)
    }));
  },
  
  getUserById: (id) => {
    return get().users.find(user => user.id === id);
  },
  
  getRolePermissions: (role) => {
    return role ? get().rolePermissions[role] : null;
  },
  
  getAvailableRoles: () => {
    return Object.keys(get().rolePermissions);
  }
}));

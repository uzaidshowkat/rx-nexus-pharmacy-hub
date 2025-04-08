
// Sample suppliers
export const suppliers = [
  { id: 1, name: "PharmaSupply Inc.", contact: "(555) 234-5678", email: "orders@pharmasupply.com" },
  { id: 2, name: "MediWholesale Co.", contact: "(555) 876-5432", email: "sales@mediwholesale.com" },
  { id: 3, name: "HealthDist Partners", contact: "(555) 345-6789", email: "info@healthdist.com" },
];

// Sample products for purchasing
export const purchaseProducts = [
  { id: 1, name: "Paracetamol 500mg", sku: "PCM-500", category: "Analgesics", unitCost: 2.50 },
  { id: 2, name: "Amoxicillin 250mg", sku: "AMX-250", category: "Antibiotics", unitCost: 4.25 },
  { id: 3, name: "Cetirizine 10mg", sku: "CET-10", category: "Antihistamines", unitCost: 1.75 },
  { id: 4, name: "Omeprazole 20mg", sku: "OMP-20", category: "Gastrointestinal", unitCost: 3.45 },
];

// Sample purchase orders
export const initialPurchaseOrders = [
  { 
    id: "PO-2025-001", 
    supplier: "PharmaSupply Inc.", 
    date: "Apr 05, 2025",
    items: 42,
    total: 3560.75,
    status: "pending"
  },
  { 
    id: "PO-2025-002", 
    supplier: "MediWholesale Co.", 
    date: "Apr 03, 2025",
    items: 28,
    total: 2145.30,
    status: "delivered"
  },
];

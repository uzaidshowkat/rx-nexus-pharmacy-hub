
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, FileCheck, Shield, AlertTriangle, File, Calendar, Upload } from "lucide-react";
import { complianceDocuments } from '@/components/purchases/PurchaseData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

type ComplianceDocument = {
  id: number;
  name: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  issuingAuthority: string;
}

const Compliance = () => {
  const [documents, setDocuments] = useState<ComplianceDocument[]>(complianceDocuments);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<ComplianceDocument | null>(null);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  
  // Calculate stats
  const activeDocuments = documents.filter(doc => doc.status === 'active').length;
  const pendingDocuments = documents.filter(doc => doc.status.includes('pending')).length;
  
  // Calculate expiring soon documents (within 60 days)
  const today = new Date();
  const expiringDocuments = documents.filter(doc => {
    const expiryDate = new Date(doc.expiryDate);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 60 && daysUntilExpiry > 0;
  }).length;

  // Calculate next audit date (random future date for demo)
  const nextAuditDate = new Date(today);
  nextAuditDate.setDate(today.getDate() + 30);
  const daysToNextAudit = 30;

  const handleUploadDocument = () => {
    setIsUploadDialogOpen(true);
  };

  const handleViewDocument = (document: ComplianceDocument) => {
    setSelectedDocument(document);
    setIsDocumentDialogOpen(true);
  };

  const handleCompleteUpload = () => {
    setIsUploadDialogOpen(false);
    toast({
      title: "Document Uploaded",
      description: "Your document has been uploaded successfully.",
    });

    // Add a new document to the list (demo)
    const newId = Math.max(...documents.map(doc => doc.id)) + 1;
    const newDoc: ComplianceDocument = {
      id: newId,
      name: "Staff Training Certification",
      type: "Certification",
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(today.setFullYear(today.getFullYear() + 1)).toISOString().split('T')[0],
      status: "active",
      issuingAuthority: "Pharmacy Training Board"
    };

    setDocuments([...documents, newDoc]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Regulatory Compliance</h1>
        <Button onClick={handleUploadDocument}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Documentation
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BadgeCheck className="h-4 w-4 mr-2 text-green-500" />
              Active Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold">{activeDocuments}</div>
            <p className="text-xs text-muted-foreground">Current valid certifications</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileCheck className="h-4 w-4 mr-2 text-amber-500" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold">{expiringDocuments}</div>
            <p className="text-xs text-muted-foreground">Within next 60 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              Pending Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold">{pendingDocuments}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-blue-500" />
              Next Audit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold">{nextAuditDate.toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">{daysToNextAudit} days remaining</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>License Management</CardTitle>
          <CardDescription>Track and manage regulatory licenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">License Type</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Issuing Authority</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Issue Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Expiry Date</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {documents.map((doc) => {
                  const expiryDate = new Date(doc.expiryDate);
                  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  const isExpiringSoon = daysUntilExpiry <= 60 && daysUntilExpiry > 0;
                  
                  return (
                    <tr key={doc.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-2 align-middle">{doc.name}</td>
                      <td className="p-2 align-middle">{doc.issuingAuthority}</td>
                      <td className="p-2 align-middle">{new Date(doc.issueDate).toLocaleDateString()}</td>
                      <td className="p-2 align-middle">
                        <span className={isExpiringSoon ? "text-amber-500 font-medium" : ""}>
                          {new Date(doc.expiryDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-2 align-middle">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                          doc.status === "active"
                            ? "bg-green-500 text-white"
                            : "bg-amber-500 text-white"
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="p-2 align-middle">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                          <File className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Compliance Requirements</CardTitle>
          <CardDescription>Track regulatory requirements and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-medium">Annual Inspection</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Schedule inspection with the State Board of Pharmacy.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Due: May 15, 2025</span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">Pending</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Calendar className="h-3 w-3 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <h4 className="font-medium">Controlled Substance Inventory</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Conduct biennial physical inventory of all controlled substances.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Due: Jun 30, 2025</span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">Pending</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Calendar className="h-3 w-3 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <h4 className="font-medium">Staff Training Update</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Complete annual HIPAA compliance training for all staff.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Due: Apr 30, 2025</span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">In Progress</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <FileCheck className="h-3 w-3 mr-2" />
                  Track Progress
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Upload Document Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Compliance Document</DialogTitle>
          </DialogHeader>
          <div className="p-6 border-2 border-dashed rounded-md text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag and drop files here or click to browse
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Accepted formats: PDF, JPG, PNG (max 10MB)
          </p>
          <DialogFooter>
            <Button onClick={handleCompleteUpload}>Upload Document</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Document Dialog */}
      <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Document Details</DialogTitle>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Document Name:</div>
                <div className="col-span-2">{selectedDocument.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Type:</div>
                <div className="col-span-2">{selectedDocument.type}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Issuer:</div>
                <div className="col-span-2">{selectedDocument.issuingAuthority}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Issue Date:</div>
                <div className="col-span-2">{new Date(selectedDocument.issueDate).toLocaleDateString()}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Expiry Date:</div>
                <div className="col-span-2">{new Date(selectedDocument.expiryDate).toLocaleDateString()}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                    selectedDocument.status === "active"
                      ? "bg-green-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}>
                    {selectedDocument.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-muted">
                <p className="text-sm text-center text-muted-foreground">
                  Document preview would be displayed here
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDocumentDialogOpen(false)}>
              Close
            </Button>
            <Button>Download</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Compliance;

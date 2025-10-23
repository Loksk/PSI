import { useState } from 'react';
import { FileText, Download, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'ready' | 'pending' | 'processing';
  requestDate: string;
  downloadUrl?: string;
  size?: string;
}

const mockDocuments: Document[] = [
  {
    id: 'DOC001',
    name: 'Academic Transcript',
    type: 'transcript',
    status: 'ready',
    requestDate: '2025-10-15',
    downloadUrl: '#',
    size: '245 KB',
  },
  {
    id: 'DOC002',
    name: 'Enrollment Certificate',
    type: 'certificate',
    status: 'ready',
    requestDate: '2025-10-18',
    downloadUrl: '#',
    size: '128 KB',
  },
  {
    id: 'DOC003',
    name: 'Grade Report - Fall 2024',
    type: 'grade-report',
    status: 'ready',
    requestDate: '2025-10-10',
    downloadUrl: '#',
    size: '187 KB',
  },
  {
    id: 'DOC004',
    name: 'Student ID Verification',
    type: 'verification',
    status: 'pending',
    requestDate: '2025-10-20',
  },
];

export function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [requestReason, setRequestReason] = useState('');

  const handleRequestDocument = () => {
    if (!selectedDocType) {
      toast.error('Please select a document type');
      return;
    }

    const newDoc: Document = {
      id: `DOC${String(documents.length + 1).padStart(3, '0')}`,
      name: documentTypes.find((t) => t.value === selectedDocType)?.label || '',
      type: selectedDocType,
      status: 'processing',
      requestDate: new Date().toISOString().split('T')[0],
    };

    setDocuments([newDoc, ...documents]);
    setIsRequestModalOpen(false);
    setSelectedDocType('');
    setRequestReason('');
    toast.success('Document request submitted successfully');
  };

  const documentTypes = [
    { value: 'transcript', label: 'Academic Transcript' },
    { value: 'certificate', label: 'Enrollment Certificate' },
    { value: 'grade-report', label: 'Grade Report' },
    { value: 'verification', label: 'Student Verification Letter' },
    { value: 'recommendation', label: 'Recommendation Letter Request' },
    { value: 'diploma', label: 'Diploma Copy' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      ready: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      pending: 'bg-amber-100 text-amber-800',
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const readyDocuments = documents.filter((d) => d.status === 'ready');
  const processingDocuments = documents.filter((d) => d.status !== 'ready');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Documents & Certificates</h1>
          <p className="text-gray-600 mt-1">
            Request and download official academic documents
          </p>
        </div>
        <Button onClick={() => setIsRequestModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Request Document
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{documents.length}</div>
            <p className="text-xs text-gray-500 mt-1">All time requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Ready to Download</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{readyDocuments.length}</div>
            <p className="text-xs text-green-600 mt-1">Available now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{processingDocuments.length}</div>
            <p className="text-xs text-gray-500 mt-1">Being processed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Documents</CardTitle>
          <CardDescription>Ready for download</CardDescription>
        </CardHeader>
        <CardContent>
          {readyDocuments.length > 0 ? (
            <div className="space-y-3">
              {readyDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p>{doc.name}</p>
                        {getStatusBadge(doc.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Requested on {new Date(doc.requestDate).toLocaleDateString()} •{' '}
                        {doc.size}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => toast.success('Document downloaded successfully')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No documents ready for download</p>
            </div>
          )}
        </CardContent>
      </Card>

      {processingDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Requests</CardTitle>
            <CardDescription>Documents being prepared</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processingDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      {getStatusIcon(doc.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p>{doc.name}</p>
                        {getStatusBadge(doc.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Requested on {new Date(doc.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {doc.status === 'processing'
                      ? 'Processing (2-3 business days)'
                      : 'Pending approval'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Document Types</CardTitle>
            <CardDescription>Available official documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {documentTypes.map((type) => (
              <div
                key={type.value}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <p className="text-sm">{type.label}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Request
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm text-blue-900 mb-2">Processing Time</h4>
              <p className="text-sm text-blue-800">
                Most documents are processed within 2-3 business days. Urgent requests
                may be available with additional fees.
              </p>
            </div>
            <Separator className="bg-blue-200" />
            <div>
              <h4 className="text-sm text-blue-900 mb-2">Document Validity</h4>
              <p className="text-sm text-blue-800">
                All official documents include digital signatures and verification codes
                for authenticity.
              </p>
            </div>
            <Separator className="bg-blue-200" />
            <div>
              <h4 className="text-sm text-blue-900 mb-2">Contact</h4>
              <p className="text-sm text-blue-800">
                For questions about your documents, contact the Registrar's Office at
                registrar@university.edu
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Document</DialogTitle>
            <DialogDescription>
              Select the document type and provide additional information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="document-type">Document Type</Label>
              <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                <SelectTrigger id="document-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Purpose / Reason (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Please specify the purpose for requesting this document..."
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                rows={4}
              />
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Processing typically takes 2-3 business days. You
                will receive an email notification when your document is ready for
                download.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestDocument}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

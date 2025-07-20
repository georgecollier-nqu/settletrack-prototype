// Document mapping configuration for PDF deep linking
// Maps case documents to their URLs for PDF viewing

export interface DocumentMapping {
  documentName: string
  url: string
  type: 'settlement' | 'complaint' | 'order' | 'transcript' | 'other'
}

// Mock document URLs - in production, these would come from your document storage service
export const documentMappings: Record<string, DocumentMapping[]> = {
  // Smith v. MegaCorp Inc.
  'case1': [
    {
      documentName: 'Settlement Agreement',
      url: '/documents/case1/settlement-agreement.pdf',
      type: 'settlement'
    },
    {
      documentName: 'Complaint',
      url: '/documents/case1/complaint.pdf',
      type: 'complaint'
    },
    {
      documentName: 'Final Approval Order',
      url: '/documents/case1/final-approval-order.pdf',
      type: 'order'
    },
    {
      documentName: 'Fairness Hearing Transcript',
      url: '/documents/case1/fairness-hearing-transcript.pdf',
      type: 'transcript'
    }
  ],
  
  // Johnson v. DataCo LLC
  'case2': [
    {
      documentName: 'Amended Settlement Agreement',
      url: '/documents/case2/amended-settlement-agreement.pdf',
      type: 'settlement'
    },
    {
      documentName: 'Class Action Complaint',
      url: '/documents/case2/class-action-complaint.pdf',
      type: 'complaint'
    },
    {
      documentName: 'Preliminary Approval Order',
      url: '/documents/case2/preliminary-approval-order.pdf',
      type: 'order'
    }
  ],
  
  // Williams v. TechGiant Corp
  'case3': [
    {
      documentName: 'Settlement Agreement',
      url: '/documents/case3/settlement-agreement.pdf',
      type: 'settlement'
    },
    {
      documentName: 'Complaint',
      url: '/documents/case3/complaint.pdf',
      type: 'complaint'
    },
    {
      documentName: 'Notice Plan',
      url: '/documents/case3/notice-plan.pdf',
      type: 'other'
    }
  ]
}

export function getDocumentUrl(caseId: string, documentName: string): string | undefined {
  const caseDocs = documentMappings[caseId]
  if (!caseDocs) return undefined
  
  const doc = caseDocs.find(d => d.documentName === documentName)
  return doc?.url
}

export function getCaseDocuments(caseId: string): DocumentMapping[] {
  return documentMappings[caseId] || []
}
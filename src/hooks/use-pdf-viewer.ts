"use client"

import { useState, useCallback } from "react"
import { Citation } from "@/lib/mock-data"
import { getDocumentUrl } from "@/lib/document-mapping"

interface UsePDFViewerProps {
  caseId: string
}

export function usePDFViewer({ caseId }: UsePDFViewerProps) {
  const [pdfViewerState, setPdfViewerState] = useState({
    open: false,
    documentUrl: "",
    documentName: "",
    initialPage: 1,
    highlightText: ""
  })

  const openPDFViewer = useCallback((citation: Citation) => {
    const documentUrl = getDocumentUrl(caseId, citation.documentName)
    
    if (documentUrl) {
      setPdfViewerState({
        open: true,
        documentUrl,
        documentName: citation.documentName,
        initialPage: citation.pageNumber,
        highlightText: citation.quote
      })
    } else {
      // Fallback if document URL not found
      console.warn(`Document URL not found for ${citation.documentName}`)
    }
  }, [caseId])

  const closePDFViewer = useCallback(() => {
    setPdfViewerState(prev => ({ ...prev, open: false }))
  }, [])

  const getDocumentUrlForCitation = useCallback((citation?: Citation) => {
    if (!citation) return undefined
    return getDocumentUrl(caseId, citation.documentName)
  }, [caseId])

  return {
    pdfViewerState,
    openPDFViewer,
    closePDFViewer,
    getDocumentUrlForCitation
  }
}
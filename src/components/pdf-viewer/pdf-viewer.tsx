"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PDFViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentUrl: string
  documentName: string
  initialPage?: number
  highlightText?: string
}

export function PDFViewer({
  open,
  onOpenChange,
  documentUrl,
  documentName,
  initialPage = 1,
  highlightText
}: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && initialPage) {
      setCurrentPage(initialPage)
    }
  }, [open, initialPage])

  // Mock PDF loading - in production, use a real PDF library like react-pdf or pdfjs
  useEffect(() => {
    if (open) {
      setIsLoading(true)
      // Simulate PDF loading
      setTimeout(() => {
        setTotalPages(50) // Mock total pages
        setIsLoading(false)
      }, 1000)
    }
  }, [open, documentUrl])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleDownload = () => {
    // In production, implement actual PDF download
    window.open(documentUrl, '_blank')
  }

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value)
    if (!isNaN(page)) {
      handlePageChange(page)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>{documentName}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-3 border-b bg-muted/50">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={currentPage}
                  onChange={handlePageInputChange}
                  className="w-16 text-center"
                  min={1}
                  max={totalPages}
                />
                <span className="text-sm text-muted-foreground">
                  of {totalPages}
                </span>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="text-sm min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                disabled={scale >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>

              <div className="w-px h-6 bg-border mx-2" />

              <Button
                variant="outline"
                size="icon"
                onClick={handleDownload}
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* PDF Content */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-auto bg-muted p-4"
          >
            <div className="max-w-4xl mx-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-96 bg-white rounded-lg shadow-sm">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Loading PDF...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-96 bg-white rounded-lg shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-destructive">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenChange(false)}
                      className="mt-4"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="bg-white rounded-lg shadow-sm"
                  style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
                >
                  {/* Mock PDF page - in production, render actual PDF page */}
                  <div className="aspect-[8.5/11] p-16">
                    <div className="space-y-4">
                      <h1 className="text-2xl font-bold">Page {currentPage}</h1>
                      {highlightText && (
                        <div className="p-4 bg-yellow-100 rounded">
                          <p className="text-sm font-medium">Highlighted Section:</p>
                          <p className="mt-1">{highlightText}</p>
                        </div>
                      )}
                      <div className="space-y-2">
                        {Array.from({ length: 20 }, (_, i) => (
                          <p key={i} className="text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for bug report submission
const bugReportSchema = z.object({
  caseId: z.string(),
  issueType: z.enum(['incorrect_value', 'missing_data', 'wrong_citation', 'calculation_error', 'formatting_issue', 'other']),
  fieldPath: z.string(),
  currentValue: z.string(),
  suggestedValue: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  email: z.string().email().optional().or(z.literal(''))
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = bugReportSchema.parse(body)
    
    // In a real implementation, you would:
    // 1. Save to database
    // 2. Send notification to admin team
    // 3. Create audit log entry
    // 4. Return the created bug report
    
    // Mock response for now
    const bugReport = {
      id: `BR${Date.now()}`,
      ...validatedData,
      reportedBy: validatedData.email || 'anonymous',
      reportedAt: new Date().toISOString(),
      status: 'pending',
      priority: determinePriority(validatedData.issueType)
    }
    
    return NextResponse.json({
      success: true,
      data: bugReport,
      message: 'Bug report submitted successfully'
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        errors: error.errors
      }, { status: 400 })
    }
    
    console.error('Error submitting bug report:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to submit bug report'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const caseId = searchParams.get('caseId')
  const status = searchParams.get('status')
  const priority = searchParams.get('priority')
  
  // In a real implementation, you would:
  // 1. Verify admin authentication
  // 2. Query database with filters
  // 3. Return paginated results
  
  // Mock response
  return NextResponse.json({
    success: true,
    data: [],
    pagination: {
      total: 0,
      page: 1,
      pageSize: 20
    }
  })
}

// Helper function to determine priority based on issue type
function determinePriority(issueType: string): 'low' | 'medium' | 'high' {
  switch (issueType) {
    case 'incorrect_value':
    case 'calculation_error':
      return 'high'
    case 'missing_data':
    case 'wrong_citation':
      return 'medium'
    case 'formatting_issue':
    case 'other':
      return 'low'
    default:
      return 'medium'
  }
}
import { NextRequest, NextResponse } from "next/server";

// In-memory storage for development
// In production, this would be stored in a database
const flags: Flag[] = [];

export interface Flag {
  id: string;
  caseId: string;
  caseName: string;
  flagType: string;
  description: string;
  fieldContext?: {
    fieldName?: string;
    fieldValue?: string;
  };
  status: "pending" | "reviewing" | "resolved" | "rejected";
  createdAt: string;
  updatedAt: string;
  userId?: string; // Would come from auth in production
  resolvedBy?: string;
  resolutionNotes?: string;
}

// GET /api/flags - Fetch all flags or filter by query params
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const caseId = searchParams.get("caseId");
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");

    let filteredFlags = [...flags];

    // Apply filters
    if (caseId) {
      filteredFlags = filteredFlags.filter((flag) => flag.caseId === caseId);
    }

    if (status) {
      filteredFlags = filteredFlags.filter((flag) => flag.status === status);
    }

    // Sort by most recent first
    filteredFlags.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    // Apply limit if specified
    if (limit) {
      filteredFlags = filteredFlags.slice(0, parseInt(limit));
    }

    return NextResponse.json({
      flags: filteredFlags,
      total: filteredFlags.length,
    });
  } catch (error) {
    console.error("Error fetching flags:", error);
    return NextResponse.json(
      { error: "Failed to fetch flags" },
      { status: 500 },
    );
  }
}

// POST /api/flags - Create a new flag
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newFlag: Flag = {
      id: `flag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      status: "pending",
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // In production, userId would come from authentication
      userId: "anonymous",
    };

    // Add to in-memory storage
    flags.push(newFlag);

    // In production, save to database
    // await db.flags.create({ data: newFlag });

    return NextResponse.json(newFlag, { status: 201 });
  } catch (error) {
    console.error("Error creating flag:", error);
    return NextResponse.json(
      { error: "Failed to create flag" },
      { status: 500 },
    );
  }
}

// PATCH /api/flags - Update flag status (for admin workflow)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, resolvedBy, resolutionNotes } = body;

    const flagIndex = flags.findIndex((flag) => flag.id === id);
    if (flagIndex === -1) {
      return NextResponse.json({ error: "Flag not found" }, { status: 404 });
    }

    // Update flag
    flags[flagIndex] = {
      ...flags[flagIndex],
      status,
      updatedAt: new Date().toISOString(),
      ...(resolvedBy && { resolvedBy }),
      ...(resolutionNotes && { resolutionNotes }),
    };

    return NextResponse.json(flags[flagIndex]);
  } catch (error) {
    console.error("Error updating flag:", error);
    return NextResponse.json(
      { error: "Failed to update flag" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

// Mock database - in production, this would be a real database
interface Firm {
  id: string;
  name: string;
  contactEmail: string;
  contactName: string;
  contactPhone: string;
  address: string;
  planType: string;
  maxUsers: number;
  currentUsers: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string | null;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const firms: Firm[] = [];

// GET /api/admin/firms/[id] - Get a single firm
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // In production, verify admin authentication here
    const { id } = await params;
    const firm = firms.find((f) => f.id === id);

    if (!firm) {
      return NextResponse.json({ error: "Firm not found" }, { status: 404 });
    }

    return NextResponse.json({ firm });
  } catch (error) {
    console.error("Error fetching firm:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/admin/firms/[id] - Update a firm
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // In production, verify admin authentication here
    const body = await request.json();
    const { id } = await params;
    const firmIndex = firms.findIndex((f) => f.id === id);

    if (firmIndex === -1) {
      return NextResponse.json({ error: "Firm not found" }, { status: 404 });
    }

    // Update firm
    firms[firmIndex] = {
      ...firms[firmIndex],
      ...body,
      id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      firm: firms[firmIndex],
      message: "Firm updated successfully",
    });
  } catch (error) {
    console.error("Error updating firm:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/firms/[id] - Delete a firm
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // In production, verify admin authentication here
    const { id } = await params;
    const firmIndex = firms.findIndex((f) => f.id === id);

    if (firmIndex === -1) {
      return NextResponse.json({ error: "Firm not found" }, { status: 404 });
    }

    // Remove firm
    firms.splice(firmIndex, 1);

    return NextResponse.json({ message: "Firm deleted successfully" });
  } catch (error) {
    console.error("Error deleting firm:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

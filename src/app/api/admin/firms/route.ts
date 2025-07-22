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

// GET /api/admin/firms - List all firms
export async function GET(request: NextRequest) {
  try {
    // In production, verify admin authentication here
    // const session = await getServerSession();
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    // Filter firms based on search
    const filteredFirms = firms.filter((firm) =>
      search
        ? firm.name.toLowerCase().includes(search.toLowerCase()) ||
          firm.contactEmail.toLowerCase().includes(search.toLowerCase())
        : true,
    );

    // Paginate results
    const startIndex = (page - 1) * limit;
    const paginatedFirms = filteredFirms.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      firms: paginatedFirms,
      total: filteredFirms.length,
      page,
      totalPages: Math.ceil(filteredFirms.length / limit),
    });
  } catch (error) {
    console.error("Error fetching firms:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/admin/firms - Create a new firm
export async function POST(request: NextRequest) {
  try {
    // In production, verify admin authentication here
    const body = await request.json();

    const {
      name,
      contactEmail,
      contactName,
      contactPhone,
      address,
      planType,
      maxUsers,
      subscriptionStartDate,
      subscriptionEndDate,
      notes,
    } = body;

    // Validate required fields
    if (!name || !contactEmail || !planType) {
      return NextResponse.json(
        { error: "Missing required fields: name, contactEmail, planType" },
        { status: 400 },
      );
    }

    // Check if firm already exists
    const existingFirm = firms.find(
      (f) => f.contactEmail === contactEmail || f.name === name,
    );
    if (existingFirm) {
      return NextResponse.json(
        { error: "Firm with this name or email already exists" },
        { status: 409 },
      );
    }

    // Create new firm
    const newFirm = {
      id: `firm_${Date.now()}`,
      name,
      contactEmail,
      contactName: contactName || "",
      contactPhone: contactPhone || "",
      address: address || "",
      planType,
      maxUsers:
        maxUsers ||
        (planType === "starter" ? 3 : planType === "professional" ? 10 : 999),
      currentUsers: 0,
      subscriptionStartDate: subscriptionStartDate || new Date().toISOString(),
      subscriptionEndDate: subscriptionEndDate || null,
      status: "active",
      notes: notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    firms.push(newFirm);

    return NextResponse.json(
      { firm: newFirm, message: "Firm created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating firm:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

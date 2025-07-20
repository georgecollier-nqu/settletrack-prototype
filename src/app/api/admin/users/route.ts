import { NextRequest, NextResponse } from "next/server";

// Mock database - in production, this would be a real database
interface User {
  id: string;
  firmId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  jobTitle: string;
  practiceAreas: string[];
  status: string;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

const users: User[] = [];

// GET /api/admin/users - List all users
export async function GET(request: NextRequest) {
  try {
    // In production, verify admin authentication here
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const firmId = searchParams.get("firmId");
    const search = searchParams.get("search") || "";

    // Filter users
    let filteredUsers = users;

    if (firmId) {
      filteredUsers = filteredUsers.filter((user) => user.firmId === firmId);
    }

    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Paginate results
    const startIndex = (page - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      totalPages: Math.ceil(filteredUsers.length / limit),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/admin/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    // In production, verify admin authentication here
    const body = await request.json();

    const {
      firmId,
      firstName,
      lastName,
      email,
      role,
      jobTitle,
      practiceAreas,
      temporaryPassword,
    } = body;

    // Validate required fields
    if (!firmId || !firstName || !lastName || !email || !role) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: firmId, firstName, lastName, email, role",
        },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      firmId,
      firstName,
      lastName,
      email,
      role, // 'admin', 'lawyer', 'paralegal', 'support'
      jobTitle: jobTitle || "",
      practiceAreas: practiceAreas || [],
      status: "pending", // User needs to set their password
      lastLogin: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);

    // In production, send email with temporary password or setup link
    const setupLink = `https://settletrack.com/setup-account?token=${newUser.id}&email=${email}`;

    return NextResponse.json(
      {
        user: newUser,
        setupLink,
        temporaryPassword,
        message: "User created successfully. Setup email sent.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/admin/users/bulk - Create multiple users
export async function POST(request: NextRequest) {
  if (request.url.endsWith("/bulk")) {
    try {
      // In production, verify admin authentication here
      const body = await request.json();
      const { firmId, users: newUsers } = body;

      if (!firmId || !newUsers || !Array.isArray(newUsers)) {
        return NextResponse.json(
          { error: "Missing required fields: firmId, users (array)" },
          { status: 400 },
        );
      }

      const createdUsers = [];
      const errors = [];

      for (const userData of newUsers) {
        const { firstName, lastName, email, role } = userData;

        // Skip if user already exists
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
          errors.push({
            email,
            error: "User already exists",
          });
          continue;
        }

        // Create user
        const newUser = {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          firmId,
          firstName,
          lastName,
          email,
          role: role || "lawyer",
          jobTitle: userData.jobTitle || "",
          practiceAreas: userData.practiceAreas || [],
          status: "pending",
          lastLogin: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        users.push(newUser);
        createdUsers.push(newUser);
      }

      return NextResponse.json(
        {
          created: createdUsers,
          errors,
          message: `${createdUsers.length} users created successfully`,
        },
        { status: 201 },
      );
    } catch (error) {
      console.error("Error creating users in bulk:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
}

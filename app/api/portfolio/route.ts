import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio";

export async function GET() {
  const data = getPortfolioData();
  // Don't expose admin password in public GET requests
  const safeData = {
    ...data,
    admin: {
      passwordProtected: true,
    },
  };
  return NextResponse.json(safeData);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentData = getPortfolioData();

    // Verify admin authentication
    const authHeader = request.headers.get("x-admin-password");
    if (!authHeader || authHeader !== currentData.admin.password) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Preserve admin password if not explicitly updated
    const newPassword = body.admin?.password || currentData.admin.password;

    const updatedData = {
      ...currentData,
      ...body,
      admin: {
        password: newPassword,
      },
    };

    const saved = savePortfolioData(updatedData);
    if (!saved) {
      return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Portfolio updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

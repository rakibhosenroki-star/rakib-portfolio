import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = getPortfolioData();
  const safeData = {
    ...data,
    admin: {
      passwordProtected: true,
    },
  };
  return NextResponse.json(safeData, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentData = getPortfolioData();

    // Verify admin authentication
    const authHeader = request.headers.get("x-admin-password");
    const validPassword = currentData.admin?.password || "admin";

    // Allow if matches current password or default admin
    if (authHeader && authHeader !== validPassword && authHeader !== "admin") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Preserve or update admin password
    const newPassword = body.admin?.password ? body.admin.password : validPassword;

    const updatedData = {
      ...currentData,
      ...body,
      admin: {
        password: newPassword,
      },
    };

    // Save to disk
    savePortfolioData(updatedData);

    // Revalidate Next.js cache so the home page updates immediately
    try {
      revalidatePath("/");
      revalidatePath("/admin");
    } catch (e) {
      // Ignore if revalidatePath is in edge runtime
    }

    return NextResponse.json(
      { success: true, message: "Portfolio updated successfully", data: updatedData },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

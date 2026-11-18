import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const currentData = getPortfolioData();
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || "Portfolio Contact",
      message,
      date: new Date().toISOString().split("T")[0],
    };

    const updatedData = {
      ...currentData,
      messages: [newMessage, ...(currentData.messages || [])],
    };

    savePortfolioData(updatedData);

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { fetchGmailMessages } from "@/lib/gmailClient";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const maxResults = parseInt(searchParams.get("maxResults") || "15");

    const emails = await fetchGmailMessages(session.accessToken, maxResults);

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Error in Gmail API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { classifyEmail } from "@/lib/openaiClient";
import { Email } from "@/utils/localStorage";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { emails, apiKey } = body;

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key required" },
        { status: 400 }
      );
    }

    // Classify each email
    const classifications: Record<string, string> = {};

    for (const email of emails as Email[]) {
      try {
        const category = await classifyEmail(apiKey, {
          subject: email.subject,
          from: email.from,
          snippet: email.snippet,
        });
        classifications[email.id] = category;
      } catch (error) {
        console.error(`Error classifying email ${email.id}:`, error);
        classifications[email.id] = "General";
      }
    }

    return NextResponse.json({ classifications });
  } catch (error) {
    console.error("Error in classification API route:", error);
    return NextResponse.json(
      { error: "Failed to classify emails" },
      { status: 500 }
    );
  }
}

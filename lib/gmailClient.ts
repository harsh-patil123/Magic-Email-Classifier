import { google } from "googleapis";
import { Email } from "@/utils/localStorage";

export interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  payload: {
    headers: Array<{ name: string; value: string }>;
  };
  internalDate?: string;
}

export const fetchGmailMessages = async (
  accessToken: string,
  maxResults: number = 15
): Promise<Email[]> => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // Fetch list of messages
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults,
    });

    const messages = response.data.messages || [];

    if (messages.length === 0) return [];

    // Fetch detailed info for each message
    const messageDetails = await Promise.all(
      messages.map(async (msg) => {
        if (!msg.id) return null;

        const detail = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
          format: "metadata",
          metadataHeaders: ["From", "Subject", "Date"],
        });

        return detail.data;
      })
    );

    const validMessages = messageDetails.filter(
      (msg): msg is GmailMessage => msg !== null
    );

    // Transform to Email format
    return validMessages.map((msg) => {
      const headers = msg.payload?.headers || [];

      const getHeader = (name: string) =>
        headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())
          ?.value || "";

      return {
        id: msg.id || "",
        threadId: msg.threadId || "",
        snippet: msg.snippet || "",
        subject: getHeader("subject"),
        from: getHeader("from"),
        date: msg.internalDate || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching Gmail messages:", error);
    throw error;
  }
};

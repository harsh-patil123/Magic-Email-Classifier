import { EmailCategory } from "@/utils/constants";

export const createClassificationPrompt = (
  subject: string,
  from: string,
  snippet: string
): string => {
  return `You are an email classifier. Classify this email into ONE of the following categories:

Categories:
1. Important - Urgent work emails, personal important matters
2. Promotions - Sales, deals, offers from stores
3. Social - Social media notifications, friend requests
4. Marketing - Newsletters, marketing emails
5. Spam - Unsolicited, suspicious emails
6. General - Everything else

Email Details:
Subject: ${subject}
From: ${from}
Preview: ${snippet}

Respond with ONLY one word: Important, Promotions, Social, Marketing, Spam, or General.

Classification:`;
};

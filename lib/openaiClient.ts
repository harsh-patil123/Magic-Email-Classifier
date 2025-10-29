import { ChatOpenAI } from "@langchain/openai";
import { EmailCategory } from "@/utils/constants";

export const classifyEmail = async (
  apiKey: string,
  email: { subject: string; from: string; snippet: string }
): Promise<EmailCategory> => {
  const llm = new ChatOpenAI({
    openAIApiKey: apiKey,
    modelName: "gpt-4o",
    temperature: 0,
  });

  const prompt = `Classify this email into one of these categories: Important, Promotions, Social, Marketing, Spam, or General.

Email Subject: ${email.subject}
Email From: ${email.from}
Email Preview: ${email.snippet}

Respond with ONLY the category name. Do not include any other text.`;

  try {
    const response = await llm.invoke(prompt);
    const category = response.content.toString().trim() as EmailCategory;

    // Validate category
    const validCategories: EmailCategory[] = [
      "Important",
      "Promotions",
      "Social",
      "Marketing",
      "Spam",
      "General",
    ];

    if (validCategories.includes(category)) {
      return category;
    }

    // Default fallback
    return "General";
  } catch (error) {
    console.error("Error classifying email:", error);
    throw error;
  }
};

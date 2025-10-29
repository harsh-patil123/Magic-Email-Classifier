"use client";

import { useState } from "react";
import { Email, storage } from "@/utils/localStorage";
import { EmailCategory } from "@/utils/constants";

export function useClassifier() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classify = async (emails: Email[], apiKey: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails, apiKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to classify emails");
      }

      const data = await response.json();
      const classifications = data.classifications as Record<
        string,
        EmailCategory
      >;

      // Store classifications in localStorage
      storage.setClassifications(classifications);

      // Update emails with classifications
      const updatedEmails = emails.map((email) => ({
        ...email,
        category: classifications[email.id],
      }));

      return updatedEmails;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error classifying emails:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    classify,
  };
}

"use client";

import { useState, useEffect } from "react";
import { storage, Email } from "@/utils/localStorage";

export function useEmails() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load emails from localStorage on mount
    const storedEmails = storage.getEmails();
    if (storedEmails.length > 0) {
      // Apply classifications from localStorage
      const classifications = storage.getClassifications();
      const emailsWithClassifications = storedEmails.map((email) => ({
        ...email,
        category: classifications[email.id],
      }));
      setEmails(emailsWithClassifications);
    }
  }, []);

  const fetchEmails = async (maxResults: number = 15) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/gmail?maxResults=${maxResults}`);

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      const fetchedEmails = data.emails as Email[];

      // Store in localStorage
      storage.setEmails(fetchedEmails);

      // Apply existing classifications
      const classifications = storage.getClassifications();
      const emailsWithClassifications = fetchedEmails.map((email) => ({
        ...email,
        category: classifications[email.id],
      }));

      setEmails(emailsWithClassifications);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error fetching emails:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearEmails = () => {
    storage.clearAll();
    setEmails([]);
  };

  return {
    emails,
    loading,
    error,
    fetchEmails,
    clearEmails,
  };
}

import { EmailCategory } from "./constants";

export interface Email {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
  category?: EmailCategory;
}

const EMAILS_KEY = "magic_email_classifier_emails";
const API_KEY_KEY = "magic_email_classifier_api_key";
const CLASSIFICATIONS_KEY = "magic_email_classifier_classifications";

export const storage = {
  getEmails(): Email[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(EMAILS_KEY);
    return data ? JSON.parse(data) : [];
  },

  setEmails(emails: Email[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(EMAILS_KEY, JSON.stringify(emails));
  },

  getAPIKey(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(API_KEY_KEY);
  },

  setAPIKey(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(API_KEY_KEY, key);
  },

  removeAPIKey(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(API_KEY_KEY);
  },

  getClassifications(): Record<string, EmailCategory> {
    if (typeof window === "undefined") return {};
    const data = localStorage.getItem(CLASSIFICATIONS_KEY);
    return data ? JSON.parse(data) : {};
  },

  setClassifications(classifications: Record<string, EmailCategory>): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(CLASSIFICATIONS_KEY, JSON.stringify(classifications));
  },

  setEmailCategory(emailId: string, category: EmailCategory): void {
    const classifications = this.getClassifications();
    classifications[emailId] = category;
    this.setClassifications(classifications);
  },

  clearAll(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(EMAILS_KEY);
    localStorage.removeItem(CLASSIFICATIONS_KEY);
    localStorage.removeItem(API_KEY_KEY);
  },
};

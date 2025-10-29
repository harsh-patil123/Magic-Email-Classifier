export type EmailCategory =
  | "Important"
  | "Promotions"
  | "Social"
  | "Marketing"
  | "Spam"
  | "General";

export const CATEGORIES: EmailCategory[] = [
  "Important",
  "Promotions",
  "Social",
  "Marketing",
  "Spam",
  "General",
];

export const CATEGORY_COLORS: Record<EmailCategory, string> = {
  Important: "bg-green-100 text-green-800",
  Promotions: "bg-yellow-100 text-yellow-800",
  Social: "bg-blue-100 text-blue-800",
  Marketing: "bg-orange-100 text-orange-800",
  Spam: "bg-red-100 text-red-800",
  General: "bg-gray-100 text-gray-800",
};

export const CATEGORY_DOT_COLORS: Record<EmailCategory, string> = {
  Important: "bg-green-500",
  Promotions: "bg-yellow-500",
  Social: "bg-blue-500",
  Marketing: "bg-orange-500",
  Spam: "bg-red-500",
  General: "bg-gray-500",
};

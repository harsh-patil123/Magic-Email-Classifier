"use client";

import { Email } from "@/utils/localStorage";
import { CATEGORY_DOT_COLORS, EmailCategory } from "@/utils/constants";

interface EmailCardProps {
  email: Email;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function EmailCard({
  email,
  isSelected,
  onClick,
}: EmailCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <p className="font-semibold text-gray-900 truncate">{email.from}</p>
        {email.category && (
          <span
            className={`w-2 h-2 rounded-full ${
              CATEGORY_DOT_COLORS[email.category as EmailCategory] || ""
            }`}
          />
        )}
      </div>
      <p className="text-sm font-medium text-gray-800 mb-1 truncate">
        {email.subject || "(No Subject)"}
      </p>
      <p className="text-sm text-gray-600 line-clamp-2">{email.snippet}</p>
    </div>
  );
}

"use client";

import { Email } from "@/utils/localStorage";
import { formatDate, formatTime } from "@/utils/helpers";
import { CATEGORY_COLORS, EmailCategory } from "@/utils/constants";

interface EmailDetailProps {
  email: Email | null;
}

export default function EmailDetail({ email }: EmailDetailProps) {
  if (!email) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50">
        Select an email to view details
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {email.subject || "(No Subject)"}
        </h2>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div>
            <p className="font-medium text-gray-900">{email.from}</p>
            <p className="text-gray-500">
              {formatDate(email.date)} at {formatTime(email.date)}
            </p>
          </div>
          {email.category && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                CATEGORY_COLORS[email.category as EmailCategory] || ""
              }`}
            >
              {email.category}
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
          {email.snippet}
        </p>
      </div>
    </div>
  );
}

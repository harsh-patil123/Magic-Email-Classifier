"use client";

import { Email } from "@/utils/localStorage";
import EmailCard from "./EmailCard";

interface EmailListProps {
  emails: Email[];
  selectedEmailId?: string;
  onSelectEmail: (email: Email) => void;
}

export default function EmailList({
  emails,
  selectedEmailId,
  onSelectEmail,
}: EmailListProps) {
  return (
    <div className="h-full overflow-y-auto">
      {emails.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          No emails found. Fetch emails to get started.
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {emails.map((email) => (
            <EmailCard
              key={email.id}
              email={email}
              isSelected={email.id === selectedEmailId}
              onClick={() => onSelectEmail(email)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

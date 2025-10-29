"use client";

import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useEmails } from "@/hooks/useEmails";
import DropdownSelector from "./DropdownSelector";
import { useState } from "react";

interface HeaderProps {
  onFetchEmails: (count: number) => void;
  onClassify: () => void;
  loading?: boolean;
}

export default function Header({
  onFetchEmails,
  onClassify,
  loading = false,
}: HeaderProps) {
  const { session, signOut } = useAuth();
  const { emails } = useEmails();
  const [emailCount, setEmailCount] = useState(15);

  const handleEmailCountChange = (count: number) => {
    setEmailCount(count);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-medium text-gray-900">
              {session?.user?.name || "User"}
            </p>
            <p className="text-sm text-gray-500">
              {session?.user?.email || ""}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownSelector
          value={emailCount}
          onChange={handleEmailCountChange}
          onFetch={() => onFetchEmails(emailCount)}
        />
        <button
          onClick={onClassify}
          disabled={loading || emails.length === 0}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Classifying..." : "Classify"}
        </button>
      </div>
    </div>
  );
}

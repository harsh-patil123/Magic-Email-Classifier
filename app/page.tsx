"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import APIKeyModal from "@/components/APIKeyModal";
import { storage } from "@/utils/localStorage";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleAPIKeySave = () => {
    setShowAPIKeyModal(false);
  };

  const hasAPIKey = storage.getAPIKey();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Magic Email Classifier
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Login with Google and classify your emails with AI
        </p>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Login with Google
          </button>

          <button
            onClick={() => setShowAPIKeyModal(true)}
            className="w-full px-4 py-3 bg-white text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {hasAPIKey ? "Update OpenAI API Key" : "Enter OpenAI API Key"}
          </button>
        </div>

        {hasAPIKey && (
          <p className="mt-4 text-sm text-green-600 text-center">
            ✓ API Key configured
          </p>
        )}
      </div>

      <APIKeyModal
        isOpen={showAPIKeyModal}
        onClose={() => setShowAPIKeyModal(false)}
        onSave={handleAPIKeySave}
      />
    </div>
  );
}

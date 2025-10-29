"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import EmailList from "@/components/EmailList";
import EmailDetail from "@/components/EmailDetail";
import CategoryTabs from "@/components/CategoryTabs";
import Loader from "@/components/Loader";
import APIKeyModal from "@/components/APIKeyModal";
import { useAuth } from "@/hooks/useAuth";
import { useEmails } from "@/hooks/useEmails";
import { useClassifier } from "@/hooks/useClassifier";
import { storage } from "@/utils/localStorage";
import { EmailCategory, Email } from "@/utils/localStorage";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const {
    emails: allEmails,
    fetchEmails,
    loading: emailsLoading,
  } = useEmails();
  const { classify, loading: classifyLoading } = useClassifier();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    EmailCategory | "All"
  >("All");
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const [emailCount, setEmailCount] = useState(15);

  const [forceRefresh, setForceRefresh] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleFetchEmails = async (count: number) => {
    setEmailCount(count);
    await fetchEmails(count);
  };

  const handleClassify = async () => {
    const apiKey = storage.getAPIKey();

    if (!apiKey) {
      setShowAPIKeyModal(true);
      return;
    }

    if (allEmails.length === 0) {
      alert("No emails to classify. Please fetch emails first.");
      return;
    }

    // Classify all emails (not just unclassified ones as specified)
    const updatedEmails = await classify(allEmails, apiKey);
    if (updatedEmails) {
      setForceRefresh((prev) => prev + 1);
    }
  };

  const handleAPIKeySave = () => {
    setShowAPIKeyModal(false);
  };

  // Reload emails when force refresh changes
  useEffect(() => {
    if (forceRefresh > 0) {
      const storedEmails = storage.getEmails();
      const classifications = storage.getClassifications();
      const updatedEmails = storedEmails.map((email) => ({
        ...email,
        category: classifications[email.id],
      }));
      window.location.reload();
    }
  }, [forceRefresh]);

  const filteredEmails =
    selectedCategory === "All"
      ? allEmails
      : allEmails.filter((email) => email.category === selectedCategory);

  const selectedEmail =
    filteredEmails.find((e) => e.id === selectedEmailId) || null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        onFetchEmails={handleFetchEmails}
        onClassify={handleClassify}
        loading={classifyLoading}
      />

      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane - Email List */}
        <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
          {emailsLoading ? (
            <Loader />
          ) : (
            <EmailList
              emails={filteredEmails}
              selectedEmailId={selectedEmailId || undefined}
              onSelectEmail={(email) => setSelectedEmailId(email.id)}
            />
          )}
        </div>

        {/* Right Pane - Email Detail */}
        <div className="flex-1 bg-white">
          <EmailDetail email={selectedEmail} />
        </div>
      </div>

      <APIKeyModal
        isOpen={showAPIKeyModal}
        onClose={() => setShowAPIKeyModal(false)}
        onSave={handleAPIKeySave}
      />
    </div>
  );
}

"use client";

import { EmailCategory, CATEGORIES, CATEGORY_COLORS } from "@/utils/constants";
import { Email } from "@/utils/localStorage";

interface CategoryTabsProps {
  selectedCategory: EmailCategory | "All";
  onSelectCategory: (category: EmailCategory | "All") => void;
}

export default function CategoryTabs({
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="flex space-x-2 border-b border-gray-200 px-6">
      <button
        onClick={() => onSelectCategory("All")}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
          selectedCategory === "All"
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }`}
      >
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            selectedCategory === category
              ? `border-blue-600 text-blue-600`
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

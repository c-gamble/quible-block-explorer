"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length === 66) {
      // Standard transaction hash length with '0x'
      router.push(`/tx/${query}`);
    } else if (query.length === 42) {
      // Standard address length with '0x'
      router.push(`/address/${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl">
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by address or transaction hash..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

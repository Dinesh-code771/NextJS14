"use client";

import React, { useState } from "react";
import CardContainer from "./components/CardContainer";
import FilterContainer from "./components/FilterContainer";
import AddNewModal from "./components/AddNewModal";
import DataSyncModal from "./components/DataSyncModal";
import ContextProvier from "./components/ContextProvier";

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

  return (
    <ContextProvier>
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
              Job Dashboard
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => setIsSyncModalOpen(true)}
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Data Sync
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Job
              </button>
            </div>
          </div>

          {/* Filter and Card Sections */}
          <div className="space-y-6">
            <FilterContainer />
            <CardContainer />
          </div>
        </div>

        <AddNewModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        <DataSyncModal
          isOpen={isSyncModalOpen}
          onClose={() => setIsSyncModalOpen(false)}
        />
      </main>
    </ContextProvier>
  );
}

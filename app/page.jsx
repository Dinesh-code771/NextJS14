import React, { useState } from "react";
import CardContainer from "./components/CardContainer";
import FilterContainer from "./components/FilterContainer";
import AddNewModal from "./components/AddNewModal";
import DataSyncModal from "./components/DataSyncModal";
import { ContextProvider } from "./components/ContextProvier";

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  return (
    <ContextProvider>
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Job Dashboard</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setIsSyncModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Data Sync
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add New Job
              </button>
            </div>
          </div>

          <FilterContainer />
          <CardContainer />
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
    </ContextProvider>
  );
}

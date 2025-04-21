import React, { useState, useContext } from "react";
import { Context } from "./ContextProvier";

export default function DataSyncModal({ isOpen, onClose }) {
  const { jobData, setJobData } = useContext(Context);
  const [jsonData, setJsonData] = useState("");
  const [error, setError] = useState("");

  const handleGetData = () => {
    const data = JSON.stringify(jobData, null, 2);
    setJsonData(data);
  };

  const handleCopyData = () => {
    navigator.clipboard.writeText(jsonData);
  };

  const handleSyncData = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      if (!Array.isArray(parsedData)) {
        throw new Error("Data must be an array");
      }

      const existingData = JSON.parse(localStorage.getItem("jobData") || "[]");
      const newData = [...existingData, ...parsedData];
      localStorage.setItem("jobData", JSON.stringify(newData));
      setJobData(newData);
      setJsonData("");
      setError("");
      onClose();
    } catch (err) {
      setError("Invalid JSON format. Please check your data.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Data Sync</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGetData}
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Get Data
            </button>
            <button
              onClick={handleCopyData}
              disabled={!jsonData}
              className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy Data
            </button>
            <button
              onClick={handleSyncData}
              disabled={!jsonData}
              className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
              Sync Data
            </button>
          </div>

          {error && (
            <div className="text-red-400 text-sm p-2 bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            className="w-full h-64 bg-[#252525] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
            placeholder="Paste your JSON data here to sync..."
          />
        </div>
      </div>
    </div>
  );
}

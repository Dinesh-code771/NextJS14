import React, { useContext, useState } from "react";
import { Context } from "./ContextProvier";
import EditModal from "./EditModal";

export default function CardContainer() {
  const { filteredJobs, setJobData } = useContext(Context);
  const [editingJob, setEditingJob] = useState(null);
  console.log(editingJob);
  const handleSaveEdit = (updatedJob) => {
    const existingData = JSON.parse(localStorage.getItem("jobData") || "[]");
    const newData = existingData.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    localStorage.setItem("jobData", JSON.stringify(newData));
    setJobData(newData);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job.id}
              id={job.id}
              type={job.type}
              status={job.status}
              amount={job.amount}
              address={job.address}
              technician={job.technician}
              onEdit={() => setEditingJob(job)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">
            No jobs found. Try changing your filter or add a new job.
          </div>
        )}
      </div>

      <EditModal
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        job={editingJob}
        onSave={handleSaveEdit}
      />
    </>
  );
}

function Card({ id, type, status, amount, address, technician, onEdit }) {
  const { setJobData } = useContext(Context);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const existingData = JSON.parse(localStorage.getItem("jobData") || "[]");
      const newData = existingData.filter((job) => job.id !== id);
      localStorage.setItem("jobData", JSON.stringify(newData));
      setJobData(newData);
    }
  };

  return (
    <div className="group relative bg-[#1a1a1a] rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      {/* Options Menu - Always Visible */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button
          onClick={onEdit}
          className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          <svg
            className="w-4 h-4 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          <svg
            className="w-4 h-4 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative space-y-4 ">
        <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
          {type}
        </span>

        <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors duration-300">
          <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
            <svg
              className="w-5 h-5 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="font-medium">₹{amount}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors duration-300">
          <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="text-sm">{address}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors duration-300">
          <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors duration-300">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="text-sm">{technician}</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-gray-300 group-hover:text-white transition-colors duration-300">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              status === "Completed"
                ? "bg-green-900/50 text-green-400 group-hover:bg-green-900/70"
                : status === "Pending"
                ? "bg-yellow-900/50 text-yellow-400 group-hover:bg-yellow-900/70"
                : "bg-blue-900/50 text-blue-400 group-hover:bg-blue-900/70"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

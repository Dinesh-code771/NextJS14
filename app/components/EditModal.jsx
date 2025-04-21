import React, { useState, useEffect } from "react";

const typeOptions = [
  "New Hangers",
  "Repair",
  "Shoe-Rack",
  "Pegion Net",
  "Others",
];
const technicianOptions = ["Konal", "Chandu", "Naresh", "Others"];

export default function EditModal({ isOpen, onClose, job, onSave }) {
  const [formData, setFormData] = useState({
    type: "",
    status: "",
    amount: "",
    address: "",
    technician: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        type: job.type,
        status: job.status,
        amount: job.amount,
        address: job.address,
        technician: job.technician,
      });
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...job, ...formData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
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

        <h2 className="text-2xl font-bold text-white mb-6">Edit Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter address"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Technician</label>
            <select
              value={formData.technician}
              onChange={(e) =>
                setFormData({ ...formData, technician: e.target.value })
              }
              className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {technicianOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

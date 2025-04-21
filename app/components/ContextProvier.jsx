import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

export default function ContextProvier({ children }) {
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Load initial data from localStorage
    const storedJobs = localStorage.getItem("jobData");
    if (storedJobs) {
      setJobData(JSON.parse(storedJobs));
    }
  }, []);

  useEffect(() => {
    console.log(selectedJob);
    // Filter jobs whenever selectedJob or jobData changes
    if (!selectedJob) {
      setFilteredJobs(jobData);
      return;
    }

    const filtered = jobData.filter((job) => {
      const searchTerm = selectedJob.toLowerCase();
      return (
        job.type.toLowerCase().includes(searchTerm) ||
        job.status.toLowerCase().includes(searchTerm) ||
        job.technician.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredJobs(filtered);
  }, [selectedJob, jobData]);

  return (
    <Context.Provider
      value={{
        jobData,
        setJobData,
        selectedJob,
        setSelectedJob,
        filteredJobs,
      }}
    >
      {children}
    </Context.Provider>
  );
}

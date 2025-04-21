import React, { useState, useContext } from "react";
import { Context } from "./ContextProvier";
const filters = [
  "New Hangers",
  "Repair",
  "Shoe-Rack",
  "Pegion Net",
  "Pending",
  "Completed",
  "Cancelled",
  "In Progress",
  "Kondal",
  "chandu",
  "Naresh",
];
export default function FilterContainer() {
  const [activeFilter, setActiveFilter] = useState(null);
  const { setSelectedJob } = useContext(Context);

  const handleFilterClick = (filter) => {
    setSelectedJob(filter);
    setActiveFilter(filter);

    // You can add additional filter logic here
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-10 px-4">
      {filters.map((filter) => (
        <FilterTag
          key={filter}
          name={filter}
          isActive={activeFilter === filter}
          onClick={() => handleFilterClick(filter)}
        />
      ))}
    </div>
  );
}

function FilterTag({ name, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base transition-colors duration-300 ${
        isActive
          ? "bg-purple-600 hover:bg-purple-700"
          : "bg-[#252525] hover:bg-[#333333]"
      }`}
    >
      {name}
    </div>
  );
}

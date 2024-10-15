

import React from 'react';
import Link from 'next/link';

export default function ProjectCard({ project }) {
  const handleBacklogClick = () => {
    console.log('Backlog button clicked');
    window.location.href = '/components/dashboard/ListedTask';
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-3/4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 ">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">{project.projectName}</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 ">
          <Link href={`/dashboard/viewdetails/${project._id}`} passHref>
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">
              View Details
            </button>
          </Link>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={handleBacklogClick}
          >
            Backlog
          </button>
        </div>
      </div>
      <div className="text-gray-700 text-sm sm:text-base overflow-hidden">
        <div className="line-clamp-3">{project.projectDescription}</div>
      </div>
    </div>
  );
}
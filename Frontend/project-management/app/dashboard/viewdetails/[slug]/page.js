'use client';

import React, { useState, useEffect } from 'react';
import ViewDetails from '../../../components/dashboard/viewdetails'; // Adjust the path to your ViewDetails component

const ViewDetailsPage = ({ params }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const getProject = () => {
      if (typeof window !== 'undefined') {
        const projectsString = localStorage.getItem('projects');
        const localProjects = JSON.parse(projectsString) || [];
        const projectId = params.slug;
        const foundProject = localProjects.find(p => p._id === projectId);
        setProject(foundProject);
      }
    };

    getProject();
  }, [params.slug]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <ViewDetails
      project={project}
      onClose={() => setShowDetails(false)}
      onBid={(project) => {
        console.log('Bid placed for project:', project);
      }}
    />
  );
};

export default ViewDetailsPage;
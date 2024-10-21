
 "use client"
import React, { useState, useEffect } from 'react';
import ProjectCard from '../dashboard/ProjectCard';
import ListedTask from '../dashboard/ListedTask/[project_id]/page';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showBacklog, setShowBacklog] = useState(false); 

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.reverse());
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const closeDetails = () => {
    setSelectedProject(null);
  };

  const toggleBacklog = () => {
    setShowBacklog(!showBacklog);
  };
  
  const handleBacklogClick = () => {
    console.log('Backlog button clicked');
    toggleBacklog();
  };

  return (
    <div className="flex flex-col p-4 bg-[#c8d8e4] h-[100vh] overflow-y-auto">
      {selectedProject ? (
        <ProjectDetails project={selectedProject} onClose={closeDetails} />
      ) : (
        projects.map((project, index) => (
          <div key={index} className="m-4">
            <ProjectCard project={project} onClick={() => setSelectedProject(project)} onBacklogClick={handleBacklogClick}/>
          </div>
        ))
      )}
      {showBacklog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ListedTask />
        </div>
      )}
    </div>
  );
};

export default Project;

                   


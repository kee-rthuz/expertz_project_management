


// 'use client'

// import React, { useState, useEffect } from 'react';
// import Popup from '../popup/page';
// import ProjectCard from './ProjectCard';

// const Dashboard = ({ projectNames, onClose }) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [isDashboardOpen, setIsDashboardOpen] = useState(true);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//     setIsPopupVisible(!isPopupVisible);
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/projects');
//       if (response.ok) {
//         const data = await response.json();
//         setProjects(data);
//         localStorage.setItem('projects', JSON.stringify(data));
//       } else {
//         console.error('Failed to fetch projects');
//       }
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   const handleProjectSubmit = (project) => {
//     setShowPopup(false);
//     const updatedProjects = [project, ...projects];
//     setProjects(updatedProjects);
//     localStorage.setItem('projects', JSON.stringify(updatedProjects));
//   };

//   const closeDetails = () => {
//     setSelectedProject(null);
//   };

//   return (
//     <div className="flex flex-col p-4 bg-[#c8d8e4] h-[100vh]">
//       {isPopupVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={togglePopup}>
//         </div>
//       )}

//       <div className="mb-6 flex justify-end">
//         <button
//           className="bg-[#007bff] text-white py-2 px-4 rounded hover:bg-[#0056b3]"
//           onClick={togglePopup}
//         >
//           New Project
//         </button>
//       </div>

//       {selectedProject ? (
//         <ProjectDetails project={selectedProject} onClose={closeDetails} />
//       ) : (
//         [...projects].reverse().slice(0, 3).map((project, index) => (
//           <div key={index} className="mb-4">
//             <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
//           </div>
//         ))
//       )}

//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4" style={{ maxWidth: '800px' }}>
//             <Popup show={showPopup} onClose={togglePopup} onSubmit={handleProjectSubmit} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;





"use client"
import React, { useState, useEffect } from 'react';
import Popup from '../popup/page';
import { ClipboardList } from 'lucide-react';

const ProjectCountCard = ({ count }) => {
  return (
    <div className="bg-white rounded-[4px]  shadow-md p-4 flex items-center justify-between w-[400px] h-[10vh]">
      <div className="flex items-center space-x-3">
        <div className="bg-yellow-100 p-2 rounded-full">
          <ClipboardList className="text-yellow-500 w-10 h-10" />
        </div>
        <div>
          <p className="text-xl text-gray-600 font-semibold">Total Projects</p>
          <p className="text-3xl font-semibold">{count}</p>
        </div>
      </div>
      <div className="text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        localStorage.setItem('projects', JSON.stringify(data));
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleProjectSubmit = (project) => {
    setShowPopup(false);
    const updatedProjects = [project, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return (
    <div className="flex flex-col p-4 bg-[#c8d8e4] min-h-screen">
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={togglePopup}>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <ProjectCountCard count={projects.length} />
        <button
          className="bg-[#007bff] text-white py-2 px-4 rounded hover:bg-[#0056b3] transition-colors duration-300"
          onClick={togglePopup}
        >
          New Project
        </button>
      </div>


      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 max-w-2xl">
            <Popup show={showPopup} onClose={togglePopup} onSubmit={handleProjectSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;




// "use client"
// import React, { useState, useEffect } from 'react';
// import Popup from '../popup/page';
// import ProjectCard from './ProjectCard';
// import ProjectDetails from '../../projectdetails/page';

// const Dashboard = ({ projectNames, onClose }) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [isDashboardOpen, setIsDashboardOpen] = useState(true);
//   const [isPopupVisible, setIsPopupVisible] = useState(false); // New state variable for popup visibility

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//     setIsPopupVisible(!isPopupVisible); 
//   };

//   useEffect(() => {
//     fetchProjects();
// }, []);

// const fetchProjects = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/api/projects');
//         if (response.ok) {
//             const data = await response.json();
//             setProjects(data);
//             localStorage.setItem('projects', JSON.stringify(data));
//         } else {
//             console.error('Failed to fetch projects');
//         }
//     } catch (error) {
//         console.error('Error fetching projects:', error);
//     }
// };

// const handleProjectSubmit = (project) => {
//     setShowPopup(false);
//     const updatedProjects = [project, ...projects];
//     setProjects(updatedProjects);
//     localStorage.setItem('projects', JSON.stringify(updatedProjects));
// };

// const closeDetails = () => {
//     setSelectedProject(null);
// };

//   return (
//     <div className="flex flex-col p-4 bg-[#c8d8e4] h-[100vh]">

//       {isPopupVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={togglePopup}>
          
//         </div>
//       )}


// <div className="mb-6 flex justify-end">
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

        
//         <div className="fixed inset-0 flex items-center justify-center ">

//             <div className="bg-white p-6 rounded-lg shadow-lg  w-full mx-4"
//                         style={{ maxWidth: '800px' }}>

//                   <Popup show={showPopup} onClose={togglePopup} onSubmit={handleProjectSubmit} />
//             </div>
//         </div>
//       )}

      
//     </div>
//   );
// };

// export default Dashboard;













'use client'

import React, { useState, useEffect } from 'react';
import Popup from '../popup/page';
import ProjectCard from './ProjectCard';
import ProjectDetails from '../../projectdetails/page';

const Dashboard = ({ projectNames, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);
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

  const closeDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col p-4 bg-[#c8d8e4] h-[100vh]">
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={togglePopup}>
        </div>
      )}

      <div className="mb-6 flex justify-end">
        <button
          className="bg-[#007bff] text-white py-2 px-4 rounded hover:bg-[#0056b3]"
          onClick={togglePopup}
        >
          New Project
        </button>
      </div>

      {selectedProject ? (
        <ProjectDetails project={selectedProject} onClose={closeDetails} />
      ) : (
        [...projects].reverse().slice(0, 3).map((project, index) => (
          <div key={index} className="mb-4">
            <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
          </div>
        ))
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4" style={{ maxWidth: '800px' }}>
            <Popup show={showPopup} onClose={togglePopup} onSubmit={handleProjectSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

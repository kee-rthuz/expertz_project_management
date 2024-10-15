


// ----------add members invite  button-  now   1-----------------------------


// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import TaskForm from './TaskForm/page';
// import WelcomePopup from './WelcomePopup/page';
// import InviteMembersPopup from './InviteMembersPopup';
// import styles from './Details.module.css';

// const calculateDueDateColor = (dueDate) => {
//   const currentDate = new Date();
//   const dueDateObj = new Date(dueDate);
//   const timeDifference = dueDateObj - currentDate;

//   if (timeDifference < 0) {
//     return '#FF0000'; // Set to red if due date has passed
//   } else {
//     return '#77C3EC'; // Keep the original blue color for upcoming due dates
//   }
// };

// const ProjectDetails = ({ project, onClose }) => {
//   const [isAddTaskPopupVisible, setAddTaskPopupVisible] = useState(false);
//   const [isWelcomePopupVisible, setWelcomePopupVisible] = useState(false);
//   const [isInvitePopupVisible, setInvitePopupVisible] = useState(false);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [isTasksCreated, setIsTasksCreated] = useState(false);

//   useEffect(() => {
//     fetchTasks();
//   }, [project._id]);

//   const handleAddTask = () => {
//     setAddTaskPopupVisible(true);
//     setInvitePopupVisible(false); // Close InviteMembersPopup if open
//   };

//   const handleCloseAddTaskPopup = () => {
//     setAddTaskPopupVisible(false);
//   };

//   const handleInviteMembers = () => {
//     setInvitePopupVisible(true);
//     setAddTaskPopupVisible(false); // Close TaskForm if open
//   };

//   const handleCloseInvitePopup = () => {
//     setInvitePopupVisible(false);
//   };

//   const handleTaskRowClick = (taskId) => {
//     setSelectedTaskId(taskId);
//     setWelcomePopupVisible(true);
//   };

//   const handleCloseWelcomePopup = () => {
//     setWelcomePopupVisible(false);
//   };

//   const handleTaskAdded = async (newTask) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/tasks`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newTask),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const existingTaskIndex = tasks.findIndex((task) => task._id === data._id);

//         if (existingTaskIndex === -1) {
//           setTasks((prevTasks) => [
//             ...prevTasks,
//             { ...data, statusIcon: newTask.statusIcon, statusColor: newTask.statusColor },
//           ]);
//           setIsTasksCreated(true); // Set to true after tasks are created
//         }

//         handleCloseAddTaskPopup();
//       } else {
//         console.error('Error adding task:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/projects/${project._id}/tasks`);
//       const data = await response.json();
//       setTasks(data);
//       if (data.length > 0) {
//         setIsTasksCreated(true); // Set to true if tasks are fetched
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   return (
//     <div className={styles.ProjectDetailsPage}>
//       {isWelcomePopupVisible && <WelcomePopup taskId={selectedTaskId} onClose={handleCloseWelcomePopup} />}
//       {isInvitePopupVisible && <InviteMembersPopup onClose={handleCloseInvitePopup} />}
//       <div className={styles.HeaderCard}>
//         <button className={styles.button} onClick={handleAddTask}>
//           Add Task
//         </button>
//         <button className={styles.invitebutton} onClick={handleInviteMembers}>
//           Invite Members
//         </button>
//       </div>
//       {isAddTaskPopupVisible && (
//         <TaskForm projectId={project._id} onClose={handleCloseAddTaskPopup} onTaskAdded={handleTaskAdded} />
//       )}
//       {isTasksCreated && (
//         <div className={styles.ProjectCard}>
//           <div>
//             {tasks.length === 0 ? (
//               <p>...</p>
//             ) : (
//               <ul>
//                 {tasks
//                   .filter((task) => task.statusIcon)
//                   .map((task, index) => (
//                     <li
//                       key={task._id}
//                       className={styles.TaskRow}
//                       onClick={() => handleTaskRowClick(task._id)}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <div>
//                         <p>{task.status}</p>
//                         {task.statusIcon && (
//                           <FontAwesomeIcon
//                             icon={task.statusIcon}
//                             style={{ color: task.statusColor, marginRight: '5px', fontSize: '15px' }}
//                           />
//                         )}
//                         <p style={{ display: 'inline-block', marginRight: '10px' }}>{task.title}</p>
//                         <p style={{ display: 'inline-block', marginRight: '10px' }}>{task.assignedTo}</p>
//                         <p style={{ display: 'inline-block', color: calculateDueDateColor(task.dueDate) }}>
//                           <FontAwesomeIcon
//                             icon={faCalendarAlt}
//                             style={{
//                               color: calculateDueDateColor(task.dueDate),
//                               marginRight: '5px',
//                               fontSize: '15px',
//                             }}
//                           />
//                           Due {task.dueDate}
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;


// ---wrking now   2 ---------------------------------------------------------

// // wrking 
// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
// import TaskForm from './TaskForm/page';
// import WelcomePopup from './WelcomePopup/page';
// import InviteMembersPopup from './InviteMembersPopup';
// import AddSubtaskPopup from './AddSubtaskPopup';
// import styles from './Details.module.css';

// const ProjectDetails = ({ project, onClose }) => {
//   const [isAddTaskPopupVisible, setAddTaskPopupVisible] = useState(false);
//   const [isInvitePopupVisible, setInvitePopupVisible] = useState(false);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [selectedTaskRowId, setSelectedTaskRowId] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [isTasksCreated, setIsTasksCreated] = useState(false);
//   const [menuStates, setMenuStates] = useState({}); // State to track menu states for each task
//   const [showOverlay, setShowOverlay] = useState(false); // State variable for overlay
//   const [isAddSubtaskPopupVisible, setAddSubtaskPopupVisible] = useState(false);
//   const overlayRef = useRef(null);
//   const taskPopupRef = useRef(null);
//   const invitePopupRef = useRef(null);

//   useEffect(() => {
//     fetchTasks();
//   }, [project._id]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (taskPopupRef.current && !taskPopupRef.current.contains(event.target)) {
//         setSelectedTaskId(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const calculateDueDateColor = (dueDate) => {
//     const currentDate = new Date();
//     const dueDateObj = new Date(dueDate);
//     const timeDifference = dueDateObj - currentDate;

//     if (timeDifference < 0) {
//       return '#FF0000'; // Set to red if due date has passed
//     } else {
//       return '#77C3EC'; // Keep the original blue color for upcoming due dates
//     }
//   };

//   const handleAddTask = () => {
//     setAddTaskPopupVisible(true);
//     setInvitePopupVisible(false);
//     setShowOverlay(true); // Show overlay when Add Task button is clicked
//   };

//   const handleInviteMembers = () => {
//     setInvitePopupVisible(true);
//     setAddTaskPopupVisible(false);
//     setShowOverlay(true); // Show overlay when Invite Members button is clicked
//   };

//   const handleCloseAddTaskPopup = () => {
//     setAddTaskPopupVisible(false);
//     setShowOverlay(false); // Hide overlay when Add Task popup is closed
//   };

//   const handleCloseInvitePopup = () => {
//     setInvitePopupVisible(false);
//     setShowOverlay(false); // Hide overlay when Invite Members popup is closed
//   };

//   const handleTaskRowClick = (taskId) => {
//     setSelectedTaskId(taskId);
//     setMenuStates((prevMenuStates) => ({
//       ...prevMenuStates,
//       [taskId]: !prevMenuStates[taskId], // Toggle menu state for the clicked task
//     }));
//   };

//   const handleCloseWelcomePopup = () => {
//     setSelectedTaskId(null);
//   };

//   const handleTaskAdded = async (newTask) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/tasks`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newTask),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const existingTaskIndex = tasks.findIndex((task) => task._id === data._id);

//         if (existingTaskIndex === -1) {
//           setTasks((prevTasks) => [
//             ...prevTasks,
//             { ...data, statusIcon: newTask.statusIcon, statusColor: newTask.statusColor },
//           ]);
//           setIsTasksCreated(true);
//         }

//         handleCloseAddTaskPopup();
//       } else {
//         console.error('Error adding task:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/projects/${project._id}/tasks`);
//       const data = await response.json();
//       setTasks(data);
//       if (data.length > 0) {
//         setIsTasksCreated(true);
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const handleAddSubTask = () => {
//     setAddSubtaskPopupVisible(true);
//     setShowOverlay(true); // Show overlay when Add Subtask button is clicked
//   };

//   const handleOverlayClick = () => {
//     if (isAddTaskPopupVisible) {
//       handleCloseAddTaskPopup();
//     }
//     if (isInvitePopupVisible) {
//       handleCloseInvitePopup();
//     }
//     if (isAddSubtaskPopupVisible) {
//       setAddSubtaskPopupVisible(false);
//       setShowOverlay(false); // Hide overlay when Add Subtask popup is closed
//     }
//   };

//   const handleCloseAddSubtaskPopup = () => {
//     setAddSubtaskPopupVisible(false);
//     setShowOverlay(false); // Hide overlay when Add Subtask popup is closed
//   };

//   const handleMenuIconClick = (event) => {
//     event.stopPropagation();
//     const taskId = event.currentTarget.dataset.taskId;

//     // Toggle menu state for the clicked task
//     setMenuStates(prevMenuStates => ({
//       ...prevMenuStates,
//       [taskId]: !prevMenuStates[taskId]
//     }));
//   };

//   const handleMenuBorderRadiusClick = (event) => {
//     event.stopPropagation();
//     const taskId = event.currentTarget.dataset.taskId;

//     // Set menu state to true for the clicked task
//     setMenuStates(prevMenuStates => ({
//       ...prevMenuStates,
//       [taskId]: true
//     }));
//   };

//   return (
//     <div className={styles.ProjectDetailsPage}>
//       {showOverlay && <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}></div>}
//       <div className={styles.HeaderCard}>
//         <button className={styles.button} onClick={handleAddTask}>
//           Add Task
//         </button>
//         <button className={styles.invitebutton} onClick={handleInviteMembers}>
//           Invite Members
//         </button>
//       </div>
//       {/* Task Popup Form */}
//       {isAddTaskPopupVisible && (
//         <div className={styles.TaskPopupContainer} ref={taskPopupRef}>
//           <TaskForm projectId={project._id} onClose={handleCloseAddTaskPopup} onTaskAdded={handleTaskAdded} />
//         </div>
//       )}
//       {/* Invite Members Popup Form */}
//       {isInvitePopupVisible && (
//         <div className={styles.InvitePopupContainer} ref={invitePopupRef}>
//           <InviteMembersPopup onClose={handleCloseInvitePopup} />
//         </div>
//       )}
//       {isTasksCreated && (
//         <div className={styles.ProjectCard}>
//           <div>
//             {tasks.length === 0 ? (
//               <p>...</p>
//             ) : (
//               <ul>
//                 {tasks
//                   .filter((task) => task.statusIcon)
//                   .map((task, index) => (
//                     <li
//                       key={task._id}
//                       className={styles.TaskRow}
//                       onClick={() => handleTaskRowClick(task._id)}
//                       onMouseEnter={() => setSelectedTaskRowId(task._id)} // Set the selected task row on hover
//                       onMouseLeave={() => setSelectedTaskRowId(null)} // Deselect the task row when the mouse leaves
//                       style={{ cursor: 'pointer' }}
//                       data-task-id={task._id} // Assign task ID to data attribute
//                     >
//                       <div>
//                         {/* Render the menu icon only if the task row is selected */}
//                         {selectedTaskRowId === task._id && (
//                           <div className={styles.MenuIcon} onClick={handleMenuIconClick} data-task-id={task._id}>
//                             <FontAwesomeIcon icon={faEllipsisV} />
//                             {menuStates[task._id] && ( // Render the add subtask button if menu state is true
//                               <div className={styles.Menu} onClick={handleMenuBorderRadiusClick} data-task-id={task._id}>
//                                 <button onClick={handleAddSubTask}>Add SubTask</button>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                         <p>{task.status}</p>
//                         {task.statusIcon && (
//                           <FontAwesomeIcon
//                             icon={task.statusIcon}
//                             style={{ color: task.statusColor, marginRight: '5px', fontSize: '15px' }}
//                           />
//                         )}
//                         <p style={{ display: 'inline-block', marginRight: '10px' }}>{task.title}</p>
//                         <p style={{ display: 'inline-block', marginRight: '10px' }}>{task.assignedTo}</p>
//                         <p style={{ display: 'inline-block', color: calculateDueDateColor(task.dueDate) }}>
//                           <FontAwesomeIcon
//                             icon={faCalendarAlt}
//                             style={{
//                               color: calculateDueDateColor(task.dueDate),
//                               marginRight: '5px',
//                               fontSize: '15px',
//                             }}
//                           />
//                           Due {task.dueDate}
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//       {isAddSubtaskPopupVisible && (
//         <div className={styles.AddSubtaskPopup}>
//           <AddSubtaskPopup onClose={handleCloseAddSubtaskPopup} />
//         </div>
//       )}
//       {selectedTaskId && (
//         <WelcomePopup taskId={selectedTaskId} onClose={handleCloseWelcomePopup} />
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;





// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
// import { AiOutlineComment } from 'react-icons/ai';
// import TaskForm from './TaskForm/page';
// import WelcomePopup from './WelcomePopup/page';
// import InviteMembersPopup from './InviteMembersPopup';
// import AddSubtaskPopup from './AddSubtaskPopup';
// import styles from './Details.module.css';

// const ProjectDetails = ({ project, onClose }) => {
//   const [isAddTaskPopupVisible, setAddTaskPopupVisible] = useState(false);
//   const [isInvitePopupVisible, setInvitePopupVisible] = useState(false);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [selectedTaskRowId, setSelectedTaskRowId] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [isTasksCreated, setIsTasksCreated] = useState(false);
//   const [menuStates, setMenuStates] = useState({});
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [isAddSubtaskPopupVisible, setAddSubtaskPopupVisible] = useState(false);
//   const [showWelcomePopup, setShowWelcomePopup] = useState(false);
//   const overlayRef = useRef(null);
//   const taskPopupRef = useRef(null);
//   const invitePopupRef = useRef(null);

//   useEffect(() => {
//     fetchTasks();
//   }, [project._id]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (taskPopupRef.current && !taskPopupRef.current.contains(event.target)) {
//         setSelectedTaskId(null);
//         setShowWelcomePopup(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const calculateDueDateColor = (dueDate) => {
//     const currentDate = new Date();
//     const dueDateObj = new Date(dueDate);
//     const timeDifference = dueDateObj - currentDate;

//     if (timeDifference < 0) {
//       return '#FF0000';
//     } else {
//       return '#77C3EC';
//     }
//   };

//   const handleAddTask = () => {
//     setAddTaskPopupVisible(true);
//     setInvitePopupVisible(false);
//     setShowOverlay(true);
//   };

//   const handleInviteMembers = () => {
//     setInvitePopupVisible(true);
//     setAddTaskPopupVisible(false);
//     setShowOverlay(true);
//   };

//   const handleCloseAddTaskPopup = () => {
//     setAddTaskPopupVisible(false);
//     setShowOverlay(false);
//   };

//   const handleCloseInvitePopup = () => {
//     setInvitePopupVisible(false);
//     setShowOverlay(false);
//   };

//   const handleTaskRowClick = (taskId) => {
//     if (selectedTaskId === taskId) {
//       setSelectedTaskId(null);
//       setShowWelcomePopup(false);
//     } else {
//       setSelectedTaskId(taskId);
//       setShowWelcomePopup(true);
//     }
//     setMenuStates((prevMenuStates) => ({
//       ...prevMenuStates,
//       [taskId]: !prevMenuStates[taskId],
//     }));
//   };

//   const handleCloseWelcomePopup = () => {
//     setSelectedTaskId(null);
//     setShowWelcomePopup(false);
//   };

//   const handleTaskAdded = async (newTask) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/tasks`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newTask),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const existingTaskIndex = tasks.findIndex((task) => task._id === data._id);

//         if (existingTaskIndex === -1) {
//           setTasks((prevTasks) => [
//             ...prevTasks,
//             { ...data, statusIcon: newTask.statusIcon, statusColor: newTask.statusColor },
//           ]);
//           setIsTasksCreated(true);
//         }

//         handleCloseAddTaskPopup();
//       } else {
//         console.error('Error adding task:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/projects/${project._id}/tasks`);
//       const data = await response.json();
//       setTasks(data);
//       if (data.length > 0) {
//         setIsTasksCreated(true);
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const handleAddSubTask = () => {
//     setAddSubtaskPopupVisible(true);
//     setShowOverlay(true);
//   };

//   const handleOverlayClick = () => {
//     if (isAddTaskPopupVisible) {
//       handleCloseAddTaskPopup();
//     }
//     if (isInvitePopupVisible) {
//       handleCloseInvitePopup();
//     }
//     if (isAddSubtaskPopupVisible) {
//       setAddSubtaskPopupVisible(false);
//       setShowOverlay(false);
//     }
//   };

//   const handleCloseAddSubtaskPopup = () => {
//     setAddSubtaskPopupVisible(false);
//     setShowOverlay(false);
//   };

//   const handleMenuIconClick = (event) => {
//     event.stopPropagation();
//     const taskId = event.currentTarget.dataset.taskId;

//     setMenuStates((prevMenuStates) => ({
//       ...prevMenuStates,
//       [taskId]: !prevMenuStates[taskId]
//     }));
//   };

//   const handleMenuBorderRadiusClick = (event) => {
//     event.stopPropagation();
//     const taskId = event.currentTarget.dataset.taskId;

//     setMenuStates((prevMenuStates) => ({
//       ...prevMenuStates,
//       [taskId]: true
//     }));
//   };

//   const handleTaskTitleClick = (taskId) => {
//     // Close the welcome popup if it's open for another task
//     if (taskId !== selectedTaskId) {
//       setSelectedTaskId(taskId);
//       setShowWelcomePopup(true);
//     } else {
//       // Toggle the welcome popup if it's already open for the clicked task
//       setShowWelcomePopup(!showWelcomePopup);
//     }
    
//     // Close the welcome popup for the previously selected task, if any
//     if (selectedTaskId && taskId !== selectedTaskId) {
//       setShowWelcomePopup(false);
//     }
//   };
  
  

//   return (
//     <div className={styles.ProjectDetailsPage}>
//       {showOverlay && <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}></div>}
//       <div className={styles.HeaderCard}>
//         <button className={styles.button} onClick={handleAddTask}>
//           Add Task
//         </button>
//         <button className={styles.invitebutton} onClick={handleInviteMembers}>
//           Invite Members
//         </button>
//       </div>
//       {isAddTaskPopupVisible && (
//         <div className={styles.TaskPopupContainer} ref={taskPopupRef}>
//           <TaskForm projectId={project._id} onClose={handleCloseAddTaskPopup} onTaskAdded={handleTaskAdded} />
//         </div>
//       )}
//       {isInvitePopupVisible && (
//         <div className={styles.InvitePopupContainer} ref={invitePopupRef}>
//           <InviteMembersPopup onClose={handleCloseInvitePopup} />
//         </div>
//       )}
//       {isTasksCreated && (
//         <div className={styles.ProjectCard}>
//           <div>
//             {tasks.length === 0 ? (
//               <p>...</p>
//             ) : (
//               <ul>
//                 {tasks
//                   .filter((task) => task.statusIcon)
//                   .map((task, index) => (
//                     <li
//                       key={task._id}
//                       className={styles.TaskRow}
//                       onClick={menuStates[task._id] ? () => handleTaskRowClick(task._id) : null}
//                       onMouseEnter={() => setSelectedTaskRowId(task._id)}
//                       onMouseLeave={() => setSelectedTaskRowId(null)}
//                       style={{ cursor: menuStates[task._id] ? 'pointer' : 'default' }}
//                       data-task-id={task._id}
//                     >
//                       <div>
//                         {selectedTaskRowId === task._id && (
//                           <div className={styles.MenuIcon} onClick={handleMenuIconClick} data-task-id={task._id}>
//                             <FontAwesomeIcon icon={faEllipsisV} />
//                             {menuStates[task._id] && (
//                               <div className={styles.Menu} onClick={handleMenuBorderRadiusClick} data-task-id={task._id}>
//                                 <button onClick={handleAddSubTask}>Add SubTask</button>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                         {task.statusIcon && (
//                           <FontAwesomeIcon
//                             icon={task.statusIcon}
//                             style={{ color: task.statusColor, marginRight: '5px', fontSize: '15px' }}
//                           />
//                         )}
//                         <p style={{ display: 'inline-block', marginRight: '10px', fontWeight: 600 , color: '#3b3a3a' }}>
//                           <a href="#" onClick={() => handleTaskTitleClick(task._id)}>{task.title}</a>
//                         </p>
//                         <p style={{ display: 'inline-block', marginRight: '10px', fontWeight: 500, color: '#757d88' }}>{task.assignedTo}</p>
//                         <p style={{ display: 'inline-block', color: calculateDueDateColor(task.dueDate) }}>
//                           <FontAwesomeIcon
//                             icon={faCalendarAlt}
//                             style={{
//                               color: calculateDueDateColor(task.dueDate),
//                               marginRight: '5px',
//                               fontSize: '15px',
//                             }}
//                           />
//                           Due {task.dueDate}
//                         </p>
                       
//                         <AiOutlineComment style={{ marginLeft: '10px', color: '#757d88', cursor: 'pointer', display: 'inline-block' }} />
//                       </div>
//                     </li>
//                   ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//       {isAddSubtaskPopupVisible && (
//         <div className={styles.AddSubtaskPopup}>
//           <AddSubtaskPopup onClose={handleCloseAddSubtaskPopup} />
//         </div>
//       )}
//       {selectedTaskId && showWelcomePopup && (
//         <WelcomePopup taskId={selectedTaskId} onClose={handleCloseWelcomePopup} />
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;

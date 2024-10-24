"use client";

import React, { useState, useEffect } from "react";
import { Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AddUserStorySubtaskForm from "../../components/dashboard/ListedTask/AddUserStorySubtaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faSave,
  faTrashAlt,
  faTimes,
  faEdit,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import AddTagForm from "./AddTagForm";

const UserStory = ({ params }) => {
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');
  const userStoryId = params?.id;
  
  const [subtasks, setSubtasks] = useState([]);
  const [showAddSubTaskForm, setShowAddSubTaskForm] = useState(false);
  const [editedSubtask, setEditedSubtask] = useState(null);
  const [editedSubtaskTitle, setEditedSubtaskTitle] = useState("");
  const [isEditingSubject, setIsEditingSubject] = useState(false);
  const [editedSubject, setEditedSubject] = useState(subject || "");
  const [showTagForm, setShowTagForm] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchSubtasks = async () => {
      if (!userStoryId) return;
      
      try {
        const response = await fetch(`http://localhost:5000/api/userstory_subtasks/${userStoryId}`);
        if (response.ok) {
          const data = await response.json();
          setSubtasks(data);
        } else {
          console.error('Failed to fetch subtasks');
        }
      } catch (error) {
        console.error('Error fetching subtasks:', error);
      }
    };

    fetchSubtasks();
  }, [userStoryId]);

  const handleOpenAddSubTaskForm = () => {
    setShowAddSubTaskForm(true);
  };

  const handleCloseAddSubTaskForm = () => {
    setShowAddSubTaskForm(false);
  };

  const handleSubtaskCreated = (newSubtask) => {
    setSubtasks([...subtasks, newSubtask]);
    handleCloseAddSubTaskForm();
  };

  const handleEditSubtask = (subtask) => {
    setEditedSubtask(subtask);
    setEditedSubtaskTitle(subtask.title);
  };

  const handleSubtaskTitleChange = (event) => {
    setEditedSubtaskTitle(event.target.value);
  };

  const handleSubtaskSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/userstory_subtasks/${editedSubtask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: editedSubtaskTitle }),
        }
      );
      if (response.ok) {
        const updatedSubtasks = subtasks.map(subtask =>
          subtask._id === editedSubtask._id
            ? { ...subtask, title: editedSubtaskTitle }
            : subtask
        );
        setSubtasks(updatedSubtasks);
        setEditedSubtask(null);
        setEditedSubtaskTitle("");
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update subtask:", errorResponse);
        alert(`Failed to update subtask: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  const handleSubtaskDelete = async (subtaskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/userstory_subtasks/${subtaskId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setSubtasks(subtasks.filter(subtask => subtask._id !== subtaskId));
      } else {
        const errorResponse = await response.json();
        console.error("Failed to delete subtask:", errorResponse);
        alert(`Failed to delete subtask: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  };

  const handleEditSubject = () => {
    setIsEditingSubject(true);
  };

  const handleSubjectChange = (event) => {
    setEditedSubject(event.target.value);
  };

  const handleSubjectSave = async () => {
    if (!userStoryId) return;
    
    try {
      const response = await fetch(
        `http://localhost:5000/api/newuserstory/${userStoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subject: editedSubject }),
        }
      );
      if (response.ok) {
        console.log("Subject updated successfully");
        alert("Subject updated successfully");
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update subject:", errorResponse);
        alert(`Failed to update subject: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error("Error updating subject:", error);
    }
    setIsEditingSubject(false);
  };

  const handleSubjectDelete = async () => {
    if (!userStoryId) return;
    
    try {
      const response = await fetch(
        `http://localhost:5000/api/newuserstory/${userStoryId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Subject deleted successfully");
        alert("Subject deleted successfully");
        window.location.reload();
      } else {
        const errorResponse = await response.json();
        console.error("Failed to delete subject:", errorResponse);
        alert(`Failed to delete subject: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const handleOpenTagForm = () => {
    setShowTagForm(true);
  };

  const handleCloseTagForm = () => {
    setShowTagForm(false);
  };

  const handleAddTag = async (tagName) => {
    try {
      // Example API call (adjust according to your backend)
      // const response = await fetch(`http://localhost:5000/api/userstory/${userStoryId}/tags`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: tagName }),
      // });
      // if (response.ok) {
      //   const newTag = await response.json();
      setTags([...tags, { id: Date.now(), name: tagName }]); // Temporary solution without backend
      // }
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      // Filter out the tag with the matching id
      const updatedTags = tags.filter((tag) => tag.id !== tagId);
      setTags(updatedTags);
      
      // If you have a backend API, uncomment and modify this section
      // const response = await fetch(`http://localhost:5000/api/userstory/${userStoryId}/tags/${tagId}`, {
      //   method: 'DELETE',
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to delete tag');
      // }
    } catch (error) {
      console.error('Error deleting tag:', error);
      // Optionally revert the state if the API call fails
      // setTags(previousTags);
    }
  };

  return (
    <div className="fixed right-0 w-full md:w-[calc(100%-200px)] h-full bg-[#c8d8e4] p-2 sm:p-4 overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex-1 mb-4 sm:mb-0">
          <div className="flex items-center mb-4">
            {isEditingSubject ? (
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <div className="col-span-9">
                    <input
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      value={editedSubject}
                      onChange={handleSubjectChange}
                      placeholder="Enter subject"
                    />
                  </div>
                  <div className="flex flex-row space-x-2 mt-2 md:mt-0">
                    <button
                      className="text-[#a09e9e] py-2 px-4 rounded hover:text-teal-400 border-2"
                      onClick={handleSubjectSave}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button
                      className="text-[#a09e9e] py-2 px-4 rounded hover:text-red-600"
                      onClick={handleSubjectDelete}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button
                      className="text-[#a09e9e] py-2 px-4 rounded hover:text-red-600"
                      onClick={() => setIsEditingSubject(false)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center w-full">
                <div className="flex items-center flex-grow">
                  <Link href={`/DetailsUserstory/${userStoryId}?subject=${encodeURIComponent(editedSubject)}`}>
                    <p className="text-lg font-semibold mr-2 cursor-pointer">
                      {editedSubject}
                    </p>
                  </Link>
                  <button
                    className="bg-gray-200 text-gray-700 py-1 px-2 rounded hover:bg-gray-300 ml-1"
                    onClick={handleEditSubject}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Story Type */}
      <div className="mb-4 sm:mb-6">
        <span className="text-gray-600 uppercase text-xl font-medium">USER STORY</span>
      </div>

      {/* Tags Section */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm flex items-center group"
            >
              {tag.name}
              <button
                onClick={() => handleDeleteTag(tag.id)}
                className="ml-2 p-1 rounded-full hover:bg-teal-200 transition-colors"
                aria-label="Remove tag"
              >
                <FontAwesomeIcon 
                  icon={faTimes} 
                  className="w-3 h-3 text-teal-600 group-hover:text-teal-800"
                />
              </button>
            </span>
          ))}
          <button
            onClick={handleOpenTagForm}
            className="flex items-center px-2 text-teal-400 hover:text-white hover:bg-teal-400 h-8 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add tag
          </button>
        </div>

        {/* Tag Form Modal */}
        {showTagForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <AddTagForm
              onAddTag={handleAddTag}
              onClose={handleCloseTagForm}
            />
          </div>
        )}
      </div>

      {/* Description Placeholder */}
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-400 italic text-sm sm:text-base">
          Empty space is so boring... go on, be descriptive...
        </p>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-lg shadow-sm w-full lg:w-[900px]">
        {/* Tasks Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b">
          <span className="font-medium">Tasks</span>
          <button 
            className="p-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition-colors"
            onClick={handleOpenAddSubTaskForm}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Tasks Content Area */}
        <div className="p-3 sm:p-4">
          {/* Subtask Form */}
          {showAddSubTaskForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 sm:p-0 md:relative md:inset-auto md:bg-transparent md:block md:mb-4">
              <div className="bg-white rounded-lg w-full max-w-lg md:w-auto md:max-w-none md:rounded-none md:bg-transparent">
                <AddUserStorySubtaskForm
                  onClose={handleCloseAddSubTaskForm}
                  userStoryId={userStoryId}
                  onSubtaskCreated={handleSubtaskCreated}
                />
              </div>
            </div>
          )}

          {/* Subtasks List */}
          <div className="space-y-2">
            {subtasks.map((subtask) => (
              <div 
                key={subtask._id} 
                className="bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors"
              >
                {editedSubtask && editedSubtask._id === subtask._id ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <input
                      type="text"
                      value={editedSubtaskTitle}
                      onChange={handleSubtaskTitleChange}
                      className="w-full sm:flex-grow px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        className="flex-1 sm:flex-none px-3 py-1.5 text-sm text-teal-600 hover:text-teal-700 font-medium"
                        onClick={handleSubtaskSave}
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button
                        className="flex-1 sm:flex-none px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 font-medium"
                        onClick={() => setEditedSubtask(null)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="font-medium text-gray-800">{subtask.title}</h4>
                    <div className="flex items-center gap-2">
                      <button 
                        className="flex-1 sm:flex-none text-sm text-gray-600 hover:text-teal-600 font-medium px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
                        onClick={() => handleEditSubtask(subtask)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="flex-1 sm:flex-none text-sm text-gray-600 hover:text-red-600 font-medium px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
                        onClick={() => handleSubtaskDelete(subtask._id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Empty State */}
            {subtasks.length === 0 && (
              <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                No tasks yet. Click the + button to add one.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStory;





// sub task to task
// ----------------

// "use client";

// import React, { useState, useEffect } from "react";
// import { Plus } from 'lucide-react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import AddUserStoryTaskForm from "../../components/dashboard/ListedTask/AddUserStoryTaskForm";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCaretDown,
//   faSave,
//   faTrashAlt,
//   faTimes,
//   faEdit,
//   faPlusCircle,
// } from "@fortawesome/free-solid-svg-icons";

// const UserStory = ({ params }) => {
//   const searchParams = useSearchParams();
//   const subject = searchParams.get('subject');
//   const userStoryId = params?.id;
  
//   const [tasks, setTasks] = useState([]);
//   const [showAddTaskForm, setShowAddTaskForm] = useState(false);
//   const [editedTask, setEditedTask] = useState(null);
//   const [editedTaskTitle, setEditedTaskTitle] = useState("");
//   const [isEditingSubject, setIsEditingSubject] = useState(false);
//   const [editedSubject, setEditedSubject] = useState(subject || "");

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (!userStoryId) return;
      
//       try {
//         const response = await fetch(`http://localhost:5000/api/userstory_tasks/${userStoryId}`);
//         if (response.ok) {
//           const data = await response.json();
//           setTasks(data);
//         } else {
//           console.error('Failed to fetch tasks');
//         }
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [userStoryId]);

//   const handleOpenAddTaskForm = () => {
//     setShowAddTaskForm(true);
//   };

//   const handleCloseAddTaskForm = () => {
//     setShowAddTaskForm(false);
//   };

//   const handleTaskCreated = (newTask) => {
//     setTasks([...tasks, newTask]);
//     handleCloseAddTaskForm();
//   };

//   const handleEditTask = (task) => {
//     setEditedTask(task);
//     setEditedTaskTitle(task.title);
//   };

//   const handleTaskTitleChange = (event) => {
//     setEditedTaskTitle(event.target.value);
//   };

//   const handleTaskSave = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/userstory_tasks/${editedTask._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ title: editedTaskTitle }),
//         }
//       );
//       if (response.ok) {
//         const updatedTasks = tasks.map(task =>
//           task._id === editedTask._id
//             ? { ...task, title: editedTaskTitle }
//             : task
//         );
//         setTasks(updatedTasks);
//         setEditedTask(null);
//         setEditedTaskTitle("");
//       } else {
//         const errorResponse = await response.json();
//         console.error("Failed to update task:", errorResponse);
//         alert(`Failed to update task: ${errorResponse.error}`);
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const handleTaskDelete = async (taskId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/userstory_tasks/${taskId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         setTasks(tasks.filter(task => task._id !== taskId));
//       } else {
//         const errorResponse = await response.json();
//         console.error("Failed to delete task:", errorResponse);
//         alert(`Failed to delete task: ${errorResponse.error}`);
//       }
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleEditSubject = () => {
//     setIsEditingSubject(true);
//   };

//   const handleSubjectChange = (event) => {
//     setEditedSubject(event.target.value);
//   };

//   const handleSubjectSave = async () => {
//     if (!userStoryId) return;
    
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/newuserstory/${userStoryId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ subject: editedSubject }),
//         }
//       );
//       if (response.ok) {
//         console.log("Subject updated successfully");
//         alert("Subject updated successfully");
//       } else {
//         const errorResponse = await response.json();
//         console.error("Failed to update subject:", errorResponse);
//         alert(`Failed to update subject: ${errorResponse.error}`);
//       }
//     } catch (error) {
//       console.error("Error updating subject:", error);
//     }
//     setIsEditingSubject(false);
//   };

//   const handleSubjectDelete = async () => {
//     if (!userStoryId) return;
    
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/newuserstory/${userStoryId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         console.log("Subject deleted successfully");
//         alert("Subject deleted successfully");
//         window.location.reload();
//       } else {
//         const errorResponse = await response.json();
//         console.error("Failed to delete subject:", errorResponse);
//         alert(`Failed to delete subject: ${errorResponse.error}`);
//       }
//     } catch (error) {
//       console.error("Error deleting subject:", error);
//     }
//   };

//   return (
//     <div className="fixed right-0 w-full md:w-[calc(100%-200px)] h-full bg-[#c8d8e4] p-2 sm:p-4 overflow-y-auto">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-4 sm:mb-6">
//         <div className="flex-1 mb-4 sm:mb-0">
//           <div className="flex items-center mb-4">
//             {isEditingSubject ? (
//               <div className="w-full">
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
//                   <div className="col-span-9">
//                     <input
//                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
//                       value={editedSubject}
//                       onChange={handleSubjectChange}
//                       placeholder="Enter subject"
//                     />
//                   </div>
//                   <div className="flex flex-row space-x-2 mt-2 md:mt-0">
//                     <button
//                       className="text-[#a09e9e] py-2 px-4 rounded hover:text-teal-400 border-2"
//                       onClick={handleSubjectSave}
//                     >
//                       <FontAwesomeIcon icon={faSave} />
//                     </button>
//                     <button
//                       className="text-[#a09e9e] py-2 px-4 rounded hover:text-red-600"
//                       onClick={handleSubjectDelete}
//                     >
//                       <FontAwesomeIcon icon={faTrashAlt} />
//                     </button>
//                     <button
//                       className="text-[#a09e9e] py-2 px-4 rounded hover:text-red-600"
//                       onClick={() => setIsEditingSubject(false)}
//                     >
//                       <FontAwesomeIcon icon={faTimes} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center w-full">
//                 <div className="flex items-center flex-grow">
//                   <Link href={`/DetailsUserstory/${userStoryId}?subject=${encodeURIComponent(editedSubject)}`}>
//                     <p className="text-lg font-semibold mr-2 cursor-pointer">
//                       {editedSubject}
//                     </p>
//                   </Link>
//                   <button
//                     className="bg-gray-200 text-gray-700 py-1 px-2 rounded hover:bg-gray-300 ml-1"
//                     onClick={handleEditSubject}
//                   >
//                     <FontAwesomeIcon icon={faEdit} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* User Story Type */}
//       <div className="mb-4 sm:mb-6">
//         <span className="text-gray-600 uppercase text-xl font-medium">USER STORY</span>
//       </div>

//       {/* Tags Section */}
//       <div className="mb-4 sm:mb-6">
//         <button className="flex items-center px-2 text-teal-400 hover:text-[#fff] hover:bg-teal-400 w-[100px] h-[4vh] rounded-md">
//           <Plus className="w-4 h-4 mr-1" />
//           Add tag
//         </button>
//       </div>

//       {/* Description Placeholder */}
//       <div className="mb-4 sm:mb-6">
//         <p className="text-gray-400 italic text-sm sm:text-base">
//           Empty space is so boring... go on, be descriptive...
//         </p>
//       </div>

//       {/* Tasks Section */}
//       <div className="bg-white rounded-lg shadow-sm w-full lg:w-[900px]">
//         {/* Tasks Header */}
//         <div className="flex justify-between items-center p-3 sm:p-4 border-b">
//           <span className="font-medium">Tasks</span>
//           <button 
//             className="p-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition-colors"
//             onClick={handleOpenAddTaskForm}
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Tasks Content Area */}
//         <div className="p-3 sm:p-4">
//           {/* Task Form */}
//           {showAddTaskForm && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 sm:p-0 md:relative md:inset-auto md:bg-transparent md:block md:mb-4">
//               <div className="bg-white rounded-lg w-full max-w-lg md:w-auto md:max-w-none md:rounded-none md:bg-transparent">
//                 <AddUserStoryTaskForm
//                   onClose={handleCloseAddTaskForm}
//                   userStoryId={userStoryId}
//                   onTaskCreated={handleTaskCreated}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Tasks List */}
//           <div className="space-y-2">
//             {tasks.map((task) => (
//               <div 
//                 key={task._id} 
//                 className="bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors"
//               >
//                 {editedTask && editedTask._id === task._id ? (
//                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//                     <input
//                       type="text"
//                       value={editedTaskTitle}
//                       onChange={handleTaskTitleChange}
//                       className="w-full sm:flex-grow px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
//                     />
//                     <div className="flex gap-2 w-full sm:w-auto">
//                       <button
//                         className="flex-1 sm:flex-none px-3 py-1.5 text-sm text-teal-600 hover:text-teal-700 font-medium"
//                         onClick={handleTaskSave}
//                       >
//                         <FontAwesomeIcon icon={faSave} />
//                       </button>
//                       <button
//                         className="flex-1 sm:flex-none px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 font-medium"
//                         onClick={() => setEditedTask(null)}
//                       >
//                         <FontAwesomeIcon icon={faTimes} />
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                     <h4 className="font-medium text-gray-800">{task.title}</h4>
//                     <div className="flex items-center gap-2">
//                       <button 
//                         className="flex-1 sm:flex-none text-sm text-gray-600 hover:text-teal-600 font-medium px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
//                         onClick={() => handleEditTask(task)}
//                       >
//                         <FontAwesomeIcon icon={faEdit} />
//                       </button>
//                       <button 
//                         className="flex-1 sm:flex-none text-sm text-gray-600 hover:text-red-600 font-medium px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
//                         onClick={() => handleTaskDelete(task._id)}
//                       >
//                         <FontAwesomeIcon icon={faTrashAlt} />
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Empty State */}
//             {tasks.length === 0 && (
//               <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
//                 No tasks yet. Click the + button to add one.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserStory;






import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglass,
  faSpinner,
  faCheckCircle,
  faTimes,
  faPlusCircle,
  faPlus,
  faCalendarAlt,
  faEdit,
  faSave,
  faTrashAlt,
  faUserCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { AiOutlineComment } from "react-icons/ai";
import { Plus } from 'lucide-react';

import TaskForm from "./TaskPageForm";
import TextField from "@mui/material/TextField";
import AddSubtaskForm from "./AddSubtaskForm"; // Import the AddSubtaskForm component

export default function ViewDetails({ project, onClose, onBid }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskRowId, setSelectedTaskRowId] = useState(null);
  const [menuStates, setMenuStates] = useState({});
  const [showAddSubtaskForm, setShowAddSubtaskForm] = useState(false);
  const [quickTaskTitle, setQuickTaskTitle] = useState("");
  const [showQuickTaskForm, setShowQuickTaskForm] = useState(false);
  const [isHoveringProjectName, setIsHoveringProjectName] = useState(false);
  const [isEditingProjectName, setIsEditingProjectName] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(project.projectName);
  const [currentProjectName, setCurrentProjectName] = useState(project.projectName);
  const [subject, setSubject] = useState("");
  const [subtasks, setSubtasks] = useState({});
  const [selectedTaskSubtasks, setSelectedTaskSubtasks] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [showAssignDropdown, setShowAssignDropdown] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
    { id: 4, name: "Alice Williams" },
    { id: 5, name: "Charlie Brown" },
  ]);

  const dropdownRef = useRef(null);

  const handleBidSubmit = () => {
    if (onBid) {
      onBid(project);
    }
  };

  const calculateDueDateColor = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDifference = dueDateObj - currentDate;

    if (timeDifference < 0) {
      return "#FF0000";
    } else {
      return "#77C3EC";
    }
  };

  const handleAddTask = () => {
    if (!showQuickTaskForm) {
      setShowTaskForm(true);
    }
  };

  const handleTaskButtonClick = () => {
    setShowTaskForm(true);
  };

  const handleTaskFormClose = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    setEditingSubtask(null);
  };

  const handleQuickTaskAddClose = () => {
    setShowQuickTaskForm(false);
  };

  const handleTaskAdded = (taskData, taskId) => {
    if (taskId) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? taskData : task))
      );
    } else {
      // Add new task
      setTasks((prevTasks) => [...prevTasks, taskData]);
    }
    fetchProjectSubTasks(taskData._id); // Fetch subtasks for the newly added task
    window.location.reload(); // Refresh the page after editing the task
  };

  const handleTaskClick = (task) => {
    if (task.assignedTo === "Unassigned") {
      setShowAssignDropdown(task._id);
    } else {
      console.log("Clicked assigned task:", task);
    }
  };

  const handleAssign = async (taskId, assignee) => {
    try {
      // Update the state immediately
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, assignedTo: assignee } : task
        )
      );

      // Log the request payload
      const requestPayload = {
        assignedTo: assignee,
        projectId: project._id, // Include the projectId field
      };
      console.log("Request Payload:", requestPayload);

      // Make the API call to update the task assignment on the server
      const response = await fetch(`http://localhost:5000/api/project_tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        console.error("Failed to assign task");
        // Revert the state if the API call fails
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, assignedTo: "Unassigned" } : task
          )
        );
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      // Revert the state if the API call fails
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, assignedTo: "Unassigned" } : task
        )
      );
    } finally {
      setShowAssignDropdown(null);
    }
  };

  const handleAdd = () => {
    if (!showTaskForm && !showAddSubtaskForm) {
      setShowQuickTaskForm(true);
    }
  };

  const handleProjectNameMouseEnter = () => {
    setIsHoveringProjectName(true);
  };

  const handleProjectNameMouseLeave = () => {
    setIsHoveringProjectName(false);
  };

  const handleEditProjectName = () => {
    setIsEditingProjectName(true);
  };

  const handleProjectNameChange = (e) => {
    setEditedProjectName(e.target.value);
  };

  const handleProjectNameSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${project._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectName: editedProjectName }),
        }
      );

      if (response.ok) {
        setCurrentProjectName(editedProjectName);
        setIsEditingProjectName(false);
        localStorage.setItem(`projectName_${project._id}`, editedProjectName); // Store the project name in local storage
      } else {
        console.error("Failed to update project name");
      }
    } catch (error) {
      console.error("Error updating project name:", error);
    }
  };

  const handleProjectNameDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${project._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        window.location.href = '/dashboard';
        onClose();
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const getProgressIcon = (progress) => {
    switch (progress) {
      case "No Progress":
        return <FontAwesomeIcon icon={faHourglass} className="text-gray-400 text-lg" />;
      case "In Progress":
        return <FontAwesomeIcon icon={faSpinner} className="text-orange-400 text-lg" />;
      case "Complete":
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-lg" />;
      default:
        return null;
    }
  };

  const handleTaskTitleClick = (taskId) => {
    console.log(`Task title clicked: ${taskId}`);
  };

  const handleTaskRowClick = async (taskId) => {
    setMenuStates((prevStates) => ({
      ...prevStates,
      [taskId]: !prevStates[taskId],
    }));
    if (!subtasks[taskId]) {
      await fetchProjectSubTasks(taskId);
    }
  };

  const handleAddSubtaskButtonClick = () => {
    setShowAddSubtaskForm(true);
  };

  const handleCloseAddSubtaskForm = () => {
    setShowAddSubtaskForm(false);
    setEditingSubtask(null);
  };

  const handleSubtaskCreated = (subtask) => {
    setSubtasks((prevSubtasks) => ({
      ...prevSubtasks,
      [subtask.taskId]: [...(prevSubtasks[subtask.taskId] || []), subtask],
    }));
    setNotification({ type: "success", message: "Subtask created successfully!" });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubtaskUpdated = (subtaskId, updatedSubtask) => {
    setSubtasks((prevSubtasks) => {
      const updatedSubtasks = { ...prevSubtasks };
      if (!updatedSubtasks[updatedSubtask.taskId]) {
        updatedSubtasks[updatedSubtask.taskId] = [];
      }
      updatedSubtasks[updatedSubtask.taskId] = updatedSubtasks[updatedSubtask.taskId].map((subtask) =>
        subtask._id === subtaskId ? updatedSubtask : subtask
      );
      return updatedSubtasks;
    });
    setNotification({ type: "success", message: "Subtask updated successfully!" });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleQuickTaskTitleChange = (event) => {
    setQuickTaskTitle(event.target.value);
  };

  const handleOpenAddSubtaskForm = () => {
    setShowAddSubtaskForm(true);
  };

  const handleQuickTaskAdd = async () => {
    if (subject.trim() === "" || !project._id) return;

    const newTask = {
      title: subject,
      assignedTo: "Unassigned",
      dueDate: "No Due Date",
      statusIcon: faHourglass,
      statusColor: "#aaa",
      projectId: project._id,
    };

    try {
      const response = await fetch("http://localhost:5000/api/project_tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const data = await response.json();
        handleTaskAdded(data, null); // Add the new task to the state
      } else {
        console.error("Failed to add quick task");
      }
    } catch (error) {
      console.error("Error adding quick task:", error);
    }

    setSubject("");
    setShowQuickTaskForm(false);
  };

  const statusOptions = [
    { value: "No Progress", label: "No Progress" },
    { value: "In Progress", label: "In Progress" },
    { value: "Complete", label: "Complete" },
  ];

  useEffect(() => {
    const storedProjectName = localStorage.getItem(`projectName_${project._id}`);
    if (storedProjectName) {
      setCurrentProjectName(storedProjectName);
      setEditedProjectName(storedProjectName);
    } else {
      setCurrentProjectName(project.projectName);
      setEditedProjectName(project.projectName);
    }
    fetchProjectTasks(project._id);
  }, [project]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAssignDropdown(null);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchProjectTasks = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/project_tasks/${projectId}`
      );
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        data.forEach((task) => fetchProjectSubTasks(task._id));
      } else {
        console.error("Failed to fetch project tasks");
      }
    } catch (error) {
      console.error("Error fetching project tasks:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus, projectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/project_tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          projectId: projectId,  // Include projectId in the request body
        }),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
        setOpenDropdownId(null); // Close the dropdown immediately after updating the status
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDropdownClick = (taskId) => {
    setOpenDropdownId(openDropdownId === taskId ? null : taskId);
  };

  const fetchProjectSubTasks = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/project_subtasks/${taskId}`
      );
      if (response.ok) {
        const data = await response.json();
        setSubtasks((prevSubtasks) => ({
          ...prevSubtasks,
          [taskId]: data,
        }));
      } else {
        console.error("Failed to fetch project subtasks");
      }
    } catch (error) {
      console.error("Error fetching project subtasks:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/project_tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== taskId));
        deleteSubtasksForTask(taskId); // Remove subtasks for the deleted task
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditSubtask = (subtaskId) => {
    const subtask = getSubtaskDetails(subtaskId);
    if (subtask) {
      setEditingSubtask(subtask);
      setShowAddSubtaskForm(true);
    }
  };

  const handleDeleteSubtask = async (subtaskId) => {
    const confirmed = window.confirm("Are you sure you want to delete this subtask?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/project_subtasks/${subtaskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSubtasks(prevSubtasks => {
          const updatedSubtasks = { ...prevSubtasks };
          Object.keys(updatedSubtasks).forEach(taskId => {
            updatedSubtasks[taskId] = updatedSubtasks[taskId].filter(subtask => subtask._id !== subtaskId);
          });
          return updatedSubtasks;
        });
        setNotification({ type: "success", message: "Subtask deleted successfully!" });
        setTimeout(() => setNotification(null), 3000);
      } else {
        console.error("Failed to delete subtask");
      }
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  };

  const getSubtaskDetails = (subtaskId) => {
    for (const taskId in subtasks) {
      const taskSubtasks = subtasks[taskId];
      const subtask = taskSubtasks.find(subtask => subtask._id === subtaskId);
      if (subtask) {
        return subtask;
      }
    }
    return null;
  };

  const deleteSubtasksForTask = (taskId) => {
    setSubtasks(prevSubtasks => {
      const updatedSubtasks = { ...prevSubtasks };
      delete updatedSubtasks[taskId];
      return updatedSubtasks;
    });
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col p-4 bg-[#c8d8e4] min-h-screen">


<div className="bg-white rounded-lg p-4 mb-4 w-full card flex justify-end items-center">        <button
          className="bg-[#007bff] text-white py-2 px-4 rounded hover:bg-[#0056b3]"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 w-full max-w-6xl mx-auto shadow-lg overflow-y-auto md:overflow-y-visible max-h-[800px]">
        <div className="flex flex-col items-center mb-4">
          {isEditingProjectName ? (
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="col-span-9">
                  <TextField
                    className="w-full"
                    value={editedProjectName}
                    onChange={handleProjectNameChange}
                    placeholder="Project Name"
                    variant="standard"
                    InputProps={{
                      style: { width: "100%" },
                    }}
                  />
                </div>
                <div className="flex flex-row space-x-2 mt-2 md:mt-0">
                  <button
                    className="text-[#a09e9e] py-2 px-4 rounded hover:text-[#007bff]"
                    onClick={handleProjectNameSave}
                  >
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                  <button
                    className="text-[#a09e9e] py-2 px-4 rounded hover:text-red-600"
                    onClick={handleProjectNameDelete}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button
                    className="text-[#a09e9e] py-2 px-4 rounded hover:text-red-600"
                    onClick={() => setIsEditingProjectName(false)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center w-full"
              onMouseEnter={handleProjectNameMouseEnter}
              onMouseLeave={handleProjectNameMouseLeave}
            >
              <p className="text-lg font-semibold mr-2">{currentProjectName}</p>
              {isHoveringProjectName && (
                <button
                  className="bg-gray-200 text-gray-700 py-1 px-2 rounded hover:bg-gray-300"
                  onClick={handleEditProjectName}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
            </div>
          )}
        </div>

        <p className="mb-4">{project.projectDescription}</p>

        {showTaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
              <TaskForm
                projectId={project._id}
                task={editingTask}
                onClose={handleTaskFormClose}
                onTaskAdded={handleTaskAdded}
                onSubtaskCreated={handleSubtaskCreated}
              />
            </div>
          </div>
        )}

        {showAddSubtaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
              <AddSubtaskForm
                taskId={selectedTaskRowId}
                subtask={editingSubtask}
                onClose={handleCloseAddSubtaskForm}
                onSubtaskCreated={handleSubtaskCreated}
                onSubtaskUpdated={handleSubtaskUpdated}
              />
            </div>
          </div>
        )}

        {notification && (
          <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            <p className="text-white">{notification.message}</p>
          </div>
        )}

{/* <div className="bg-gray-100 rounded-lg p-4"> */}

<div className="bg-gray-100 rounded-lg p-4 h-[calc(100vh-300px)] md:h-auto"><ul className="space-y-2">
            {tasks
              .filter((task) => task.statusIcon)
              .map((task) => (
                <li
                  key={task._id}
                  className={`rounded-lg ${
                    menuStates[task._id] ? "bg-gray-200" : "bg-white"
                  } transition-colors duration-200 ease-in-out`}
                  onClick={() => handleTaskRowClick(task._id)}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center py-2 px-4">
                    <div className="flex items-center flex-grow mb-2 sm:mb-0">
                      <span className="mr-2 text-gray-400 cursor-move text-lg">⠿</span>
                      <div
                        className="flex items-center mr-4 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDropdownClick(task._id);
                        }}
                      >
                        {getProgressIcon(task.status)}
                        {openDropdownId === task._id && (
                          <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task._id, e.target.value, project._id)}
                            className="ml-2 p-1 rounded border"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                      <p className="mr-4 font-semibold text-gray-800">
                        {task.title}
                      </p>
                      <div className="relative">
                        <p
                          className={`mr-4 font-semibold ${
                            task.assignedTo === "Unassigned"
                              ? "text-gray-400 cursor-pointer hover:text-gray-600"
                              : "text-gray-600"
                          } mb-1 sm:mb-0 flex items-center`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskClick(task);
                          }}
                        >
                          <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                          {task.assignedTo}
                        </p>

                        {showAssignDropdown === task._id && (
                          <div
  ref={dropdownRef}
  className="absolute z-40 mt-1 w-full sm:w-[280px] h-[28vh] bg-white rounded-md py-1 border border-gray-200 shadow-lg"
  onClick={(e) => e.stopPropagation()}
>
                            <div className="p-2">
                              <TextField
                                label="Search"
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                                variant="outlined"
                                fullWidth
                              />
                            </div>
                            {filteredTeamMembers.map((member) => (
                              <button
                                key={member.id}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleAssign(task._id, member.name)}
                              >
                                {member.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div
                        className="flex items-center"
                        style={{
                          color: calculateDueDateColor(task.dueDate),
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 text-sm" />
                        <span className="font-semibold text-sm">
                          Due {task.dueDate}
                        </span>
                      </div>
                      <AiOutlineComment
                        className="ml-4 text-gray-600 cursor-pointer text-lg hidden sm:block"
                      />
                    </div>

                    <div className="flex items-center mt-2 sm:mt-0 sm:ml-auto">
                      <button
                        className="p-1 rounded hover:bg-gray-200 ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTask(task);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} className="text-gray-600" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-gray-200 ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task._id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="text-gray-600" />
                      </button>
                      <button
                        className="p-1.5 bg-teal-400 text-white ml-2 rounded-md hover:bg-teal-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTaskRowId(task._id);
                          handleOpenAddSubtaskForm();
                        }}
                      >
            <Plus className="w-4 h-4" />
            </button>

                      <AiOutlineComment
                        className="ml-4 text-gray-600 cursor-pointer text-lg block sm:hidden"
                      />
                    </div>
                  </div>

                  {subtasks[task._id] && (
                    <ul className="pl-12 pb-2">
                      {subtasks[task._id].map((subtask) => (
                        <li
                          key={subtask._id}
                          className="flex items-center font-semibold text-gray-500 mt-2"
                        >
                          <span className="mr-2 text-gray-400 cursor-move text-sm">⠿</span>
                          {subtask.title}
                          <button
                            className="p-1 rounded hover:bg-gray-200 ml-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditSubtask(subtask._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} className="text-gray-600 text-sm" />
                          </button>

                          <button
                            className="p-1 rounded hover:bg-gray-200 ml-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSubtask(subtask._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} className="text-gray-600 text-sm" />
                          </button>

                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>

        {!showQuickTaskForm && (
          <button
            className="text-gray-500 py-2 px-4 rounded hover:text-blue-500 flex items-center mt-4"
            onClick={handleAdd}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Task
          </button>
        )}

        {showQuickTaskForm && (
          <div className="mt-4">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-grow mb-2 md:mb-0 md:mr-2">
                <TextField
                  label="Task Name"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex flex-row space-x-2 mt-2 md:mt-0">
                <button
                  className="text-[#a09e9e] py-2 px-4 rounded hover:text-[#007bff]"
                  onClick={handleQuickTaskAdd}
                >
                    <FontAwesomeIcon icon={faSave} />
                    </button>
                <button
                  className="text-[#a09e9e] py-2 px-4 rounded hover:text-red-600"
                  onClick={handleQuickTaskAddClose}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>


      
    </div>
  );
}





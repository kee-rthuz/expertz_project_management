"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faSave,
  faTrashAlt,
  faTimes,
  faEdit,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import AddUserStorySubtaskForm from "./AddUserStorySubtaskForm";

const UserStoryCard = ({
  user_id,
  subject,
  initialStatus,
  points,
  subtasks,
  onSubtaskCreated,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(initialStatus);
  const [showAddSubTaskForm, setShowAddSubTaskForm] = useState(false);
  const [isEditingSubject, setIsEditingSubject] = useState(false);
  const [editedSubject, setEditedSubject] = useState(subject);
  const [editedSubtask, setEditedSubtask] = useState(null);
  const [editedSubtaskTitle, setEditedSubtaskTitle] = useState("");

  const open = Boolean(anchorEl);

  useEffect(() => {
    setEditedSubject(subject);
  }, [subject]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    console.log("newSattus = ", status);
    console.log("newSattus 2 = ", newStatus);
    handleClose();

    try {
      const response = await fetch(
        `http://localhost:5000/api/newuserstory/${user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        console.log("Status updated successfully");
        alert("Status updated successfully");
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update status:", errorResponse);
        alert(`Failed to update status: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEditSubject = () => {
    setIsEditingSubject(true);
  };

  const handleSubjectChange = (event) => {
    setEditedSubject(event.target.value);
  };

  const handleSubjectSave = async () => {
    console.log("Edited subject:", editedSubject);
    try {
      const response = await fetch(
        `http://localhost:5000/api/newuserstory/${user_id}`,
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
    console.log("Deleting subject:", user_id);
    try {
      const response = await fetch(
        `http://localhost:5000/api/newuserstory/${user_id}`,
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

  const handleOpenAddSubTaskForm = () => {
    setShowAddSubTaskForm(true);
  };

  const handleCloseAddSubTaskForm = () => {
    setShowAddSubTaskForm(false);
  };

  const handleSubtaskCreated = (newSubtask) => {
    setSubtasks([...subtasks, newSubtask]);
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
        console.log("Subtask updated successfully");
        alert("Subtask updated successfully");
        setEditedSubtask(null);
        setEditedSubtaskTitle("");
        window.location.reload();
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
        console.log("Subtask deleted successfully");
        alert("Subtask deleted successfully");
        window.location.reload();
      } else {
        const errorResponse = await response.json();
        console.error("Failed to delete subtask:", errorResponse);
        alert(`Failed to delete subtask: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-2 w-full sm:w-3/4 ml-1 my-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex-1 mb-4 sm:mb-0">
          <div className="flex items-center mb-4">
            {isEditingSubject ? (
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <div className="col-span-9">
                    <TextField
                      className="w-full"
                      value={editedSubject}
                      onChange={handleSubjectChange}
                      placeholder="Text"
                      variant="standard"
                      InputProps={{
                        style: { width: "100%" },
                      }}
                    />
                  </div>
                  <div className="flex flex-row space-x-2 mt-2 md:mt-0">
                    <button
                      className="text-[#a09e9e] py-2 px-4 rounded hover:text-[#007bff]"
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
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />

                <div className="flex items-center flex-grow">
                  <p className="text-lg font-semibold mr-2">{editedSubject}</p>
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
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div
            className="relative cursor-pointer bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {status}
            <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleStatusChange("New")}>New</MenuItem>
            <MenuItem onClick={() => handleStatusChange("Ready")}>
              Ready
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("In progress")}>
              In progress
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("Ready for test")}>
              Ready for test
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("Done")}>Done</MenuItem>
            <MenuItem onClick={() => handleStatusChange("Archived")}>
              Archived
            </MenuItem>
          </Menu>
          <span className="text-sm font-semibold">{points}</span>

          <div className="flex items-center ml-auto">
            <button
              className="py-1 px-2 rounded hover:bg-[#ccc] ml-2"
              onClick={handleOpenAddSubTaskForm}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {showAddSubTaskForm && (
        <div className="fixed inset-0 bg-black z-10 bg-opacity-50 flex justify-center items-center">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full mx-4"
            style={{ maxWidth: "800px" }}
          >
            <AddUserStorySubtaskForm
              onClose={handleCloseAddSubTaskForm}
              userStoryId={user_id}
              onSubtaskCreated={handleSubtaskCreated}
            />
          </div>
        </div>
      )}
      {/* Render subtasks */}
      <div className="ml-4 mt-2">
        {subtasks.map((subtask) => (
          <div key={subtask._id} className="bg-gray-100 p-2 rounded mb-2">
            {editedSubtask && editedSubtask._id === subtask._id ? (
              <div className="flex items-center">
                <TextField
                  value={editedSubtaskTitle}
                  onChange={handleSubtaskTitleChange}
                  variant="outlined"
                  size="small"
                  className="flex-grow mr-2"
                />
                <button
                  className="text-[#a09e9e] py-2 px-4 rounded hover:text-[#007bff]"
                  onClick={handleSubtaskSave}
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button
                  className="text-[#a09e9e] py-2 px-4 rounded hover:text-red-600"
                  onClick={() => setEditedSubtask(null)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{subtask.title}</h4>
                <div className="flex space-x-2">

                  <button className="p-1 rounded hover:bg-gray-300 ml-2">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="cursor-pointer text-gray-600"
                      onClick={() => handleEditSubtask(subtask)}
                    />
                    </button>

                  <button className="p-1 rounded hover:bg-gray-300 ml-2">
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="cursor-pointer text-gray-600 "
                      onClick={() => handleSubtaskDelete(subtask._id)}
                    />
                  </button>

                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStoryCard;

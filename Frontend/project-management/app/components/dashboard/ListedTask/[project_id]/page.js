'use client'

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPaperclip,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import UserStoryCard from "../UserStoryCard";
import { useParams } from 'next/navigation';

const ListedTask = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("New");
  const [points, setPoints] = useState({
    ux: 0,
    design: 0,
    front: 0,
    back: 0,
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [createdUserStories, setCreatedUserStories] = useState([]);
  const [subtasks, setSubtasks] = useState({});
  const params = useParams();
  const projectId = params.project_id;

  useEffect(() => {
    if (projectId) {
      fetchUserStories(projectId);
    }
  }, [projectId]);

  const fetchUserStories = async (project_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/newuserstory?project_id=${project_id}`);
      const data = await response.json();
      if (response.ok) {
        setCreatedUserStories(data);
        data.forEach((userStory) => {
          fetchUserStorySubTasks(userStory.user_id);
        });
      } else {
        console.error("Error fetching user stories:", data);
      }
    } catch (error) {
      console.error("Error fetching user stories:", error);
    }
  };

  const fetchUserStorySubTasks = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/userstory_subtasks/${user_id}`);
      if (response.ok) {
        const data = await response.json();
        setSubtasks((prevSubtasks) => ({
          ...prevSubtasks,
          [user_id]: data,
        }));
      } else {
        console.error("Failed to fetch project subtasks");
      }
    } catch (error) {
      console.error("Error fetching project subtasks:", error);
    }
  };

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handlePointChange = (field, value) => {
    setPoints((prevPoints) => ({
      ...prevPoints,
      [field]: value,
    }));
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const handleCreateUserStory = async () => {
    const newUserStory = {
      user_id: Date.now(),
      project_id: projectId,
      subject,
      description,
      tags,
      assignedTo,
      status,
      points: points.ux + points.design + points.front + points.back,
    };

    try {
      const response = await fetch("http://localhost:5000/api/newuserstory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserStory),
      });
      const data = await response.json();
      if (response.ok) {
        setCreatedUserStories((prevUserStories) => [...prevUserStories, data]);
        resetForm();
        window.alert("User story successfully saved!");
      } else {
        console.error("Error creating user story:", data);
      }
    } catch (error) {
      console.error("Error creating user story:", error);
    }
  };

  const resetForm = () => {
    setSubject("");
    setDescription("");
    setTags([]);
    setTagInput("");
    setAssignedTo("");
    setStatus("New");
    setPoints({
      ux: 0,
      design: 0,
      front: 0,
      back: 0,
    });
    setShowOverlay(false);
  };

  const handleEditSubtask = (subtaskId) => {
    console.log("Edit subtask:", subtaskId);
    // Implement edit subtask logic here
  };

  const handleDeleteSubtask = (subtaskId) => {
    console.log("Delete subtask:", subtaskId);
    // Implement delete subtask logic here
  };

  return (
    <div className="fixed right-0 w-[calc(100%-200px)] h-full bg-[#c8d8e4] p-4 overflow-y-auto md:w-[calc(100%-200px)] md:right-0 w-full right-0">
      <div className="bg-white rounded-lg p-4 mb-4 w-full card flex justify-end items-center">
        <button
          className="bg-[#007bff]  text-white py-2 px-4 rounded hover:bg-[#0056b3]"
          onClick={toggleOverlay}
        >
          User Story
        </button>
      </div>

      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg relative flex flex-col max-h-[80vh] overflow-y-auto w-full max-w-md md:max-w-2xl">
            <div>
              <h3 className="text-lg font-semibold mb-4">New user story</h3>
              <div className="grid grid-cols-1 gap-4">
                <TextField
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <div className="flex">
                  <TextField
                    label="Add tag"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    variant="outlined"
                    size="small"
                    className="flex-grow"
                  />
                  <Button
                    variant="contained"
                    onClick={addTag}
                    style={{ backgroundColor: "#000", color: "white" }}
                    className="ml-2"
                  >
                    +
                  </Button>
                </div>
                <div className="flex flex-wrap -m-1">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 rounded-full px-2 py-1 m-1 flex items-center"
                    >
                      {tag}
                      <span
                        className="ml-2 cursor-pointer"
                        onClick={() => handleRemoveTag(index)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField
                    label="Start Date"
                    type="date"
                    name="startDate"
                    onChange={handleTagInputChange}
                    required
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Assigned To"
                    type="text"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                </div>

                <div>
                  <span className="block mb-2">POINTS</span>
                  <div className="flex flex-wrap gap-4">
                    {['ux', 'design', 'front', 'back'].map((field) => (
                      <div key={field} className="flex items-center">
                        <span className="mr-2">{field.toUpperCase()}</span>
                        <Select
                          value={points[field]}
                          onChange={(e) => handlePointChange(field, e.target.value)}
                          variant="outlined"
                          size="small"
                        >
                          {[0, 0.5, 1, 2, 3, 5, 8, 10, 13, 20, 40].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <span className="mr-2">Total</span>
                      <Select
                        value={Object.values(points).reduce((a, b) => a + b, 0)}
                        variant="outlined"
                        size="small"
                        disabled
                      >
                        <MenuItem value={Object.values(points).reduce((a, b) => a + b, 0)}>
                          {Object.values(points).reduce((a, b) => a + b, 0)}
                        </MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={toggleOverlay}
                    style={{
                      fontSize: "16px",
                      margin: "4px 2px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "#000",
                      fontSize: "16px",
                      color: "white",
                      margin: "4px 2px",
                    }}
                    onClick={handleCreateUserStory}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {createdUserStories.map((userStory) => (
        <UserStoryCard
          key={userStory.user_id}
          user_id={userStory.user_id}
          subject={userStory.subject}
          description={userStory.description}
          tags={userStory.tags}
          assignedTo={userStory.assignedTo}
          initialStatus={userStory.status}
          points={userStory.points}
          subtasks={subtasks[userStory.user_id] || []}
        >
          {subtasks[userStory.user_id] &&
            subtasks[userStory.user_id].map((subtask) => (
              <div key={subtask.user_id} className="ml-4 mt-2">
                <div className="bg-gray-100 p-2 rounded flex items-center justify-between">
                  <h4>{subtask.title}</h4>
                  <div className="flex space-x-2">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleEditSubtask(subtask.user_id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDeleteSubtask(subtask.user_id)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </UserStoryCard>
      ))}
    </div>
  );
};

export default ListedTask;
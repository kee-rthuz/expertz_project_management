import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddSubtaskForm = ({ onClose, taskId, subtask, onSubtaskCreated, onSubtaskUpdated }) => {
  const [title, setTitle] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState(taskId);

  useEffect(() => {
    if (subtask) {
      setTitle(subtask.title);
      setCurrentTaskId(subtask.taskId);
    }
  }, [subtask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        subtask ? `http://localhost:5000/api/project_subtasks/${subtask._id}` : `http://localhost:5000/api/project_subtasks/`,
        {
          method: subtask ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, taskId: currentTaskId }),
        }
      );

      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        alert("Submitted successfully");
        console.log("Subtask updated/created:", data);
        if (subtask) {
          onSubtaskUpdated(subtask._id, data);
        } else {
          onSubtaskCreated(data);
        }
        onClose();
      } else {
        alert(`Failed to submit: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating/updating Subtask:", error);
      alert("An error occurred");
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{subtask ? "Edit SubTask" : "Add SubTask"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="Task Title"
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
            className="w-full"
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outlined"
            style={{
              fontSize: "16px",
              margin: "4px 2px",
            }}
            onClick={handleCancel}
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
          >
            {subtask ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSubtaskForm;

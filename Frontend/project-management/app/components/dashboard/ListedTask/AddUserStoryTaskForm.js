import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddUserStoryTaskForm = ({ onClose, userStoryId, onTaskCreated }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/userstory_tasks/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, user_id: userStoryId }), // Use userStoryId instead of id
        }
      );

      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        alert("Submitted successfully");
        console.log("Task added:", data);

        onTaskCreated(data);
        onClose();
      } else {
        alert(`Failed to submit: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating Task:", error);
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
      <h3 className="text-lg font-bold mb-4">Add Task</h3>
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
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUserStoryTaskForm;

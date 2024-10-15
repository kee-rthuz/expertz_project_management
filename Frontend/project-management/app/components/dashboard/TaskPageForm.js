import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass, faCheckCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

const getStatusColor = (statusIcon) => {
  switch (statusIcon) {
    case faHourglass:
      return "#aaa";
    case faSpinner:
      return "orange";
    case faCheckCircle:
      return "green";
    default:
      return "";
  }
};

const TaskForm = ({ projectId, task, onClose, onTaskAdded }) => {
  const [selectedStatusIcon, setSelectedStatusIcon] = useState(faHourglass);
  const [taskData, setTaskData] = useState({
    title: "",
    assignedTo: "",
    startDate: "",
    dueDate: "",
    status: "No Progress",
  });

  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title,
        assignedTo: task.assignedTo,
        startDate: task.startDate,
        dueDate: task.dueDate,
        status: task.status,
      });

      switch (task.status) {
        case "No Progress":
          setSelectedStatusIcon(faHourglass);
          break;
        case "In Progress":
          setSelectedStatusIcon(faSpinner);
          break;
        case "Complete":
          setSelectedStatusIcon(faCheckCircle);
          break;
        default:
          break;
      }
    }
  }, [task]);

  const handleInputChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "status") {
      switch (e.target.value) {
        case "No Progress":
          setSelectedStatusIcon(faHourglass);
          break;
        case "In Progress":
          setSelectedStatusIcon(faSpinner);
          break;
        case "Complete":
          setSelectedStatusIcon(faCheckCircle);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const statusColor = getStatusColor(selectedStatusIcon);

    const taskPayload = {
      projectId,
      ...taskData,
      statusIcon: selectedStatusIcon.iconName,
      statusColor,
    };

    try {
      let response;
      if (task) {
        // Update existing task
        response = await fetch(`http://localhost:5000/api/project_tasks/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskPayload),
        });

        if (response.ok) {
          onTaskAdded(taskPayload, task._id);
          window.alert("Task updated successfully.");
          onClose(); // Close the form after updating
        }
      } else {
        // Add new task
        response = await fetch("http://localhost:5000/api/project_tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskPayload),
        });

        if (response.ok) {
          const data = await response.json();
          onTaskAdded(data);
          onClose(); // Close the form after adding
        }
      }

      if (response.ok) {
        console.log("Task created/updated successfully:", taskPayload);
      } else {
        console.error("Failed to submit task");
      }
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{task ? "Edit Task" : "Add Task"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <TextField
              label="Task Title"
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
          </div>
          <div>
            <TextField
              label="Assigned To"
              type="text"
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleInputChange}
              margin="normal"
            />
          </div>
          <div>
            <TextField
              label="Start Date"
              type="date"
              name="startDate"
              value={taskData.startDate}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div>
            <TextField
              label="Due Date"
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div>
            <TextField
              label="Status"
              select
              name="status"
              value={taskData.status}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            >
              <MenuItem value="No Progress">
                <ListItemIcon>
                  <FontAwesomeIcon icon={faHourglass} color="#aaa" size="1x" />
                </ListItemIcon>
                No Progress
              </MenuItem>

              <MenuItem value="In Progress">
                <ListItemIcon>
                  <FontAwesomeIcon icon={faSpinner} color="orange" size="1x" />
                </ListItemIcon>
                In Progress
              </MenuItem>

              <MenuItem value="Complete">
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    color="green"
                    size="1x"
                  />
                </ListItemIcon>
                Complete
              </MenuItem>
            </TextField>
          </div>
          <div className="md:col-span-2 flex justify-end gap-4">
            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
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
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from 'next/link';

const UserStoryCard = ({
  user_id,
  subject,
  initialStatus,
  points,
  onSubtaskCreated,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(initialStatus);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    console.log("newStatus = ", status);
    console.log("newStatus 2 = ", newStatus);
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


  return (
    <div className="bg-white rounded-lg p-2 w-full sm:w-3/4 ml-1 my-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex-1 mb-4 sm:mb-0">
          <div className="flex items-center mb-4">
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />

              <div className="flex items-center flex-grow">
                <Link href={`/DetailsUserstory/${user_id}?subject=${encodeURIComponent(subject)}`}>
                  <p className="text-lg font-semibold mr-2 cursor-pointer">
                    {subject}
                  </p>
                </Link>

              </div>
            </div>
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
            <MenuItem onClick={() => handleStatusChange("Ready")}>Ready</MenuItem>
            <MenuItem onClick={() => handleStatusChange("In progress")}>In progress</MenuItem>
            <MenuItem onClick={() => handleStatusChange("Ready for test")}>Ready for test</MenuItem>
            <MenuItem onClick={() => handleStatusChange("Done")}>Done</MenuItem>
            <MenuItem onClick={() => handleStatusChange("Archived")}>Archived</MenuItem>
          </Menu>
          <span className="text-sm font-semibold">{points}</span>
        </div>
      </div>
    </div>
  );
};

export default UserStoryCard;
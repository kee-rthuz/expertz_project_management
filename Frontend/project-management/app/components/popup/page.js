

// wrking 

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function Popup({ show, onClose }) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!projectName || !projectDescription) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, projectDescription }),
      });

      if (response.ok) {
        alert('Submitted successfully');
        onClose();
        window.location.reload();
      } else {
        alert('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('An error occurred');
    }

    
  };

  return (
    <div>
      {/* <div className="bg-white p-6 roun */}
        <h1 className="text-2xl font-bold mb-4">New Project</h1>
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <TextField
                type="text"
                label="Project Name"
                placeholder="Project Name"
                className="w-full"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                fullWidth
              />
            </div>
            <div>
              <TextField
                type="text"
                label="Project Description"
                placeholder="Project Description"
                className="w-full"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
                fullWidth
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-4">
            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
              style={{
                fontSize: '16px',
                margin: '4px 2px',
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: '#000',
                fontSize: '16px',
                color: 'white',
                margin: '4px 2px',
              }}
            >
              Submit
            </Button>
            </div>
          </div>
        </form>
      {/* </div> */}
    </div>
  );
}








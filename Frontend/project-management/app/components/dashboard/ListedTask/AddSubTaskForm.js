import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddSubTaskForm = ({ onClose }) => {
    const [title, setTitle] = useState(''); // Initialize the title state
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('Subtask added:', title);
      onClose();
    };
  
    const handleCancel = () => {
      onClose();
    };
  
    const handleInputChange = (e) => {
      setTitle(e.target.value); // Update the title state with the new value
    };

    return (
        <div>
                  <h3 className="text-lg font-bold mb-4">Add SubTask</h3>

                  <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="Task Title"
            type="text"
            name="title"
            value={title} // Bind the title state to the TextField value
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
              fontSize: '16px',
              margin: '4px 2px',
            }}
            onClick={handleCancel}
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
            Create
          </Button>

        </div>
      </form>


        </div>
    );
  };
  
  export default AddSubTaskForm;
  


import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const AddTagForm = ({ onAddTag, onClose }) => {
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tagInput.trim()) {
      onAddTag(tagInput.trim());
      setTagInput('');
      onClose();
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm p-4 w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Add Tag</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter tag name"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTagForm;
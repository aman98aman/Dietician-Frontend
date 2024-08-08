import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DietCreate = ({ onCreate }) => {
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (newCategory.trim()) {
      onCreate({name:newCategory});
      navigate('/dashboard/admin/Diet'); // Redirect to the main Diet page
    }
  };

  return (
    <div className="diet-create">
      {/* <Sidebar2 /> */}
      <div className="create-form">
        <h2>Create New Diet Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter new category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e?.target?.value ?? "")}
          />
          <button className="btn" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default DietCreate;

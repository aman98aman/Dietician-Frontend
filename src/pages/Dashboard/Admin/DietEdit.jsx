import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DietCreate.css';
import Sidebar2 from './Sidebar2';
import Dashboard2 from './Dashboard2';

const DietEdit = ({ categories, setCategories }) => {
  const { index } = useParams();
  const [category, setCategory] = useState(categories[index]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCategories = [...categories];
    newCategories[index] = category;
    setCategories(newCategories);
    navigate('/dashboard/admin/Diet');
  };

  useEffect(() => {
    setCategory(categories?.[index])
  }, [categories])

  const onTableEdit = (newChange) => {
    if (newChange) {
      setCategory({ ...category, ...newChange })
    }
  }

  useEffect(() => {
    const newCategories = [...categories];
    newCategories[index] = category;
    setCategories(newCategories);
  }, [category])

  return (
    <div style={{ zIndex: 1111 }} className="Diet">
      {/* <Sidebar2 /> */}
      <Dashboard2 onEdit={onTableEdit} currentCategory={category} />

    </div>
  );
};

export default DietEdit;

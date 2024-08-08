import React, { useEffect, useState } from 'react';
import './Diet.css';
import Sidebar2 from './Sidebar2';
import MainContent from './MainContent';
import { Routes, Route } from 'react-router-dom';
import DietCreate from './DietCreate';
import DietEdit from './DietEdit.jsx';
import api from "../../../components/AxiosInterceptor.js"
import { initialData } from './Dashboard2.jsx';

function Diet() {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    api.get("/diet/getMeal").then((res)=>{
      setCategories(res?.data ?? [])
    })
  },[])
  const handleCreate = (newCategory) => {
    let payload={...newCategory,categories: initialData};
    setCategories([...categories, payload]);
    api.post("/diet/addMeal",payload).then((res)=>{
      console.log(res)
    })
  };

  return (
    <div className="Diet">
      <Sidebar2 />
      <Routes>
        <Route path="/" element={<MainContent categories={categories} setCategories={setCategories} />} />
        <Route path="create-diet" element={<DietCreate onCreate={handleCreate} />} />
        <Route path="edit-diet/:index" element={<DietEdit categories={categories} setCategories={setCategories} />} />
      </Routes>
    </div>
  );
}

export default Diet;


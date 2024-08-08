import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainContent.module.css';

const MainContent = ({ categories, setCategories }) => {
  const navigate = useNavigate();

  const handleDelete = (index) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const handleCreate = () => {
    navigate('/dashboard/admin/Diet/create-diet');
  };

  const handleEdit = (index) => {
    navigate(`/dashboard/admin/Diet/edit-diet/${index}`);
  };

  return (
    <div className={styles.mainContent}>
      <header className={styles.header}>
        <h1 className={styles.title}>DIET</h1>
        <div className={styles.buttonContainer}>
          <button className={styles.btn} onClick={handleCreate}>Create</button>
        </div>
      </header>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Categories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category?.name}</td>
              <td className={styles.tableButtons}>
                <button className={styles.btn} onClick={() => handleEdit(index)}>Edit</button>
                <button className={styles.btn} onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainContent;

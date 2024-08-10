import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Dashboard2.css';
import api from "../../../components/AxiosInterceptor.js";

export const initialData = {
  'Warm up': [{ srNo: '1', name: "CHILD'S POSE", time: '1.00', howToDo: 'Breathe deeply' }],
  'Workout': [{ workoutType: 'Cardio', exercise: 'JUMPING JACKS', sets: '3', reps: '15', rest: '30 sec', howToDo: 'Jump with feet wide, arms overhead.' }],
  'ABS': [{ workoutType: 'Core', exercise: 'PLANK', sets: '3', reps: '60 sec', rest: '30 sec', howToDo: 'Hold body in a straight line.' }],
  'Meal': [{ ingredients: 'Chicken Breast', protein: '31g', fat: '3.6g', carbs: '0g', calories: '165', recipe: 'Grill the chicken.' }],
  'Grocery List': [{ srNo: '1', ingredients: 'Milk', quantity: '2 Liters' }],
  'Instruction': [{ col1: '', col2: '', col3: '' }],
  'Stack': [{ srNo: '1', supplements: 'Whey Protein', qtServing: '1 Scoop', serving: '25g Protein' }],
};

function Dashboard2({ onEdit, currentCategory }) {
  const [description, setDescription] = useState("");
  const [activeSection, setActiveSection] = useState('Warm up');
  const [sectionData, setSectionData] = useState(initialData);

  const handleSubtitleChange = (e) => {
    setDescription(e.target.value ?? "");
  };

  useEffect(() => {
    setDescription(currentCategory?.description ?? "");
    setSectionData(currentCategory?.categories ?? []);
  }, [currentCategory]);

  const handleTableDataChange = (index, field, value) => {
    const updatedData = [...sectionData[activeSection]];
    updatedData[index][field] = value;
    setSectionData({
      ...sectionData,
      [activeSection]: updatedData
    });
  };

  useEffect(() => {
    onEdit({ categories: sectionData });
  }, [sectionData]);

  useEffect(() => {
    onEdit({ description: description });
  }, [description]);

  const save = async () => {
    if (currentCategory && currentCategory?._id) {
      await api.patch(`/diet/editMeal/${currentCategory?._id}`, { ...currentCategory });
    }
  };

  const addNewRow = () => {
    let newChange = [...(sectionData?.[activeSection] ?? [])];
    newChange?.push({});
    setSectionData({ ...sectionData, [activeSection]: newChange });
  };

  const removeRow = () => {
    let newChange = [...(sectionData?.[activeSection] ?? [])];
    newChange?.pop();
    setSectionData({ ...sectionData, [activeSection]: newChange });
  };

  const renderTable = () => {
    const currentData = sectionData[activeSection] ?? [];
    let headers = [];
    let fields = [];

    switch (activeSection) {
      case 'Warm up':
        headers = ['Sr. No.', 'Name', 'Time', 'How to do'];
        fields = ['srNo', 'name', 'time', 'howToDo'];
        break;
      case 'Cardio':
          headers = ['Sr. No.', 'Name', 'Time', 'How to do'];
          fields = ['srNo', 'name', 'time', 'howToDo'];
          break;
      case 'Workout':
        headers = ['Sr. No.', 'Name', 'Time', 'How to do'];
        fields = ['srNo', 'name', 'time', 'howToDo'];
        break;
      case 'ABS':
        headers = ['Workout Type', 'Exercise', 'Sets', 'Reps', 'Rest', 'How to do'];
        fields = ['workoutType', 'exercise', 'sets', 'reps', 'rest', 'howToDo'];
        break;
      case 'Meal':
        headers = ['Ingredients', 'Protein', 'Fat', 'Carbs', 'Calories', 'Recipe'];
        fields = ['ingredients', 'protein', 'fat', 'carbs', 'calories', 'recipe'];
        break;
      case 'Grocery List':
        headers = ['Sr. No.', 'Ingredients', 'Quantity'];
        fields = ['srNo', 'ingredients', 'quantity'];
        break;
      case 'Instruction':
        headers = ['Col1', 'Col2', 'Col3'];
        fields = ['col1', 'col2', 'col3'];
        break;
      case 'Stack':
        headers = ['Sr. No.', 'Supplements', 'QT/Serving', 'Serving'];
        fields = ['srNo', 'supplements', 'qtServing', 'serving'];
        break;
      default:
        break;
    }

    return (
      <>
        <section style={{ position: "relative" }} className="stretching-table-section">
          <h3>{activeSection} TABLE</h3>
          <table className="stretching-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  {fields.map((field, idx) => (
                    <td key={idx}>
                      <input
                        type="text"
                        value={item?.[field] ?? ""}
                        onChange={(e) => handleTableDataChange(index, field, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <img src="/minus.png" style={{ width: "24px", position: "absolute", bottom: -10, left: -10 }} onClick={removeRow} />
          <img src="/plus.png" style={{ width: "24px", position: "absolute", bottom: -10, right: -10 }} onClick={addNewRow} />
        </section>
        <div className="table-notes mt-5">
          <p>Modify the table content as needed.</p>
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="content">
        <header className="content-header">
          <div className="diet-container">
            <h1 className="content-title">DIET /</h1>
            <input
              type="text"
              className="diet-input"
              value={description}
              onChange={handleSubtitleChange}
            />
          </div>
          <div className="content-buttons">
            <button
              onClick={() => setActiveSection('Warm up')}
              className={activeSection === 'Warm up' ? 'active-section' : ''}
            >
              Warm up
            </button>
            <button
              onClick={() => setActiveSection('Cardio')}
              className={activeSection === 'Cardio' ? 'active-section' : ''}
            >
              Cardio
            </button>
            <button
              onClick={() => setActiveSection('Workout')}
              className={activeSection === 'Workout' ? 'active-section' : ''}
            >
              Workout
            </button>
            <button
              onClick={() => setActiveSection('ABS')}
              className={activeSection === 'ABS' ? 'active-section' : ''}
            >
              ABS
            </button>
            <button
              onClick={() => setActiveSection('Meal')}
              className={activeSection === 'Meal' ? 'active-section' : ''}
            >
              Meal
            </button>
            <button
              onClick={() => setActiveSection('Stack')}
              className={activeSection === 'Stack' ? 'active-section' : ''}
            >
              Stack
            </button>
            <button
              onClick={() => setActiveSection('Grocery List')}
              className={activeSection === 'Grocery List' ? 'active-section' : ''}
            >
              Grocery List
            </button>
            <button
              onClick={() => setActiveSection('Instruction')}
              className={activeSection === 'Instruction' ? 'active-section' : ''}
            >
              Instruction
            </button>
          </div>
          <button className="save-button" onClick={save}>SAVE</button>
        </header>
        {renderTable()}
      </div>
    </div>
  );
}

Dashboard2.propTypes = {
  onEdit: PropTypes.func.isRequired,
  currentCategory: PropTypes.object
};

export default Dashboard2;

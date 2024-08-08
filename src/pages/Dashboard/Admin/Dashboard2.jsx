import React, { useEffect, useState } from 'react';
import './Dashboard2.css';
import api from "../../../components/AxiosInterceptor.js"
const initialStretchingData = [
  { time: '1.00', exercise: "CHILD'S POSE", duration: '30 SEC' },
  { time: '2.00', exercise: 'COBBLERS STRETCH', duration: '30 SEC' },
  { time: '3.00', exercise: 'KNEELING HIP FLEXOR STRETCH (L/R)', duration: '30 SEC' },
  { time: '4.00', exercise: 'WALL PECTORAL STRETCH (L/R)', duration: '30 SEC' },
  { time: '5.00', exercise: 'LYING FIGURE 4 STRETCH (L/R)', duration: '30 SEC' },
  { time: '6.00', exercise: 'SHOULDER CROSS (L/R)', duration: '30 SEC' },
  { time: '7.00', exercise: 'OVERHEAD TRICEP STRETCH (L/R)', duration: '30 SEC' },
  { time: '8.00', exercise: 'STANDING QUADRICEPS STRETCH (L/R)', duration: '30 SEC' },
  { time: '9.00', exercise: 'BACK EXTENSION', duration: '30 SEC' },
];

export const initialData = {
  'Warm up': [{ time: '1.00', exercise: "CHILD'S POSE", duration: '30 SEC' }],
  'Cardio': [{ time: '1.00', exercise: 'JUMPING JACKS', duration: '1 MIN' }],
  'Workout': [{ time: '1.00', exercise: 'BURPEES', duration: '1 MIN' }],
  'ABS': [{ time: '1.00', exercise: 'PLANK', duration: '1 MIN' }],
  'Meals': [{ time: '1.00', exercise: 'BREAKFAST', duration: '30 MIN' }],
  'Stack': [{ time: '1.00', exercise: 'DUMBELL ROW', duration: '1 MIN' }],
  'Grocery List': [{ time: '1.00', exercise: 'MILK', duration: '1 ITEM' }],
  'Instruction': [{ time: '1.00', exercise: 'WARM UP', duration: '10 MIN' }]
};

function Dashboard2({onEdit,currentCategory}) {
  const [description, setDescription] = useState("");
  const [activeSection, setActiveSection] = useState('Warm up');
  const [sectionData, setSectionData] = useState(initialData);

  const handleSubtitleChange = (e) => {
    setDescription(e.target.value ?? "");
  };
  useEffect(()=>{
    setDescription(currentCategory?.description ?? "")
    setSectionData(currentCategory?.categories ?? [])
  },[currentCategory])
  const handleTableDataChange = (index, field, value) => {
    const updatedData = [...sectionData[activeSection]];
    updatedData[index][field] = value;
    setSectionData({
      ...sectionData,
      [activeSection]: updatedData
    });
  };

  useEffect(()=>{
    onEdit({categories: sectionData})
  },[sectionData])

  useEffect(()=>{
    onEdit({description: description})
  },[description])

  const save = async() => {
    if(currentCategory && currentCategory?._id){
      await api.patch(`/diet/editMeal/${currentCategory?._id}`,{...currentCategory})    
    }           
  }

  const addNewRow = () => {
    let newChange = [...(sectionData?.[activeSection] ?? [])]
    newChange?.push({})
    setSectionData({...sectionData,[activeSection]:newChange})
  }
  const removeRow = () => {
    let newChange = [...(sectionData?.[activeSection] ?? [])]
    newChange?.pop()
    setSectionData({...sectionData,[activeSection]:newChange})
  }

  const renderTable = () => {
    const currentData = sectionData[activeSection] ?? [];
    return (
      <>
      <section style={{position:"relative"}} className="stretching-table-section">
        <h3>{activeSection} TABLE</h3>
        <table className="stretching-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Exercise</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item?.time ?? ""}
                    onChange={(e) => handleTableDataChange(index, 'time', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item?.exercise ?? ""}
                    onChange={(e) => handleTableDataChange(index, 'exercise', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item?.duration ?? ""}
                    onChange={(e) => handleTableDataChange(index, 'duration', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <img src="/minus.png" style={{width:"24px",position:"absolute",bottom:-10,left:-10}} onClick={removeRow} />
        <img src="/plus.png" style={{width:"24px",position:"absolute",bottom:-10,right:-10}} onClick={addNewRow} />
      </section>
        <div className="table-notes mt-5">
        <p>Modify the table content as needed.</p>
      </div>
    </>
    );
  };

  return (
    <div className="dashboard-container">
      {/* <Sidebar /> */}
      <div className="content">
        <header className="content-header">
          <div className="diet-container">
            <h1 className="content-title">DIET /</h1>
            <input 
              // className="content-inputtt"
              type="text"
              className="diet-input"
              value={description}
              onChange={handleSubtitleChange}
            />
          </div>
          <div className="content-buttons">
            <button onClick={() => setActiveSection('Warm up')}>Warm up</button>
            <button onClick={() => setActiveSection('Cardio')}>Cardio</button>
            <button onClick={() => setActiveSection('Workout')}>Workout</button>
            <button onClick={() => setActiveSection('ABS')}>ABS</button>
            <button onClick={() => setActiveSection('Meals')}>Meals</button>
            <button onClick={() => setActiveSection('Stack')}>Stack</button>
            <button onClick={() => setActiveSection('Grocery List')}>Grocery List</button>
            <button onClick={() => setActiveSection('Instruction')}>Instruction</button>
          </div>
          <button className="save-button" onClick={save}>SAVE</button>
        </header>
        {renderTable()}
      </div>
    </div>
  );
}

export default Dashboard2;

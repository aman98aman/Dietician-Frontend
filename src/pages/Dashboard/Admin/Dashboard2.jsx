import React from 'react';
// import { NavLink } from 'react-router-dom';
import './Dashboard2.css';
import Sidebar from './Sidebar';


function Dashboard2() {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="content">
          <header className="content-header">
            <div>
            <h1 className="content-title">DIET</h1>
            <span className="content-subtitle">non veg weight loss</span></div>
            <div className="content-buttons">
              <button>Warm up</button>
              <button>Cardio</button>
              <button>Workout</button>
              <button>ABS</button>
              <button>Stack</button>
              <button>Grocery List</button>
              <button>Instruction</button>
            </div>
            <button className="save-button">SAVE</button>
          </header>
          <section className="stretching-table-section">
            <h3>TOTAL BODY STRETCHING POST WORKOUT</h3>
            <table className="stretching-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Exercise</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.00</td>
                  <td>CHILD'S POSE</td>
                  <td>30 SEC</td>
                </tr>
                <tr>
                  <td>2.00</td>
                  <td>COBBLERS STRETCH</td>
                  <td>30 SEC</td>
                </tr>
                <tr>
                  <td>3.00</td>
                  <td>KNEELING HIP FLEXOR STRETCH (L/R)</td>
                  <td>30 SEC</td>
                </tr>
                <tr>
                  <td>4.00</td>
                  <td>WALL PECTORAL STRETCH (L/R)</td>
                  <td>30 SEC</td>
                </tr>
                <tr>
                  <td>5.00</td>
                  <td>LYING FIGURE 4 STRETCH (L/R)</td>
                  <td>30 SEC</td>
                </tr>
                <tr>
                  <td>6.00</td>
                  <td>SHOULDER CROSS (L/R)</td>
                  <td>30 SEC</td>
                </tr>
                <tr>
                  <td>7.00</td>
                  <td>OVERHEAD TRICEP STRETCH (L/R)</td>
                  <td>30 SEC</td>
                </tr>
                <tr>
                  <td>8.00</td>
                  <td>STANDING QUADRICEPS STRETCH (L/R)</td>
                  <td>30 SEC</td>
                </tr>
                <tr>
                  <td>9.00</td>
                  <td>BACK EXTENSION</td>
                  <td>30 SEC</td>
                </tr>
              </tbody>
            </table>
            <div className="table-notes">
              <p>30 SEC EACH LEFT AND RIGHT, HOLD UNTIL YOU FEEL STRETCH.</p>
              <p>DO NOT TRY TO OVERSTRETCH AS SHIVERING WILL START.</p>
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  export default Dashboard2;
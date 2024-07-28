import React from "react";
import AdminDashboardNav from "./AdminDashboardNav";
import Cards from "./Cards";
import LineChartCard from "./LineChartCard";
import FaqAccordion from "./FaqAccordion";
import Sidebar from "./Sidebar";
import DashBoard2 from "./Dashboard2";
// import UserChart from './UserChart'

const Diet = () => (
  <div className="flex flex-row">
    <Sidebar />
    
    <div className="flex flex-col">
    <DashBoard2 />
    </div>
  </div>
);

export default Diet;
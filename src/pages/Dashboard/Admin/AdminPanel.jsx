import React from "react";
import AdminDashboardNav from "./AdminDashboardNav";
import Cards from "./Cards";
import LineChartCard from "./LineChartCard";
import FaqAccordion from "./FaqAccordion";
// import UserChart from './UserChart'

const AdminPanel = () => {
  return (
    <div className="flex flex-row">
      <AdminDashboardNav />
      <div className="flex flex-col">
        <Cards />
        <LineChartCard />
        <FaqAccordion />
      </div>
    </div>
  );
};

export default AdminPanel;

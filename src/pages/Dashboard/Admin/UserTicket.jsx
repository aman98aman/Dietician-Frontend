import React from "react";
import AdminDashboardNav from "./AdminDashboardNav";
import RequestListing from "./RequestListing";

const UserTicket = () => {
  return (
    <div className="flex flex-row">
      <AdminDashboardNav />
      <div>
        <RequestListing />
      </div>
    </div>
  );
};

export default UserTicket;

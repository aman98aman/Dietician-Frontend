import React from "react";
import { Link } from "react-router-dom";

const AdminDashboardNav = () => (
  <div className="h-screen w-64 bg-gray-800">
    <div className="flex h-20 items-center justify-center bg-gray-900">
      <Link to="/super" className="text-2xl font-semibold text-white">
        Admin Dashboard
      </Link>
    </div>
    <section className="pb-4">
      <Link to="/super/ut">
        <div className="py-2 pl-6 text-white hover:bg-gray-700">Requests</div>
      </Link>
      <Link>
        <div className="py-2 pl-6 text-white hover:bg-gray-700">Users</div>
      </Link>
      <Link>
        <div className="py-2 pl-6 text-white hover:bg-gray-700">Settings</div>
      </Link>
      <Link>
        <div className="py-2 pl-6 text-white hover:bg-gray-700">Logout</div>
      </Link>
    </section>
  </div>
);

export default AdminDashboardNav;

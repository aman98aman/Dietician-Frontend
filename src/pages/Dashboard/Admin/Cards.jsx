import React from "react";

const Cards = () => {
  return (
    <div className="mx-5 mt-10 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-xl font-bold">Total Users</h2>
          <p className="text-gray-600">1000</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-xl font-bold">Active Users</h2>
          <p className="text-gray-600">750</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-xl font-bold">Premium Users</h2>
          <p className="text-gray-600">500</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-xl font-bold">Expiring Soon</h2>
          <p className="text-gray-600">100</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;

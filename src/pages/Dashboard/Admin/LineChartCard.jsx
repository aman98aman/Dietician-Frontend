import React from "react";

const LineChartCard = () => {
  return (
    <div className="mx-5 mt-5 w-96 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Monthly User Growth</h2>
      <div className="mt-4 border-t border-gray-300"></div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-gray-600">Jan</div>
        <div className="text-gray-600">Feb</div>
        <div className="text-gray-600">Mar</div>
        <div className="text-gray-600">Apr</div>
        <div className="text-gray-600">May</div>
        <div className="text-gray-600">Jun</div>
        <div className="text-gray-600">Jul</div>
        <div className="text-gray-600">Aug</div>
        <div className="text-gray-600">Sep</div>
        <div className="text-gray-600">Oct</div>
        <div className="text-gray-600">Nov</div>
        <div className="text-gray-600">Dec</div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="h-20 w-10 rounded-full bg-blue-500"></div>
        <div className="h-32 w-10 rounded-full bg-blue-500"></div>
        <div className="h-28 w-10 rounded-full bg-blue-500"></div>
        <div className="h-40 w-10 rounded-full bg-blue-500"></div>
        <div className="h-25 w-10 rounded-full bg-blue-500"></div>
        <div className="h-30 w-10 rounded-full bg-blue-500"></div>
        <div className="h-45 w-10 rounded-full bg-blue-500"></div>
        <div className="h-38 w-10 rounded-full bg-blue-500"></div>
        <div className="h-50 w-10 rounded-full bg-blue-500"></div>
        <div className="h-35 w-10 rounded-full bg-blue-500"></div>
        <div className="h-42 w-10 rounded-full bg-blue-500"></div>
        <div className="h-55 w-10 rounded-full bg-blue-500"></div>
      </div>
    </div>
  );
};

export default LineChartCard;

import React from "react";

const RequestListing = () => {
  const requests = [
    { id: 1, userName: "John Doe", title: "Fix Bug in Homepage" },
    { id: 2, userName: "Jane Smith", title: "Update User Profile" },
    { id: 3, userName: "Alice Johnson", title: "Add Payment Gateway" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2 lg:grid-cols-3">
      <h1 className="col-span-full mb-4 text-3xl font-bold">Request Listing</h1>
      {requests.map((request) => (
        <div key={request.id} className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-lg font-bold">Request ID: {request.id}</p>
          <p className="text-gray-700">User: {request.userName}</p>
          <p className="text-gray-700">Title: {request.title}</p>
          <div className="mt-2 flex justify-end">
            <button className="mr-2 rounded-md bg-green-500 px-4 py-2 text-white">
              Accept
            </button>
            <button className="rounded-md bg-red-500 px-4 py-2 text-white">
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestListing;

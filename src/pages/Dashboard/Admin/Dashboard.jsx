import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../Redux/userDetails/action";

const Dashboard = () => {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    async function fetchdata(){
      //console.log("data fetching in the dashboard starts...!!")
      const data = await fetch("http://localhost:3333/users/allUser");
      const resData = await data.json();
      //console.log("response received", resData);
      dispatch(setUserDetails(resData.data))
      //onsole.log("Action is dispatched in the fetchdata function")
    }
    fetchdata();


    const intervalId = setInterval(fetchdata, 10000);

    // Clean up function to clear interval on component unmount
    return () => clearInterval(intervalId);

  },[])

  //console.log("Dashboard is runned")
  return (
    <div className="flex">
      <header className="absolute w-full md:w-72 md:min-w-72 lg:relative">
        <Sidebar />
      </header>
      <main className="container h-full min-h-screen text-black px-2">
        <button
          className="m-2 rounded-md p-2 shadow lg:hidden"
          type="button"
          onClick={() => setToggle(!toggle)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>{" "}
          </svg>
        </button>

        <Outlet />        
      </main>
    </div>
  );
};

export default Dashboard;

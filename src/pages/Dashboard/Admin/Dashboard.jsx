import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../Redux/userDetails/action";
import api from "../../../components/AxiosInterceptor";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchdata() {
      //console.log("data fetching in the dashboard starts...!!")
      const data = await api.get("/users/allUser");
      const resData = data;
      //console.log("response received", resData);
      dispatch(setUserDetails(resData.data));
      //onsole.log("Action is dispatched in the fetchdata function")
    }
    fetchdata();

    const intervalId = setInterval(fetchdata, 10000);

    // Clean up function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  //console.log("Dashboard is runned")
  return (
    <div className="grid grid-cols-6 max-lg:flex max-lg:flex-col">
      <header className="w-full col-span-1 sticky top-0 h-fit z-[100000000]">
        <Sidebar />
      </header>
      <main className="col-span-5 w-full h-full min-h-screen px-2  text-black">
        {/* <button
          className="m-2 rounded-md p-2 shadow lg:hidden border-4 "
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
        </button> */}

        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

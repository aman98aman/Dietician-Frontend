import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VegeIcon from '../../../assets/vege.png';



function Links() {
  const navigate = useNavigate();
  const logoutHandler = () => {

    const removingItem = localStorage.removeItem("dietToken");
    console.log("removing item", removingItem);
    navigate("/");
  }

  return (
    <>
      <div className="px-8 py-3">
        <h4 className="">Analytics</h4>

        <NavLink
          className="flex items-center py-2 text-lg hover:text-indigo-700"
          to=""
          end
        >
          {({ isActive }) => (
            <>
              <i className="ai ai-house-line-fill mr-3 text-2xl text-emerald-600"></i>
              Home
              <i
                className={isActive ? "ai ai-arrow-right ml-3" : "hidden"}
              ></i>
            </>
          )}
        </NavLink>

        <NavLink

          className="flex items-center py-2 text-lg hover:text-indigo-700"
          to="/dashboard/admin/Users"
        >
          {({ isActive }) => (
            <>
              <i className="ai ai-chart-line-up-fill mr-3 text-2xl text-amber-400"></i>
              Users
              <i
                className={isActive ? "ai ai-arrow-right ml-3" : "hidden"}
              ></i>
            </>
          )}
        </NavLink>

        <NavLink

          className="flex items-center py-2 text-lg hover:text-indigo-700"
          to="/dashboard/admin/Diet"
        >
          {({ isActive }) => (
            <>
             <img src={VegeIcon} alt="Diet Icon" className="mr-3 w-6 h-6" />
              Diet
              <i
                className={isActive ? "ai ai-arrow-right ml-3" : "hidden"}
              ></i>
            </>
          )}
        </NavLink>
      </div>

      <div className="px-8 py-3">
        <h4 className="opacity-80 ">Manage</h4>
        <NavLink

          className={"flex items-center py-2 text-lg hover:text-indigo-700"}
          to="/dashboard/admin/requests"
        >
          {({ isActive }) => (
            <>
              <i className="ai ai-hands-clapping-fill mr-3 text-2xl text-rose-400"></i>{" "}
              Requests
              <i
                className={isActive ? "ai ai-arrow-right ml-3" : "hidden"}
              ></i>
            </>
          )}
        </NavLink>
      </div>

      <div className="px-8 py-3">
        <h4 className="opacity-50 ">Other Actions</h4>


        <button
          className="flex items-center py-2 text-lg hover:text-indigo-700"
          onClick={logoutHandler}
        >
          <i className="ai ai-arrow-square-out-fill mr-3 text-2xl text-orange-400"></i>
          Log Out
        </button>
      </div>
    </>




  );
}

function Sidebar2() {

  return (
    <nav style={{width: "17%", position: "relative"}}
      className={
        "text-black shadow-lg lg:block lg:h-screen lg:sticky lg:left-0 lg:top-0 md:flex md:w-screen md:fixed lg:w-full"
        // "hidden min-h-svh max-w-80 rounded-3xl bg-white shadow-lg lg:sticky lg:left-0 lg:top-0 lg:block"
      }
    >
      <button
        className="text-red absolute right-4 top-4 lg:hidden"

      >
        <i className="ai ai-x-bold text-2xl"></i>
      </button>
      <div className="flex items-center p-4 pt-6" style={{width: "555%"}}> 
        <img
          className="bg-slate-10 mx-2 h-16 w-16 rounded-full border"
          src="https://static.vecteezy.com/system/resources/previews/019/900/306/non_2x/happy-young-cute-illustration-face-profile-png.png"
          alt="profile"
        />
        <div className="mx-2">
          <h3 className="font-heading text-sm">Welcome,</h3>
          <h3 className="font-paragraph text-xl"> Admin</h3>
        </div>
      </div>
      <hr />
      <Links />
    </nav>
  );
}

export default Sidebar2;
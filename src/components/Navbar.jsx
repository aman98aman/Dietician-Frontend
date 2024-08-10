import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/giphy.gif";
import { decodeJwt } from "../pages/middelwares";
import { Link } from "react-router-dom";
import api from "./AxiosInterceptor";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recommendation,setRecommendation] = useState();
  const token = localStorage.getItem("dietToken");
  const navigate = useNavigate();
  console.log("token in navbar", token);
  const decoded = token && decodeJwt(token);
  console.log("decoded in navbar", decoded);

  const logoutHandler = () => {
    console.log("Inside the logout handler")

    const removingItem = localStorage.removeItem("dietToken");
    console.log("removing item", removingItem);
    navigate("/");
  }

  useEffect(()=>{
    if(decoded){
      const userData = decoded.userData
      api.post("/users/getUserDiet",{email:userData.email ?? ""}).then((res)=>{
        const diet = res.data?.[0];
        setRecommendation(diet)
      })  
    }
  },[])


  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className=" h-[85px] flex flex-wrap items-center px-6 py-2 shadow-md dark:bg-stone-950 dark:text-slate-100 lg:px-16 lg:py-0 bg-black text-white font-medium">
        <div className="flex flex-1 items-center justify-between">
          <a href="/" className="flex text-lg font-semibold">
            <img className="rounded-lg"
              src={logo}
              width="75 "
              height="75"
              alt="Fit Logo"
            />
            <div className="mt-3 text-3xl text-red-500 font-bold"><i>Arsh-Sandhu</i></div>
          </a>
        </div>
        <label
          htmlFor="menu-toggle"
          className="block cursor-pointer lg:hidden"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current text-gray-900 dark:text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <div
          className={`w-full lg:flex lg:w-auto lg:items-center ${isOpen ? "block" : "hidden"}`}
          id="menu"
        >
          <nav>
            <ul className="items-center gap-x-5 pt-4 text-center text-xl md:gap-x-4 lg:flex lg:pt-0  lg:text-lg">
              <li className="py-2 lg:py-0 ">
                <a
                  className="py-2 px-3 hover:border-b-4 hover:rounded-md hover:border-slate-300-400 hover:bg-red-600 dark:hover:bg-gray-300 dark:hover:text-slate-950"
                  href="#section1"
                >
                  Home
                </a>
              </li>
              <li className="py-2 lg:py-0 ">
                <a
                  className="py-2 px-3 hover:border-b-4 hover:rounded-md hover:border-slate-300-400 hover:bg-red-600 dark:hover:bg-gray-300 dark:hover:text-slate-950"
                  href="#about-us"
                >
                  About
                </a>
              </li>
              <li className="py-2 lg:py-0 ">
                <a
                  className="py-2 px-3 hover:border-b-4 hover:rounded-md hover:border-slate-300-400 hover:bg-red-600 dark:hover:bg-gray-300 dark:hover:text-slate-950"
                  href="#planss"
                >
                  Plans
                </a>
              </li>
              <li className="py-2 lg:py-0 ">
                <a
                  className="py-2 px-3 hover:border-b-4 hover:rounded-md hover:border-slate-300-400 hover:bg-red-600 dark:hover:bg-gray-300 dark:hover:text-slate-950"
                  href="https://wa.me/9814256639"
                  target="blank"
                >
                  Contact
                </a>
              </li>
              <div className="transition delay-150 duration-300 hover:-translate-x-1 hover:scale-105 hover:bg-none">
                {
                  (decoded === null) ?
                    <Link
                      to="/auth/login"
                      className="text-md mt-4 inline-block rounded-md bg-red-600 px-3 py-2 font-semibold leading-none text-white hover:border-red-500 hover:bg-white hover:text-red-500 lg:mt-0"
                    >
                      Login/Signup
                    </Link>
                    :
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          onClick={toggleDropdown}
                        >
                          {decoded.userData.firstName + " " + decoded.userData.lastName}
                          <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.293 10.707a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 12.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <Link
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              to={(decoded.userData.isUser) ? `/users/details/recommend/${recommendation?._id}` : "/dashboard/admin"}
                              state={decoded.userData}
                            >
                              {(decoded.userData.isUser) ? "Diets" : "AdminPanel"}
                            </Link>

                            {(decoded.userData.isUser) && <Link
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              to={"/UserProfile"}
                            >
                              UserProfile
                            </Link>}

                            {(decoded.userData.isUser) && <Link
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              to={"/raiseRequest"}
                            >
                              Raise A Request
                            </Link>}

                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={logoutHandler}>Logout</button>
                          </div>
                        </div>
                      )}
                    </div>

                }
              </div>
            </ul>
          </nav>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import Register from "../assets/back.jpg";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Destructure form data
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
      } = formData;

      // Validate form fields
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phoneNumber ||
        !password ||
        !confirmPassword
      ) {
        toast.error("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      navigate("/UserDetailForm", { state: { key: formData } });

    } catch (error) {
      console.error("Error:", error.message);
      // Handle network errors or other exceptions
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <section className="relative">
      <ToastContainer />
      <div className="absolute bottom-0 left-0 right-0 top-0 z-20 sm:p-10">
        <div className="flex flex-col items-center justify-center mt-10 lg:justify-center lg:px-8 lg:py-16 xl:py-10 xl:justify-center">
          <Slide>
            <div className="min-w-fit rounded-lg bg-slate-950/40 px-5 py-5 lg:px-10 backdrop-blur-sm">
              <h2 className="text-center text-3xl font-bold leading-tight text-white opacity-80">
                Create a new account
              </h2>
              <form onSubmit={handleSubmit} className="mt-3 md:mt-8 sm:w-[500px]">
                <div className="flex flex-wrap justify-center p-1.5">
                  <div className="w-full p-1.5 sm:w-1/2">
                    <input
                      className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  {/* l-name */}
                  <div className="w-full p-1.5 sm:w-1/2">
                    <input
                      className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  {/* email */}
                  <div className="w-full p-1.5 sm:w-1/2">
                    <input
                      className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {/* phone */}
                  <div className="w-full p-1.5 sm:w-1/2">
                    <input
                      className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="tel"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  {/* password */}
                  <div className="w-full p-1.5 sm:w-1/2">
                    <input
                      className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {/* conf-password */}
                  <div className="w-full p-1.5 sm:w-1/2">
                    <input
                      className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Add other input fields similarly */}
                  <div className="mt-3 w-full">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-indigo-800 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-800"
                    >
                      Get started
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-8">
              <Link
                to="/"
                className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-indigo-500 hover:text-white"
              >
                Go to Home Page
              </Link>
            </div>
          </Slide>
        </div>
      </div>
      <div className="relative h-svh translate-x-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-slate-950 opacity-30"></div>
        <img
          src={Register}
          alt=""
          className="h-full w-full object-cover lg:object-left-top"
        />
      </div>
    </section>
  );
};

export default Signup;

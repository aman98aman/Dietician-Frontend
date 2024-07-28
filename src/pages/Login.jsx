import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import { adminLoginSuccess, userLoginSuccess } from "../Redux/auth/action";
import { useDispatch } from "react-redux";
import { decodeJwt } from "./middelwares";
import Image2 from "../assets/back.jpg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Destructure form data
      const { email, password } = formData;

      // Validate form fields
      if (!email || !password) {
        toast.error("Email and password are required for login");
        return;
      }
      setLoading(true);
      // Send POST request to backend for login
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        // Include credentials (cookies) in the request
      });

      const jsonResponse = await response.json();
      console.log("jsonres is", jsonResponse);

      // Handle user not registered or wrong cred
      if (!jsonResponse.success) {
        setLoading(false);
        toast.error(jsonResponse.message);
      } else if (jsonResponse.success) {
        console.log("Inside else if part")
        // Handle success response and store token in cookie redirect to multi-stack form
        //jsonResponse.isAdmin ? navigate('/dashboard/admin/home') : navigate('/')
        localStorage.setItem("dietToken", jsonResponse.token);

        const decoded = decodeJwt(localStorage.getItem("dietToken"));

        console.log("decoded is", decoded)

        // if(decoded.isAdmin === true && decoded.isUser === false){
        //   dispatch(adminLoginSuccess())
        //   navigate('/dashboard/admin')
        // }else{
        //   dispatch(userLoginSuccess());
        //   navigate('/')
        // }
        setLoading(false)
        navigate('/')

      } else {
        // Handle error response and display error message using toast.error()
        setLoading(false);
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
      // Handle network errors or other exceptions
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className="relative">
      <ToastContainer />
      <div className="absolute bottom-0 left-0 right-0 top-0 z-20">
        <div className="flex flex-col items-center justify-center mt-10 lg:justify-center lg:px-8 lg:py-16 xl:py-10 xl:justify-center">
          <Slide>
            <div className="min-w-fit rounded-lg bg-slate-950/40 px-5 py-5 lg:px-10 lg:py-10 backdrop-blur-sm">
              {/* {We can add a logo here} */}
              <h2 className="text-center text-2xl font-bold leading-tight text-white opacity-80">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-slate-200/80">
                Don&apos;t have an account?{" "}
                <Link
                  to="/auth/signup"
                  title="create free account"
                  className="font-semibold text-indigo-500 transition-all duration-200 hover:underline"
                >
                  Create a free account
                </Link>
              </p>
              <form
                onSubmit={handleSubmit}
                action="#"
                method="POST"
                className="mt-8 sm:w-[500px]"
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-white opacity-85"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-white opacity-85"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        title="Forgot password"
                        className="text-sm font-semibold text-indigo-500 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="flex h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-indigo-800 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-800"
                    >
                      {(loading)?"Logging in..." : "Login to Dashboard"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Slide>
          <Link
            to="/"
            className="mt-5 rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-indigo-500 hover:text-white"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
      <div className="relative h-svh translate-x-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-slate-950 opacity-30"></div>
        <img
          src={Image2}
          alt="back"
          className="h-full w-full object-cover lg:object-left-top"
        />
      </div>
    </section>
  );
}

export default Login;

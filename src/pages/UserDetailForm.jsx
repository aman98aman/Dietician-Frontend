import React, { useEffect, useState } from "react";
import { Step1, Step2, Step3, Step4 } from "./steps";
import bg6 from "../assets/bg-6.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';

function Button({ onClick, text }) {

  return (
    <button
      onClick={onClick}
      className="inline-flex w-full items-center justify-center rounded-md bg-indigo-800 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-800"
    >
      {text}
    </button>
  );
}

function UserDetailForm() {
  const navigate = useNavigate();
  let location = useLocation();
  console.log("location value  in the userDetailForm is", location.state.key);

  const handleBackButton = () => {
    toast.warn(
      "All data saved will be lost. Please fill your details to get personalized training/diet plan.",
      {
        autoClose: 5000,
      },
    );

    // setTimeout(() => {
    //   toast.warn('Are you sure you want to continue? You will be redirected to the login page.', {
    //     autoClose: 5000
    //   });
    // }, 6000);

    // setTimeout(() => {
    //   navigate('/auth/login');
    // }, 12000);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // This will display the browser's default prompt message
      return ""; // This is required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    handleBackButton();

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    alcoholConsumption: "",
    smoking: "",
    dailyBreakfast: "",
    dailyLunch: "",
    dailySnacks: "",
    dailyDinner: "",
    occupation: "",
    workHours: "",
    bodyType: "",
    dietType:"",
    bodyFatPercentage: "",
    healthIssues: "",
    medicines: "",
    injuries: "",
    allergies: "",
    fitnessGoal: "",
    gymDaysPerWeek: "",
    workoutTime: "",
    supplements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const completeUserData = {...location.state.key, ...formData}
    console.log("complete user data is", completeUserData);

    const sendUserData = await fetch("http://localhost:3333/users/addUser",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(completeUserData)
    })

    const sendUserDataJson = await sendUserData.json();

    if(sendUserDataJson.success){
      alert("user is saved to d successfully....!! Pls Login");
      navigate('/auth/login');
    }else{
      alert("Something went wrong...!! Try again");
      navigate('/auth/signup');
    }

    
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    // handleBackButton();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1: // force logout if pressed back on step 1
        return (
          <div>
            <Step1 handleChange={handleChange} />
            <Button onClick={nextPage} text="Next" />
          </div>
        );
      case 2:
        return (
          <div>
            <Step2 handleChange={handleChange} />
            <div className="flex gap-x-4">
              <Button onClick={previousPage} text="Back" />
              <Button
                onClick={nextPage}
                handleBackButton={handleBackButton}
                text="Next"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <Step3 handleChange={handleChange} />
            <div className="flex gap-x-4">
              <Button onClick={previousPage} text="Back" />
              <Button onClick={nextPage} text="Next" />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <Step4 handleChange={handleChange} />
            <div className="flex gap-x-4">
              <Button onClick={previousPage} text="Back" />
              <button
                onClick={handleSubmit}
                className="inline-flex w-full items-center justify-center rounded-md bg-indigo-800 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-800"
              >
                Submit
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-20 sm:p-10">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
          {renderPage()}
        </div>
      </div>
      <div className="relative h-svh translate-x-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-slate-950 opacity-30"></div>
        <img
          src={bg6}
          alt=""
          className="h-full w-full object-cover lg:object-center"
        />
      </div>
      <ToastContainer />
    </section>
  );
}

export default UserDetailForm;

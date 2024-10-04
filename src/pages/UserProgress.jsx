import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { decodeJwt } from "./middelwares.js";
import { toast } from "react-toastify";
import progress from '../assets/progress.svg'
import axios from "axios";
import BMI from './BMI.jsx';
import api from "../components/AxiosInterceptor.js";

const UserProgress = () => {
  const data = [
    {
      name: 'Jan',
      BMI: 24,
    },
    {
      name: 'Feb',
      BMI: 20,
    },
    {
      name: 'March',
      BMI: 20,
    },
    {
      name: 'April',
      uv: 2780,
      BMI: 45,
    },
    {
      name: 'May',
      BMI: 21,
    },
    {
      name: 'June',
      BMI: 25,
    },
    {
      name: 'July',
      BMI: 21,
    },
  ]
  const [bmiData, setBmiData] = useState([]);
  const [bmiChartData, setBmiChartData] = useState([]);
  const [weight, setWeight] = useState(0);
  const [weightData, setWeightData] = useState();
  const [BMIData, setBMIData] = useState(null);
  const [progressImage, setProgressImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const token = localStorage.getItem("dietToken");
  const decoded = token ? decodeJwt(token) : null;

  useEffect(() => {
    if (decoded && decoded.userData) {
      setWeight(decoded.userData.weight);
    }
    if (decoded && decoded.userData) {
      const weight = decoded.userData.weight;
      const height = decoded.userData.height;
      const heightInM = height / 100;
      const calculatedBMI = weight / (heightInM * heightInM);
      setBMIData(calculatedBMI.toFixed(2));
      console.log("weight", weight);
      console.log("height", height);
      console.log("bmi", BMIData);
    }
  }, [decoded]);

  async function getBMI() {
    try {
      const response = await api.post("/users/getProgressWeight", {
        email: decoded?.userData?.email,
      });

      const data = await response.data.data;
      console.log("BMIIIII response Data", data);

      if (data) {
        // Format the data for the recharts LineChart component
        const formattedData = data.map((entry) => ({
          date: new Date(entry.createdAt).toLocaleDateString(), // Format date
          weight: entry.weight, // Use weight as the data point
        }));

        setBmiData(formattedData);
        setBmiChartData(data);
      }
    } catch (e) {
      console.log("error", e.message);
    }
  }

  useEffect(() => {
    getBMI();
    console.log("api called");

    async function fetchImage() {
      //console.log("email is", location.state.userData.email)
      try {
        setLoadingImages(true);
        const res = await api.post(
          "/users/getUsersPic",
          JSON.stringify({ email: decoded.userData.email }),
        );

        const resJson = res;
        console.log("Res.json in the single user is", resJson);

        setProgressImages(resJson.data);

        setLoadingImages(false);
      } catch (e) {
        toast.error("Got some error", e);
      }
    }

    fetchImage();
  }, []);


  async function handleUpload(e) {
    console.log("Inside handle upload file and value is", e);

    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("email", JSON.stringify(decoded.userData.email));
      formData.append("weight", JSON.stringify(weightData));

      const res = await api.post("/users/uploadpic", formData);

      const resJson = await res;

      if (resJson.success) {
        toast.success("Successfully uploaded image"); // Display success message
      } else {
        toast.error("Upload failed"); // Display error message if success is false
      }
    } catch (error) {
      console.error("Error during upload:", error);
      toast.error("Failed to upload image"); // Display error message for catch block
    }
  }
  


  return (
    <>
      <main className="w-full p-4 max-sm:p-1 ">
      <div>
          <BMI data={bmiChartData} />
      </div>
        
        <div >
          <div className="grid grid-cols-3 items-center justify-evenly mb-8 mt-8 max-lg:mt-4 max-lg:mb-4" >
            <div className="flex flex-col justify-center items-center ">
            <h1 className="text-lg font-semibold font-roboto mb-4 max-sm:text-xs max-sm:mb-1">User Progress</h1>
            <img src={progress} alt="" className="w-[150px] max-lg:w-[100px] max-sm:w-[50px]"/>
            </div>
            <div className="flex flex-col items-center justify-center border-r-2 border-gray-400 max-sm:border-none">
            <h2 className="font-serif text-lg uppercase text-gray-500 max-sm:text-xs">BMI</h2>
            <span className="text-3xl text-gray-700  max-sm:text-xl">{BMIData}</span>
            
            <div className="group relative mx-auto w-32 text-center justify-center items-center flex gap-1">
            <p className="text-2xl text-gray-600 max-sm:text-sm">
              {BMIData < 18.5
                ? "Underweight"
                : BMIData >= 18.5 && BMIData <= 24.9
                  ? "Normal"
                  : "Overweight / Obese"}
            </p>
              <div>
              <span className=" rounded font-bold text-gray-600 shadow-sm max-sm:text-xs">
                ⓘ
              </span>
              <span className="absolute top-5 w-full scale-0 rounded bg-gray-300 p-2 px-4 text-left text-xs text-gray-600 shadow-lg transition-all group-hover:scale-100">
                Skinny: {"<18.5"} <br /> Normal: 18.5 - 25 <br /> Obese: {">25"}{" "}
              </span>
              </div>
            </div>
            </div>
            <div className=" flex flex-col justify-center items-center gap-2 max-sm:gap-2">
            <h2 className="font-serif text-sm uppercase text-gray-500 max-sm:text-[0.6em] max-sm:leading-none">
              Update Weight
            </h2>
            <input
              type="number"
              name="weight"
              id="weight"
              placeholder=".kg"
              defaultValue={weight}
              step={0.1}
              onChange={(e) => {
                setWeightData(e.target.value);
              }}
              className="w-1/4 rounded bg-gray-200 px-3 py-3 text-center text-xl text-gray-600 max-sm:text-sm max-sm:h-7 max-sm:w-16"
            />
            <button className=" bg-blue-400 rounded-2xl w-36 text-white h-10 max-sm:h-6 max-sm:text-[0.6em] max-sm:w-20 ">
              Click to Update
            </button>
          </div>
          </div>
          <hr className="h-[2px] w-full bg-gray-400 " />
        

          {/* Graph */}
        
       <div className="grid grid-cols-2 mt-8 mb-8 gap-4">
       <div className=" flex flex-col justify-center items-center text-center">
            <h2 className=" text-black-500 font-serif text-2xl uppercase max-sm:text-base">
              Weight
            </h2>
            <ResponsiveContainer width="100%" height={200} className="max-sm:w-[50%]">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-xs dark:text-slate-300 ">Weight Progress</p>
          </div>

          <div className="flex justify-center max-sm:h-fit ">
          <div className="w-full flex flex-col jutstify-center rounded p-10 py-8 text-center shadow md:w-2/4 max-sm:py-4">
            <label className="my-4 block cursor-pointer rounded-lg border-2 border-dashed border-gray-600 py-10">
              <span className="mx-auto rounded-full bg-gray-600 px-4 py-1 text-center font-mono text-4xl font-bold  text-gray-300 max-sm:text-lg">
                +
              </span>
              <input
                type="file"
                className="invisible hidden w-full"
                onChange={handleUpload}
              />
            </label>
            <p className="mt-4 text-sm text-black max-sm:text-[0.6em] max-sm:mt-0">
              Upload your progress picture
            </p>
          </div>
          </div>
       </div>
        </div>

        <section className="mb-10 w-full rounded-lg bg-white p-8 shadow-lg max-sm:mb-5 max-sm:p-5">
          <div className="mb-8">
            <h2 className="text-xl text-black max-sm:text-base">Progress Pictures</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-sm:text-base">
            {loadingImages ? (
              <div>Loading images...!!</div>
            ) : progressImage.length == 0 ? (
              <div>No images uploaded</div>
            ) : (
              progressImage.map((value) => {
                return <ImageComponent gifData={value.img.data.data} />;
              })
            )}
          </div>
        </section>

        
      </main>
    </>
  );
};

export default UserProgress;



const ImageComponent = ({ gifData }) => {
  // Assuming gifData is the base64 encoded GIF image data

  const createBase64String = (gifData) => {
    let binary = '';
    const bytes = new Uint8Array(gifData);
    const length = bytes.byteLength;

    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  };
  const base64String = createBase64String(gifData);

  return (
    <div>
      {gifData && (
        <img
          src={`data:image/png;base64,${base64String}`}
          className="rounded-lg object-cover h-full"
          alt="GIF Image"
        />
      )}
    </div>
  );
};
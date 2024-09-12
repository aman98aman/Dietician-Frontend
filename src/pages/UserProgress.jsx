import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { decodeJwt } from "./middelwares.js";
import { toast } from "react-toastify";
import axios from "axios";
import BMI from './BMI.jsx';
import api from "../components/AxiosInterceptor.js";

const UserProgress = () => {
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

        const resJson = await res.json();
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

      const resJson = await res.json();

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
      <main className="w-full bg-gray-200 p-4">
        <h1 className="mb-4 rounded-md bg-gray-300 p-5 text-center text-3xl text-gray-600">
          User Progress
        </h1>
        <div className="flex flex-wrap">
          <div className="w-full rounded bg-gray-300 py-8 text-center shadow md:w-2/4">
            <h2 className="font-serif text-2xl uppercase text-gray-500">BMI</h2>
            <span className="text-5xl text-gray-600">{BMIData}</span>
            <p className="text-3xl text-gray-600">
              {BMIData < 18.5
                ? "Underweight"
                : BMIData >= 18.5 && BMIData <= 24.9
                  ? "Normal"
                  : "Overweight / Obese"}
            </p>
            <div className="group relative mx-auto w-32 justify-center">
              <span className="text- rounded font-bold text-gray-600 shadow-sm">
                ⓘ
              </span>
              <span className="absolute top-10 w-full scale-0 rounded bg-gray-300 p-2 px-4 text-left text-xs text-gray-600 shadow-lg transition-all group-hover:scale-100">
                Skinny: {"<18.5"} <br /> Normal: 18.5 - 25 <br /> Obese: {">25"}{" "}
              </span>
            </div>
          </div>

          {/* Graph */}
          <div className="w-full rounded bg-gray-300 py-8 text-center shadow md:w-2/4">
            <h2 className=" text-black-500 font-serif text-2xl uppercase">
              Weight
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={bmiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-xs dark:text-slate-300">Weight Progress</p>
          </div>

          <div className="w-full rounded bg-gray-300 py-8 text-center shadow md:w-2/4">
            <h2 className=" mb-6 font-serif text-xl uppercase dark:text-gray-500">
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
              className="w-1/4 rounded bg-gray-200 px-3 py-3 text-center text-xl text-gray-600"
            />
            <button className="mx-auto mt-4 block rounded-full border border-gray-500 p-3 text-xs text-gray-600 hover:bg-gray-500 hover:text-gray-200">
              Click to Update
            </button>
          </div>

          <div className="w-full rounded bg-gray-300 p-10 py-8 text-center shadow md:w-2/4">
            <label className="my-4 block cursor-pointer rounded-lg border-2 border-dashed border-gray-600 py-10">
              <span className="mx-auto rounded-full bg-gray-600 px-4 py-1 text-center font-mono text-4xl font-bold  text-gray-300">
                +
              </span>
              <input
                type="file"
                className="invisible hidden w-full"
                onChange={handleUpload}
              />
            </label>
            <p className="mt-4 text-xs text-black ">
              Upload your progress picture
            </p>
          </div>
        </div>

        <section className="mb-10 w-full rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-8">
            <h2 className="text-xl text-black">Progress Pictures</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

        <div>
          <BMI data={bmiChartData} />
        </div>
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
import { Link, json } from "react-router-dom";
import IMAGES from "../assets";
import UserProgress from "./UserProgress";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
//import { useEffect } from "react";
import { useState } from "react";
// import { toast } from "react-toastify";

const UserProfile = () => {

  const [image, setImage] = useState("");

  const token = localStorage.getItem("dietToken");
  const decode = jwtDecode(token);

  const { firstName, lastName, email, phoneNumber, age, weight, height, gender, fitnessGoal, occupation, gymDaysPerWeek, } = decode.userData;

  async function getProfileData() {
    console.log("inside getprofiledata in userprofile", email)
    const response = await fetch("http://localhost:3333/users/getProfilePic", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    });

    const jsonData = await response.json();

    const gifData = jsonData?.data?.data?.data;
    console.log("data", gifData);

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
    console.log("base64String", base64String);
    setImage(base64String);
  }


  useEffect(() => {
    getProfileData();
  }, []);

  const handleImageUpload = async (e)=> {
    console.log("eeeeeeeeee-------->>>", e)

    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('email', JSON.stringify(decode.userData.email));

    const response = await fetch("http://localhost:3333/users/addProfilePic", {
      method : "POST",
      body : formData
    });

    const jsonData = await response.json();
    console.log("jsonData", jsonData);

    // if (jsonData.success) {
    //   getProfileData();
    //   toast.message("Successfully uploaded image");
    // } else {
    //   toast.error("got some problem", e);
    // }
  }

  return (
    <div className="dark">
      <main className="relative flex w-full flex-col  gap-4 bg-gray-100 p-5 lg:flex-row">
        <section className="left-0 top-20 h-fit w-full rounded-lg bg-white p-8 shadow-lg dark:bg-gray-300 lg:sticky lg:max-w-sm">
          <div className="mb-8">
            <h2 className="text-xl text-gray-600">Profile</h2>
          </div>
          <div className="w-full ">
            <div className="flex justify-center items-center">
              <div className="relative">
                <img
                  src={`data:image/png;base64,${image}`}
                  className="w-32 h-32 rounded-full object-cover cursor-pointer"
                  alt="GIF Image"
                  onClick={() => document.getElementById('fileInput').click()}
                />
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="mb-4 mt-8 flex flex-col gap-2 px-4 font-medium dark:text-gray-600">
              <span className="w-fit">{firstName} {lastName}</span>
              <span className="w-fit">{email}</span>
              <span className="w-fit">{phoneNumber}</span>
              <Link className="text-gray-600">Edit</Link>
            </div>
          </div>
        </section>

        <section>
          <section className="w-full rounded-lg p-8 shadow-lg bg-gray-200">
            <div className="mb-8">
              <h2 className="text-xl text-gray-600">Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 dark:text-slate-200 md:grid-cols-3">
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-gray-600">
                  Height
                </h4>
                <p className="text-gray-600">{height} cm</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Weight
                </h4>
                <p className="text-gray-600">{weight} kg</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">Age</h4>
                <p className="text-gray-600">{age}</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Gender
                </h4>
                <p className="text-gray-600">{gender}</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Fitness Goal
                </h4>
                <p className="text-gray-600">{fitnessGoal}</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Occupation
                </h4>
                <p className="text-gray-600">{occupation}</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow ">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Sleeping Time
                </h4>
                <p className="text-gray-600">10:00pm to 06:00am</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Timing of Workout
                </h4>
                <p className="text-gray-600">05:00pm to 06:00pm</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow ">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  No. of days in week
                </h4>
                <p className="text-gray-600">{gymDaysPerWeek}</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Any Medical Condition
                </h4>
                <p className="text-gray-600">No</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Any Injuries
                </h4>
                <p className="text-gray-600">No</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Vegetarian or Non Veg
                </h4>
                <p className="text-gray-600">Non Veg</p>
              </div>
            </div>
            <div className="my-8">
              <h2 className="text-xl text-gray-600">Membership</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 dark:text-slate-200 md:grid-cols-2">
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Status
                </h4>
                <p className="text-gray-600">Active</p>
              </div>
              <div className="rounded-md bg-gray-300 px-8 py-4 shadow ">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Expires on
                </h4>
                <p className="text-gray-600">4th July, 2024</p>
              </div>
            </div>
          </section>

          <section>
            <UserProgress />
          </section>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;

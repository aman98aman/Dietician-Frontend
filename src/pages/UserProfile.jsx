import { Link, json, useNavigate } from "react-router-dom";
import logo from "../assets/giphy.gif";
import { GoGoal } from "react-icons/go";
import { LuGoal } from "react-icons/lu";
import { FaUserTie } from "react-icons/fa6";
import { GiNightSleep } from "react-icons/gi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { LiaUserInjuredSolid } from "react-icons/lia";
import { PiHospital } from "react-icons/pi";
import { GiMuscleUp } from "react-icons/gi";
import { GiBodyHeight } from "react-icons/gi";
import { PiNotepadBold } from "react-icons/pi";
import { FaWeightScale } from "react-icons/fa6";
import { PiNotePencilDuotone } from "react-icons/pi";
import UserProgress from "./UserProgress";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { BiSolidNotepad } from "react-icons/bi";

//import { useEffect } from "react";
import { useState } from "react";
import api from "../components/AxiosInterceptor";
import RaiseRequest from "../components/RaiseRequest";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { decodeJwt } from "./middelwares";
// import { toast } from "react-toastify";

const UserProfile = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [image, setImage] = useState("");

  const [recommendation, setRecommendation] = useState();
  const token = localStorage.getItem("dietToken");
  const decode = jwtDecode(token);
  const navigate = useNavigate();
  console.log("token in navbar", token);
  const decoded = token && decodeJwt(token);
  console.log("decoded in navbar", decoded);

  const logoutHandler = () => {
    console.log("Inside the logout handler", localStorage.getItem("dietToken"));
    const removingItem = localStorage.removeItem("dietToken");
    console.log("removing item", removingItem);
    navigate("./");
  };

  useEffect(() => {
    if (decoded) {
      const userData = decoded.userData;
      api
        .post("/users/getUserDiet", { email: userData.email ?? "" })
        .then((res) => {
          const diet = res.data?.[0];
          setRecommendation(diet);
        });
    }
  }, []);

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    age,
    weight,
    height,
    gender,
    fitnessGoal,
    occupation,
    gymDaysPerWeek,
  } = decode.userData;

  async function getProfileData() {
    console.log("inside getprofiledata in userprofile", email);
    const response = await api.post(
      "/users/getProfilePic",
      JSON.stringify({ email: email }),
    );

    const jsonData = response;

    const gifData = jsonData?.data?.data?.data;

    const createBase64String = (gifData) => {
      let binary = "";
      const bytes = new Uint8Array(gifData);
      const length = bytes.byteLength;

      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      return btoa(binary);
    };

    const base64String = createBase64String(gifData);
    setImage(base64String);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  const handleImageUpload = async (e) => {
    console.log("eeeeeeeeee-------->>>", e);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("email", JSON.stringify(decode.userData.email));

    const response = await api.post("/users/addProfilePic", formData);

    const jsonData = await response;
    console.log("jsonData", jsonData);

    // if (jsonData.success) {
    //   getProfileData();
    //   toast.message("Successfully uploaded image");
    // } else {
    //   toast.error("got some problem", e);
    // }
  };

  return (
    <div className="dark flex w-full  ">
      <main className="grid grid-cols-12 gap-3 xl:flex-row w-full max-xl:flex max-xl:flex-col p-2 ">
        <section className="sticky top-5   col-span-2 flex h-fit flex-col gap-44 bg-white px-3 py-4 max-xl:hidden ">
          <div>
            <div className="flex items-center gap-1">
              <img className="w-9 rounded-lg" src={logo} alt="Fit Logo" />
              <div className="text-base font-bold text-red-500">
                Arsh-Sandhu
              </div>
            </div>
            <div className="flex flex-col gap-6 pl-5 pt-8 font-manrope text-gray-800">
              <a href="./#section1" className="flex items-center gap-3">
                <FaHome size={20} className="text-gray-600" />
                Home
              </a>
              <a href="">
               
                <Link
                  to={
                    decoded.userData.isUser
                      ? `/users/details/recommend/${recommendation?._id}`
                      : "/dashboard/admin"
                  }
                  state={decoded.userData}
                  className="flex items-center gap-3"
                >
                   <BiSolidNotepad size={20} className="text-gray-600" />
                  {decoded.userData.isUser ? "Diets" : "AdminPanel"}
                </Link>
              </a>
              <a
                href="https://wa.me/9814256639"
                className="flex items-center gap-3"
                
              >
                <IoMdContact size={24} className="text-gray-600" /> Contact
              </a>
              <button className="ml-4 w-20 rounded-2xl bg-gray-400 p-1 text-white">
                <a href="" onClick={logoutHandler}>
                  Log out
                </a>
              </button>
            </div>
          </div>

          <div className="flex w-full  flex-col items-center justify-center mt-[4em] rounded-2xl border-2 b bg-white p-4 shadow-md">
            <h1 className="mb-2 text-sm font-semibold text-gray-600 ">
              Membership
            </h1>
            <div className="mb-2 w-16 rounded-xl bg-red-400 text-center text-base text-white">
              Active
            </div>
            <p className=" text-xs text-gray-500"> Expires On:</p>
            <p className=" text-xs text-gray-500"> 4th July, 2024</p>
          </div>
        </section>
        <section className="sticky top-2 z-50 flex h-16 w-full items-center justify-between rounded-lg bg-slate-50 shadow-md xl:hidden">
          <div className="flex gap-1 p-2">
            <img className="w-9 rounded-lg" src={logo} alt="Fit Logo" />
            <div className="text-base font-bold text-red-500">Arsh-Sandhu</div>
          </div>
          <div className="relative pr-4">
            {toggleMenu ? (
              <RiCloseLine
                className="text-gray-700"
                size={30}
                onClick={() => setToggleMenu(false)}
              />
            ) : (
              <RiMenu3Line
                className="text-gray-700"
                size={30}
                onClick={() => setToggleMenu(true)}
              />
            )}
            {toggleMenu && (
              <div className="absolute right-1 flex w-[10em] flex-col gap-4  rounded-xl bg-gray-100 p-5 font-manrope text-gray-700">
                <a href="./#section1" className="flex items-center gap-3">
                  <FaHome size={20} className="text-gray-600" />
                  Home
                </a>
                <a href="" className="flex items-center gap-3">
                  <BiSolidNotepad size={20} className="text-gray-600" />
                  <Link
                    to={
                      decoded.userData.isUser
                        ? `/users/details/recommend/${recommendation?._id}`
                        : "/dashboard/admin"
                    }
                    state={decoded.userData}
                  >
                    {decoded.userData.isUser ? "Diets" : "AdminPanel"}
                  </Link>
                </a>
                <a
                  href="https://wa.me/9814256639"
                  className="flex items-center gap-3"
                >
                  <IoMdContact size={24} className="text-gray-600" /> Contact
                </a>
                <button className="ml-4 w-20 rounded-2xl bg-gray-400 p-1 text-white">
                  <a href="" onClick={logoutHandler}>
                    Log out
                  </a>
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="col-span-8 w-full rounded-lg  border-2 p-8 shadow-lg max-lg:p-5 max-sm:p-2 ">
          <div className="mb-10 flex  items-center justify-between font-serif text-2xl font-bold text-gray-700 max-lg:mb-4 max-sm:mb-2">
            <div className="font-manrope text-[2rem] max-sm:p-2 max-sm:text-xl">
              Hello, {firstName}
              <p className=" mt-2 font-roboto  text-xl font-light text-gray-500 max-sm:w-[18em] max-sm:text-sm">
                Track you progess here and achieve your goals.
              </p>
            </div>
            <GoGoal size={60} className="text-gray-700 max-sm:w-12" />
          </div>

          <hr className="h-[2px] w-full bg-gray-400 max-lg:h-[1.5px]" />

          <div className=" flex justify-evenly gap-8 p-5 max-sm:hidden max-sm:gap-1 max-sm:p-2">
            <div className="flex h-fit w-52 items-center gap-4 border-r-2 border-slate-400 max-sm:gap-2">
              <PiNotepadBold size={28} className="text-gray-500 max-sm:w-5" />
              <div className="flex flex-col ">
                <h4 className="text-bold font-serif text-sm text-gray-700 max-sm:text-xs">
                  Gender
                </h4>
                <p className=" text-bold text-xl max-sm:text-sm">{gender}</p>
              </div>
            </div>
            <div className="flex h-fit w-52 items-center gap-4 border-r-2 border-slate-400 ">
              <PiNotePencilDuotone
                size={28}
                className="text-gray-500 max-sm:w-5"
              />
              <div className="flex flex-col">
                <h4 className="text-bold font-serif text-sm text-gray-700 max-sm:text-xs">
                  Age
                </h4>
                <p className=" text-bold text-xl max-sm:text-sm">{age}</p>
              </div>
            </div>
            <div className="flex h-fit w-52 items-center gap-4 border-r-2 border-slate-400 ">
              <FaWeightScale size={25} className="text-gray-500 max-sm:w-5" />
              <div className="flex flex-col">
                <h4 className="text-bold font-serif text-sm text-gray-700 max-sm:text-xs">
                  Weight
                </h4>
                <p className="text-bold text-xl max-sm:text-sm">
                  {weight}
                  <span className="text-sm max-sm:text-xs"> kg</span>
                </p>
              </div>
            </div>
            <div className="flex h-fit w-52 items-center gap-4  ">
              <GiBodyHeight size={28} className="text-gray-600 max-sm:w-5" />
              <div className="flex flex-col">
                <h4 className="text-bold font-serif text-sm text-gray-700 max-sm:text-xs">
                  Height
                </h4>
                <p className="text-bold text-xl max-sm:text-sm">
                  {height} <span className="text-sm max-sm:text-xs"> cm</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:hidden ">
            <div className="flex h-fit items-center justify-center  gap-2 p-3">
              <PiNotepadBold size={28} className="text-gray-500 max-sm:w-5" />
              <div className="flex flex-col ">
                <h4 className="text-bold font-serif text-sm text-gray-700 max-sm:text-xs">
                  Gender
                </h4>
                <p className=" text-boldtext-sm">{gender}</p>
              </div>
            </div>
            <div className="flex h-fit items-center   justify-center gap-2 p-3">
              <PiNotePencilDuotone size={28} className="w-5 text-gray-500" />
              <div className="flex flex-col">
                <h4 className="text-bold font-serif text-xs text-gray-700">
                  Age
                </h4>
                <p className=" text-bold text-sm">{age}</p>
              </div>
            </div>
            <div className="flex h-fit items-center  justify-center gap-2 p-3">
              <FaWeightScale size={25} className="w-5 text-gray-500" />
              <div className="flex flex-col">
                <h4 className="text-bold font-serif text-xs text-gray-700">
                  Weight
                </h4>
                <p className="text-bold text-xl max-sm:text-sm">
                  {weight}
                  <span className="text-xs"> kg</span>
                </p>
              </div>
            </div>
            <div className="flex h-fit  items-center justify-center gap-2 p-3 ">
              <GiBodyHeight size={28} className="w-5 text-gray-600" />
              <div className="flex flex-col">
                <h4 className="text-bold font-serif text-sm text-gray-700 max-sm:text-xs">
                  Height
                </h4>
                <p className="text-bold text-sm">
                  {height} <span className="text-xs"> cm</span>
                </p>
              </div>
            </div>
          </div>

          <hr className="h-[2px] w-full bg-gray-400 max-sm:h-[1.5px]" />

          <section>
            <UserProgress />
          </section>

          <hr className="h-[2px] w-full bg-gray-400 max-sm:h-[1px] " />
          <div className="mt-6 ">
            <div className="pl-8 max-sm:pl-3">
              <h1 className="bg-gradient-to-b from-gray-400 to-zinc-800 bg-clip-text font-roboto text-[2rem] font-bold leading-snug text-transparent max-sm:text-base">
                Insight Before Action
              </h1>
              <p className=" bg-gradient-to-b from-gray-400 to-zinc-800 bg-clip-text font-roboto text-xl text-transparent max-sm:text-sm">
                The Power of Analysis for Smarter Decisions
              </p>
            </div>

            <div className="grid w-full grid-cols-2 grid-rows-4 gap-6 p-8 max-sm:gap-2 max-sm:p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <LuGoal
                    size={35}
                    className="rounded-full bg-gray-300 p-1 text-gray-600 max-sm:h-7 max-sm:w-7"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-sm text-slate-700 dark:text-slate-500 max-sm:text-[0.7em]">
                      Fitness Goal :
                    </h4>
                    <p className="text-xl text-gray-600 max-sm:text-sm">
                      {fitnessGoal}
                    </p>
                  </div>
                </div>
                <hr className="h-[2px] w-full bg-gray-400" />
              </div>

              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-5">
                  <FaUserTie
                    size={35}
                    className="rounded-full bg-gray-300 p-1 text-gray-600 max-sm:h-7 max-sm:w-7"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-sm text-slate-700 dark:text-slate-500 max-sm:text-[0.7em]">
                      Occupation:
                    </h4>
                    <p className="text-xl text-gray-600 max-sm:text-sm">
                      {" "}
                      {occupation}
                    </p>
                  </div>
                </div>
                <hr className="h-[2px] w-full bg-gray-400" />
              </div>

              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-5">
                  <GiNightSleep
                    size={35}
                    className="rounded-full bg-gray-300 p-1 text-gray-600 max-sm:h-7 max-sm:w-7"
                  />
                  <div className=" felx flex-col">
                    <h4 className="text-sm text-slate-700 dark:text-slate-500 max-sm:text-[0.7em]">
                      Sleeping Time :
                    </h4>
                    <p className="text-xl text-gray-600 max-sm:text-sm">
                      {" "}
                      10:00pm to 06:00am
                    </p>
                  </div>
                </div>
                <hr className="h-[2px] w-full bg-gray-400" />
              </div>

              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-5">
                  <GiMuscleUp
                    size={35}
                    className="rounded-full bg-gray-300 p-1 text-gray-600 max-sm:h-7 max-sm:w-7"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-sm text-slate-700 dark:text-slate-500 max-sm:text-[0.7em]">
                      Timing of Workout :
                    </h4>
                    <p className="text-xl text-gray-600 max-sm:text-sm">
                      {" "}
                      05:00pm to 06:00pm
                    </p>
                  </div>
                </div>
                <hr className="h-[2px] w-full bg-gray-400" />
              </div>

              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-5">
                  <FaRegCalendarAlt
                    size={32}
                    className="rounded-full bg-gray-300 p-1 text-gray-600 max-sm:h-7 max-sm:w-7"
                  />
                  <div>
                    <h4 className="text-sm text-slate-700 dark:text-slate-500 max-sm:text-[0.7em]">
                      Workout days in a week :
                    </h4>
                    <p className="text-xl text-gray-600 max-sm:text-sm">
                      {gymDaysPerWeek}
                    </p>
                  </div>
                </div>
                <hr className="h-[2px] w-full bg-gray-400" />
              </div>

              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-5">
                  <PiHospital
                    size={35}
                    className="rounded-full bg-gray-300 p-1 text-gray-600 max-sm:h-7 max-sm:w-7"
                  />
                  <div>
                    <h4 className="text-sm text-slate-700 dark:text-slate-500 max-sm:text-[0.7em]">
                      Any Medical Condition :
                    </h4>
                    <p className="text-xl text-gray-600 max-sm:text-sm"> No</p>
                  </div>
                </div>
                <hr className="h-[2px] w-full bg-gray-400" />
              </div>

              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-5">
                  <LiaUserInjuredSolid
                    size={35}
                    className="rounded-full bg-gray-300 p-1 text-gray-600 max-sm:h-7 max-sm:w-7"
                  />
                  <div>
                    <h4 className="text-sm text-slate-700 dark:text-slate-500 max-sm:text-[0.7em]">
                      Any Injuries :
                    </h4>
                    <p className="text-xl text-gray-600 max-sm:text-sm"> No</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-5">
                  <GiChickenOven
                    size={35}
                    className="rounded-full bg-gray-300 p-1 text-gray-600 max-sm:h-7 max-sm:w-7"
                  />
                  <div>
                    <h4 className="text-sm text-slate-700 dark:text-slate-500 max-sm:text-[0.7em] ">
                      Vegetarian or Non-Vegetarian :
                    </h4>
                    <p className="text-xl text-gray-600 max-sm:text-sm">
                      {" "}
                      Non Veg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" sticky top-5 col-span-2 h-fit rounded-2xl px-2.5 max-xl:flex max-xl:w-full max-xl:items-center max-xl:justify-evenly max-sm:p-4 max-[480px]:flex max-[480px]:w-full max-[480px]:flex-col max-[480px]:items-center">
          <div className=" mb-8 rounded-2xl bg-white p-3 shadow-lg max-xl:w-[40%] max-sm:mb-3 max-sm:p-4 max-[480px]:w-[80%] max-[480px]:text-xs">
            <div className="relative flex items-center justify-center ">
              <div className="items-center justify-center rounded-full border-2 border-gray-400 text-center">
                <img
                  src={`data:image/png;base64,${image}`}
                  className="h-28 w-28 cursor-pointer items-center justify-center rounded-full object-cover"
                  // alt="GIF Image "
                  onClick={() => document.getElementById("fileInput").click()}
                />
              </div>

              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="mb-4 mt-4 flex flex-col  items-center justify-center gap-[3px] font-manrope  dark:text-gray-600 max-sm:text-sm">
              <span className="w-fit font-semibold">
                {firstName} {lastName}
              </span>
              <i>
                <span className="w-fit font-sans font-normal">{email}</span>
              </i>
              <span className="w-fit  font-normal">{phoneNumber}</span>
              <div className="flex w-[3rem] items-center justify-center rounded-xl bg-gray-400 p-[3px] text-white">
                <Link className=" font-normal ">Edit</Link>
              </div>
            </div>
          </div>

          <div className="max-sm:text-sm flex flex-col gap-4">
            <RaiseRequest className="h-5" />
            <div className="xl:hidden flex w-full  flex-col items-center justify-center rounded-2xl border-2  bg-white p-4 shadow-md">
            <h1 className="mb-2 text-sm font-semibold text-gray-600 ">
              Membership
            </h1>
            <div className="mb-2 w-16 rounded-xl bg-red-400 text-center text-base text-white">
              Active
            </div>
            <p className=" text-xs text-gray-500"> Expires On:</p>
            <p className=" text-xs text-gray-500"> 4th July, 2024</p>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;

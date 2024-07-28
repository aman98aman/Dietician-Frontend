import React from "react";
import MarqueeText from "./MarqueeText";
import Photo1 from "../assets/Photo1.png";
import Photo2 from "../assets/Photo2.jpg";
import Photo3 from "../assets/Photo3.jpg";

const Upcoming = () => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900">
      <div className="mx-20 flex flex-wrap items-center justify-between gap-4 bg-none p-10">
        <div className="flex flex-col">
          <h1 className="text-md font-bold text-red-500">Our Fitness Trainings</h1>
          <h2 className="text-4xl text-gray-600 dark:text-gray-200">Upcoming Classes</h2>
        </div>
        <button className="rounded bg-black px-4 py-2 font-bold text-white hover:bg-gray-800">
          More
        </button>
      </div>
      <div className="flex flex-wrap justify-center bg-none px-3">
        <div className="flex max-w-7xl flex-wrap justify-center">
          {/* First Line of Boxes */}
          <div className="flex flex-wrap w-full justify-center">
            <div className="w-full p-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:animate-pulse hover:bg-none sm:w-1/3">
              <div className="rounded-lg bg-white/60 shadow-lg dark:bg-slate-950">
                <img src={Photo1} alt="Card" className="h-60 w-full rounded-t-lg object-cover" />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold dark:text-white">Yoga</h3>
                  <p className="mb-4 text-gray-700 dark:text-slate-300">
                    Yoga embodies a harmony of mind, body, and spirit, fostering inner peace and strength.
                    Its ancient wisdom guides us to breathe deeply, stretch gracefully, and find balance within.
                  </p>
                  <a href="#" className="text-blue-500">Read More</a>
                </div>
              </div>
            </div>
            <div className="w-full p-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:animate-pulse hover:bg-none sm:w-1/3">
              <div className="rounded-lg bg-white/60 shadow-lg dark:bg-slate-950">
                <img src={Photo2} alt="Card" className="h-60 w-full rounded-t-lg object-cover" />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold dark:text-white">Cardio</h3>
                  <p className="mb-4 text-gray-700 dark:text-slate-300">
                    Cardio exercises ignite our vitality, pumping energy into every beat of our hearts.
                    With each stride and rhythm, we push our limits, unlocking our endurance and stamina.
                  </p>
                  <a href="#" className="text-blue-500">Read More</a>
                </div>
              </div>
            </div>
            <div className="w-full p-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:animate-pulse hover:bg-none sm:w-1/3">
              <div className="rounded-lg bg-white/60 shadow-lg dark:bg-slate-950">
                <img src={Photo3} alt="Card" className="h-60 w-full rounded-t-lg object-cover" />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold dark:text-white">Gym</h3>
                  <p className="mb-4 text-gray-700 dark:text-slate-300">
                    In the gym, we sculpt our bodies into temples of strength, dedication, and resilience.
                    With every lift and press, we forge muscles and determination, surpassing our limits.
                  </p>
                  <a href="#" className="text-blue-500">Read More</a>
                </div>
              </div>
            </div>
          </div>

          {/* Second Line of Boxes */}
          <div className="flex flex-wrap w-full justify-center">
            <div className="w-full p-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:animate-pulse hover:bg-none sm:w-1/3">
              <div className="rounded-lg bg-white/60 shadow-lg dark:bg-slate-950">
                <img src={Photo1} alt="Card" className="h-60 w-full rounded-t-lg object-cover" />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold dark:text-white">Yoga</h3>
                  <p className="mb-4 text-gray-700 dark:text-slate-300">
                    Yoga embodies a harmony of mind, body, and spirit, fostering inner peace and strength.
                    Its ancient wisdom guides us to breathe deeply, stretch gracefully, and find balance within.
                  </p>
                  <a href="#" className="text-blue-500">Read More</a>
                </div>
              </div>
            </div>
            <div className="w-full p-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:animate-pulse hover:bg-none sm:w-1/3">
              <div className="rounded-lg bg-white/60 shadow-lg dark:bg-slate-950">
                <img src={Photo2} alt="Card" className="h-60 w-full rounded-t-lg object-cover" />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold dark:text-white">Cardio</h3>
                  <p className="mb-4 text-gray-700 dark:text-slate-300">
                    Cardio exercises ignite our vitality, pumping energy into every beat of our hearts.
                    With each stride and rhythm, we push our limits, unlocking our endurance and stamina.
                  </p>
                  <a href="#" className="text-blue-500">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarqueeText />
    </div>
  );
};



export default Upcoming;

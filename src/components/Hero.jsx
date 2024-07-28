import React from "react";
import Image from "../assets/Image.jpg";

const Hero = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <img
        src={Image}
        alt="Hero Image"
        className="h-full w-full object-cover"
      />
      <div className="absolute flex flex-col items-center justify-center text-white">
        <h1 className="mb-4 text-6xl font-bold text-white">Keep Your Body</h1>
        <h1 className="mb-8 text-6xl font-bold text-white">Fit and Strong</h1>
        <div className="flex space-x-4">
          <button className="rounded-half mr-4 bg-none px-8 py-6 text-xl font-bold text-white hover:rounded-full hover:bg-none hover:underline hover:decoration-blue-500 hover:decoration-wavy hover:outline-dashed">
            Learn More
          </button>
          <button className="animate-pulse rounded-full bg-lime-400 px-8 py-2 text-xl font-bold text-white hover:bg-green-600">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

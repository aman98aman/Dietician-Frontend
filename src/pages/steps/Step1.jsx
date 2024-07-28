import { useState } from "react";
import { Slide } from "react-awesome-reveal";

function Step1({ handleChange }) {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    handleChange(e); // Pass the event up to the parent component
  };

  return (
    <Slide>
      <div className=" min-w-fit rounded-lg bg-slate-200/50 px-10 py-10 backdrop-blur-sm">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Tell us About you
        </h2>
        <div className="mt-8 sm:w-[500px]">
          <div className="flex flex-wrap justify-center p-1.5">
            <div className="w-full p-1.5 sm:w-1/2">
              <select
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required={true}
              >
              <option value="" disabled selected>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
                </select>
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="number"
                placeholder="Age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="number"
                placeholder="Height (in cm.)"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                required={true}
              />
            </div>

            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="number"
                placeholder="Weight (in kg.)"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                required={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

export default Step1;

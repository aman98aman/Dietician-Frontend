import { useState } from "react";
import { Slide } from "react-awesome-reveal";

function Step4({ handleChange }) {
  const [formData, setFormData] = useState({
    injuries: "",
    allergies: "",
    fitnessGoal: "",
    gymDaysPerWeek: "",
    workoutTime: "",
    supplements: "",
    plan: "basic"
  });

  const [showDialog, setShowDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    handleChange(e); // Pass the event up to the parent component

    if (value === 'premium') {
      setShowDialog(true); // Show the dialog when "Premium Plan" is selected
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDialog(false); // Hide the dialog after selection
  };

  return (
    <Slide>
      <div className=" min-w-fit rounded-lg bg-slate-200/50 px-10 py-10 backdrop-blur-sm">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Other Details
        </h2>
        <div className="mt-8 sm:w-[500px]">
          <div className="flex flex-wrap justify-center">
            <div className="w-full p-1.5 sm:w-1/2">
              <select
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="Do you have any injuries?"
                name="injuries"
                value={formData.injuries}
                onChange={handleInputChange}
              >
                <option value="" disabled selected>Do you have any injuries?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <select
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="Do you have any allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
              >
                <option value="" disabled selected>Do you have any allergies</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="Fitness goal?"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full p-1.5 sm:w-1/2">
              <select
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="How many days gym per week?"
                name="gymDaysPerWeek"
                value={formData.gymDays}
                onChange={handleInputChange}
              >
                <option value="" disabled selected>How many days gym per week?</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <select
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="When do you workout?"
                name="workoutTime"
                value={formData.workoutTime}
                onChange={handleInputChange}
              >
                <option value="" disabled selected>When do you workout?</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="Supplements you use or used"
                name="supplements"
                value={formData.supplements}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <label className="inline-flex items-center">
                <input
                  className="h-4 w-4 text-gray-400 border-gray-300 focus:ring-gray-400 focus:ring-offset-1"
                  type="radio"
                  name="plan"
                  value="basic"
                  checked={formData.plan === "basic"}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-700">Basic Plan</span>
              </label>
            </div>

            <div className="w-full p-1.5 sm:w-1/2">
              <label className="inline-flex items-center">
                <input
                  className="h-4 w-4 text-gray-400 border-gray-300 focus:ring-gray-400 focus:ring-offset-1"
                  type="radio"
                  name="plan"
                  value="premium"
                  checked={formData.plan === "premium"}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-700">Premium Plan</span>
              </label>
            </div>

            {showDialog && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300">
                <div className="bg-white p-6 rounded-lg shadow-2xl transform transition-transform duration-300 scale-95 max-w-sm w-full">
                  {/* <img src={logo} alt="Company Logo" className="h-12 mx-auto mb-4" /> */}
                  <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">Choose Your plan</h2>
                  <div className="flex flex-col gap-4">
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-200"
                      onClick={() => handleOptionSelect('Bronze')}
                    >
                      Bronze
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-200"
                      onClick={() => handleOptionSelect('Silver')}
                    >
                      Silver
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-200"
                      onClick={() => handleOptionSelect('Gold')}
                    >
                      Gold
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>


      </div>



    </Slide>
  );
}

export default Step4;

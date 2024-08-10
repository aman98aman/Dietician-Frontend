import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import Meal from './Meal';
import getProfilePic from '../../../sideEffects/getProfilePic';


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


const SingleUser = () => {
    console.log("SingleUser component rendered");


    let location = useLocation();
    const [totalMeals, setTotalMeals] = useState([]);
    const [recommendedMeal, setrecommendedMeal] = useState({});
    const [progressImage, setProgressImages] = useState([]);
    const [profilePic, setProfilePic] = useState("");
    const [selectedButton, setSelectedButton] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [showOptionData, setShowOptionData] = useState([])
    const [loadingImages, setLoadingImages] = useState(false);
    const navigate = useNavigate();


    console.log("new progressImage is", progressImage);


    async function handleRecommendedDiet() {
        try {
            console.log("meals recommended is", recommendedMeal);
            const response = await fetch("http://localhost:3333/users/addUserDiet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: location.state.userData.email,
                    diet: recommendedMeal
                })
            })
            const jsonResponse = await response.json();
            if (jsonResponse.success) {
                toast.success(jsonResponse.message);
            } else {
                toast.error("Got some error");
            }
        } catch (error) {
            toast.error("Got some error", error)
        }
    }

    function addIngredients(firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber, newIngredientObject) {
        try {
            let newObj = JSON.parse(JSON.stringify(recommendedMeal));;
            newObj[firstDataObject][secondDataObject][thirdDataObject][fourthIndexNumber].ingredients.push(newIngredientObject)
            setrecommendedMeal(newObj);
            toast.success("Successfully added")
        } catch (error) {
            toast.error("Got some error");
        }
    }

    function updateIngredientsData(firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber, ingredientIndex, newIngredientObject) {
        try {
            let newObj = JSON.parse(JSON.stringify(recommendedMeal));;
            newObj[firstDataObject][secondDataObject][thirdDataObject][fourthIndexNumber].ingredients[ingredientIndex] = newIngredientObject;
            setrecommendedMeal(newObj);
            toast.success("Successfully updated");
        } catch (error) {
            toast.error("Got some error");
        }
    }

    function deleteIngredientData(firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber, ingredientIndex) {
        try {
            let newObj = JSON.parse(JSON.stringify(recommendedMeal));;
            newObj[firstDataObject][secondDataObject][thirdDataObject][fourthIndexNumber].ingredients = newObj[firstDataObject][secondDataObject][thirdDataObject][fourthIndexNumber].ingredients.filter((value, index) => {
                if (index === ingredientIndex) {
                    return false;
                }
                return true;
            })
            setrecommendedMeal(newObj);
            toast.success("Successfully deleted");
        } catch (error) {
            toast.error("Got some error");
        }
    }

    function updateMealName(firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber, newName) {
        try {
            let newObj = JSON.parse(JSON.stringify(recommendedMeal));;
            newObj[firstDataObject][secondDataObject][thirdDataObject][fourthIndexNumber].name = newName;
            setrecommendedMeal(newObj);
            toast.success("Successfully updated")
        } catch (error) {
            toast.error("Got some error", error);
        }

    }

    function deleteMeals(firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber) {
        try {
            let newObj = JSON.parse(JSON.stringify(recommendedMeal));                                     //{...recommendedMeal}; 
            newObj[firstDataObject][secondDataObject][thirdDataObject] = newObj[firstDataObject][secondDataObject][thirdDataObject].filter((_, index) => {

                if (index == fourthIndexNumber) {
                    return false;
                }
                return true;
            })
            setrecommendedMeal(newObj);
            toast.success("Successfully deleted");
        } catch (error) {
            toast.error("Got some error", error);
        }
    }

    function addMeal(firstDataObject, secondDataObject, thirdDataObject) {
        try {
            let newMeal = {
                name: "Random pls Change",
                ingredients: [
                    {
                        item: "",
                        protein: "",
                        fat: "",
                        carbs: "",
                        calories: ""
                    }
                ],
                total: {
                    protein: "",
                    fat: "",
                    carbs: "",
                    calories: ""
                }
            }
            let newObj = JSON.parse(JSON.stringify(recommendedMeal));;
            newObj[firstDataObject][secondDataObject][thirdDataObject].push(newMeal);
            setrecommendedMeal(newObj);
            toast.success("Succesfuly added in the last")
        } catch (error) {
            toast.error("Got some error")
        }
    }



    const handleSelectChange = (e) => {
            const selectedMeal = totalMeals.filter((meal) => meal?.name === e.target.value)
            navigate(`/dashboard/admin/Users/details/recommend/${selectedMeal?.[0]?._id}`,{ state:{userData : location.state.userData} })

    };

    const handleOptionChange = (e) => {
        try {
            setSelectedButton(e.target.name);
        } catch (error) {
            toast.error("Got some error", error);
        }
    }

    const height = location.state.userData.height / 100
    const bmi = Math.round(location.state.userData.weight / (height * height))

    useEffect(() => {
        const fetchMealData = async () => {
            const response = await fetch(`http://localhost:3333/diet/getMeal`)
            const jsonResponse = await response.json();
            setTotalMeals(jsonResponse.data);
        }
        fetchMealData();
    }, [location.state.userData])

    useEffect(() => {
        async function fetchImage() {
            //console.log("email is", location.state.userData.email)
            try {
                setLoadingImages(true);
                const res = await fetch("http://localhost:3333/users/getUsersPic", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: location.state.userData.email })
                });

                const resJson = await res.json();
                console.log("Res.json in the single user is", resJson);


                setProgressImages(resJson.data);

                setLoadingImages(false);

            } catch (e) {
                toast.error("Got some error", e)
            }
        }

        fetchImage();

    }, [location.state.userData])

    useEffect(() => {
        async function setingProfilePic() {
            const profilePic = await getProfilePic(location.state.userData.email);
            setProfilePic(profilePic);
        }
        setingProfilePic();
    }, [location.state.userData]);

    return (
        <main className="mx-4 my-4 p-2 md:mx-8 lg:mx-16">

            <section className="w-full rounded-lg bg-white p-8 mb-10 shadow-lg ">
                {/* <div className="flex md:justify-end flex-wrap gap-y-4 mb-8">
                    <button type="button"
                        className="flex items-center px-4 py-1 mx-2  rounded border text-rose-600 border-rose-600"
                        onClick={() => { }}>
                        <i className="ai ai-calendar-fill text-2xl mr-2"></i>
                        Schedule meet
                    </button>
                    <button type="button"
                        className="flex items-center px-4 py-1 mx-2  rounded border text-emerald-600 border-emerald-600"
                        onClick={() => { }}>
                        <i className="ai ai-bell-fill  text-2xl mr-2"></i>
                        Send Notification
                    </button>
                </div> */}
                <div className="mb-8">
                    <h2 className="text-xl dark:text-slate-300">Profile</h2>
                </div>
                <div className="flex flex-wrap justify-center">
                    <img
                        src={`data:image/png;base64,${profilePic}`}
                        className="h-28 w-28 rounded-full object-cover my-auto"
                        alt=""
                    />
                    <div className="mb-4 mt-8 px-12 flex flex-col  gap-0">
                        <span className="w-fit text-4xl">{`${location.state.userData.firstName + location.state.userData.lastName}`} <i className="ai ai-crown-fill text-amber-500"></i></span>
                        <span className="w-fit text-lg">{location.state.userData.email}</span>
                        <span className="w-fit text-lg">{location.state.userData.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-8">
                    <h2 className="text-xl dark:text-slate-300">Details</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Height
                        </h4>
                        <p>{`${location.state.userData.height} cm`}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Weight
                        </h4>
                        <p>{`${location.state.userData.weight} kg`}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">Age</h4>
                        <p>{location.state.userData.age}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Gender
                        </h4>
                        <p>{location.state.userData.gender}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Fitness Goal
                        </h4>
                        <p>{location.state.userData.fitnessGoal}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Occupation
                        </h4>
                        <p>{location.state.userData.occupation}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Sleeping Time
                        </h4>
                        <p>10:00pm to 06:00am</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Timing of Workout
                        </h4>
                        <p>05:00pm to 06:00pm</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            No. of days in week
                        </h4>
                        <p>{location.state.userData.gymDaysPerWeek}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Any Medical Condition
                        </h4>
                        <p>{location.state.userData.healthIssues}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Any Injuries
                        </h4>
                        <p>{location.state.userData.injuries}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Vegetarian or Non Veg
                        </h4>
                        <p>Non Veg</p>
                    </div>
                </div>
                <div className="my-8">
                    <h2 className="text-xl dark:text-slate-300">Membership</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 dark:text-slate-200 md:grid-cols-2">
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Status
                        </h4>
                        <p>Active</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Expires on
                        </h4>
                        <p>4th July, 2024</p>
                    </div>
                </div>
            </section>

            <section className="w-full rounded-lg mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative rounded bg-white p-16 text-center shadow-lg">
                        <h2 className=" font-serif text-2xl uppercase dark:text-slate-400">
                            BMI
                        </h2>
                        <span className="text-6xl text-lime-500">{bmi}</span>
                        <p className="mt-4 text-xs ">Normal</p>
                        <div className="group relative mx-auto flex w-32 justify-center">
                            <span className="text- rounded font-bold text-lime-500 shadow-sm">
                                ⓘ
                            </span>
                            <span className="absolute top-10 w-full scale-0 rounded bg-slate-100 p-2 px-4 text-left text-xs text-slate-900 shadow-lg transition-all group-hover:scale-100">
                                Skinny: {"<18.5"} <br /> Normal: 18.5 - 25 <br /> Obese: {">25"}{" "}
                            </span>
                        </div>
                    </div>
                    <div className="relative  rounded bg-white p-16 text-center shadow-lg  ">
                        <h2 className=" font-serif text-2xl uppercase dark:text-slate-400">
                            weight
                        </h2>
                        <span className="text-6xl text-lime-500">Graph</span>
                        <p className="mt-4 text-xs">here</p>
                    </div>
                </div>
            </section>

            <section className="w-full rounded-lg bg-white p-8 mb-10 shadow-lg">
                <div className="mb-8">
                    <h2 className="text-xl dark:text-slate-300">Progress Pictures</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {

                        (loadingImages) ? <div>Loading images...!!</div> : (progressImage.length == 0) ? <div>No images uploaded</div> : progressImage.map((value) => {
                            return <ImageComponent gifData={value.img.data.data} />
                        })
                    }
                </div>
            </section>

            <section className="w-full rounded-lg bg-white p-8 mb-10 shadow-lg">
                <div className="mb-8">
                    <h2 className="text-xl dark:text-slate-300">Diet Plan</h2>
                </div>







                <div className='flex flex-row gap-2'>
                    {showOptions && showOptionData.map((value) => (
                        <button
                            className={`bg-green-600 text-white rounded p-0.5 px-2 ${(value === selectedButton) ? 'border-solid border-4 border-indigo-600' : ''}`}
                            name={value}
                            onClick={handleOptionChange}
                        >
                            {value}
                        </button>
                    ))}
                </div>

                <div className="sm:w-64">
                    <label htmlFor="meal" className="block text-sm font-medium text-gray-700">
                        Add meal
                    </label>
                    <select
                        id="meal"
                        name="meal"
                        //value={selectedOption}
                        onChange={handleSelectChange}
                        className="mt-1 bg-green-600 text-white block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="" default>Select the diet from below</option>
                        {
                            totalMeals.map((meal) => <option value={meal?.name ?? ""}>{meal.name ?? ""}</option>)
                        }
                    </select>

                </div>

                {selectedButton && <button
                    className="bg-green-600 text-white rounded p-0.5 px-2 m-2"
                    onClick={handleRecommendedDiet}
                >
                    Recommend Diet
                </button>}

            </section>

            {/* <section className="w-full rounded-lg bg-white p-8 mb-10 shadow-lg">
                <div className="mb-8">
                    <h2 className="text-xl dark:text-slate-300">Workout Plan</h2>
                </div>

                <div className="relative overflow-x-auto sm:rounded-lg mb-10">
                    <table className="w-full max-w-lg text-sm text-left rtl:text-right text-gray-500  ">
                        <caption className="">
                            <h3 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">Routine</h3>
                        </caption>
                        <tbody className="">
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Monday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Chest & Triceps
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Tuesday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Legs
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Wednesday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Cardio
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Thursday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Back & Biceps
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Friday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Shoulders & Traps
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Saturday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Arms
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Sunday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Rest
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="relative overflow-x-auto sm:rounded-lg mb-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <caption>
                            <h3 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">Monday - Chest & Triceps</h3>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Exercise
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sets
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Reps
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rest
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Warmup"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"PUSH UPS + TRICEPS PRESS DOWN"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={2}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"15-20"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Regular Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"DB INCLINE PRESS"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={4}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Regular Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"MACHINE PEC FLY"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={3}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"High Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"CABLE CROSS"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-12"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"30 sec"}
                                        className="outline-none p-1 w-16"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Regular Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"DB TRICEP EXTENSION"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={4}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Regular Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"TRICEP PUSHDOWN"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={4}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td className="pt-2">
                                    <button className="bg-green-600 text-white rounded p-0.5 px-2 m-2">
                                        <i className="ai ai-plus-bold  text-xs"></i> Add More
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>



            </section> */}
        </main>
    )
}

export default SingleUser

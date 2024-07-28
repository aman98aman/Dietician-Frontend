import { useEffect, useState } from "react"
import { decodeJwt } from "../../middelwares"
import { toast } from "react-toastify"




const Meals = () => {

    const [meals, setMeals] = useState({})
    console.log("meals are", meals);

    useEffect(() => {
        async function fetchData() {
            try {
                const decoded = decodeJwt(localStorage.getItem("dietToken"));
                console.log("decoded in meals", decoded);
                const response = await fetch("http://localhost:3333/users/getUserDiet", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: decoded.userData.email }),
                    // Include credentials (cookies) in the request
                })

                const jsonResponse = await response.json();
                console.log("response is", jsonResponse);
                setMeals(jsonResponse.data[0] || {});
            } catch (e) {
                toast.error("Something went wrong")
            }
        }

        fetchData();

    }, [])

    return (Object.keys(meals).length == 0) ? (<div>No recommendation yet...</div>) : (
        <>
            {
                Object.keys(meals).map((selectedButton) => {
                    if (selectedButton == "categoryName" || selectedButton == "_id") {
                        return null;
                    }
                    console.log(selectedButton)
                    return Object.keys(meals[selectedButton]).map((value1) => (
                        <div key={value1}>
                            <h1 className="mb-4 text-lg text-emerald-600 dark:text-slate-300 text-center">
                                {value1.toUpperCase()}
                            </h1>
                            {Object.keys(meals[selectedButton][value1]).map((value2) => {
                                if (value2 === "instructions") {
                                    return (
                                        <div key={value2}>
                                            <h2 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">
                                                {value2.toUpperCase()}
                                            </h2>
                                            <ul>
                                                {meals[selectedButton][value1][value2].map((value3, index) => (
                                                    <li key={index}>{value3}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={value2}>
                                            <h2 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">
                                                {value2.toUpperCase()}
                                            </h2>
                                            
                                            {meals[selectedButton][value1][value2].map((value3, index) => {
                                                return <Meal
                                                    key={index}
                                                    ingredients={value3.ingredients}
                                                    name={value3.name}
                                                    index={index}
                                                    total={value3.total}
                                                    note={value3.note}

                                                />
                                            })}

                                        </div>
                                    );
                                }
                            })}
                        </div>
                    ))
                })
            }
        </>
    )
}

const Meal = ({ ingredients, name, index, total, note, }) => {

    return (
        <div className="relative overflow-x-auto sm:rounded-lg mb-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                <caption>
                    <h3 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">{`Meal ${index + 1}`}</h3>
                    <h6
                        className="mb-4 text-lg text-emerald-600 dark:text-slate-300"
                    >
                        {name}
                    </h6>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Ingredients
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Protein
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fat
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Carbs
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Calories
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>



                    {ingredients.map((ingredient, ingedientIndex) =>
                        // <MealIngredientRow
                        //     ingredient={ingredient}
                        //     mealIndex={index}
                        //     ingredientArrIndex={ingedientIndex}
                        //     updateIngredientsData={updateIngredientsData}
                        //     firstDataObject={firstDataObject}
                        //     secondDataObject={secondDataObject}
                        //     thirdDataObject={thirdDataObject}
                        //     fourthIndexNumber={fourthIndexNumber}
                        //     deleteIngredientData={deleteIngredientData}
                        // />

                        <tr className="bg-white border-b hover:bg-gray-50  ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                <input
                                    disabled
                                    value={ingredient.item}
                                    className="outline-none p-1 w-auto"
                                    type="text" name="item" id=""
                                    placeholder="Enter Ingredients name"
                                />
                            </th>
                            <td className="px-6 py-4">
                                <input
                                    disabled
                                    //value={ingredientState.protein }
                                    className="outline-none p-1 w-full"
                                    type="number" name="protein" id=""
                                    placeholder={ingredient.protein}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    disabled
                                    // value={ingredientState.fat || 0}
                                    className="outline-none p-1 w-full"
                                    type="number" name="fat" id=""
                                    placeholder={ingredient.fat}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    disabled
                                    // value={ingredientState.carbs || 0}
                                    className="outline-none p-1 w-full"
                                    type="number" name="carbs" id=""
                                    placeholder={ingredient.carbs}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    disabled
                                    // value={ingredientState.calories || 0}
                                    className="outline-none p-1 w-full"
                                    type="number" name="calories" id=""
                                    placeholder={ingredient.calories}
                                />
                            </td>

                        </tr>

                    )
                    }

                    {/* <tr>
                        <td className="pt-2">
                            <button
                                className="bg-green-600 text-white rounded p-0.5 px-2 m-2"
                                onClick={handleAddMore}
                            >
                                <i className="ai ai-plus-bold  text-xs"></i> Add More
                            </button>
                        </td>
                    </tr> */}

                </tbody>
                <tfoot>
                    <tr className="bg-white border-b hover:bg-gray-50  ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                            <input disabled
                                value={"Total"}
                                className="outline-none p-1 w-auto"
                                type="text" name="" id="" />
                        </th>
                        <th className="px-6 py-4">
                            <input disabled
                                value={total.protein || "0"}
                                className="outline-none p-1 w-full"
                                type="number" name="" id="" />
                        </th>
                        <th className="px-6 py-4">
                            <input disabled
                                value={total.fat || "0"}
                                className="outline-none p-1 w-full"
                                type="number" name="" id="" />
                        </th>
                        <th className="px-6 py-4">
                            <input disabled
                                value={total.carbs || "0"}
                                className="outline-none p-1 w-full"
                                type="number" name="" id="" />
                        </th>
                        <th className="px-6 py-4">
                            <input disabled
                                value={total.calories || "0"}
                                className="outline-none p-1 w-full"
                                type="number" name="" id="" />
                        </th>

                    </tr>
                </tfoot>
                <p>{note}</p>
            </table>

        </div>
    )
}

export default Meals

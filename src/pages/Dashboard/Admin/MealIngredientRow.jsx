import { useEffect, useState } from "react";

const MealIngredientRow = ({ ingredient, updateIngredientsData, ingredientArrIndex, firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber, deleteIngredientData}) => {
    

    const [ingredientState, setIngredientState] = useState(ingredient);
    const [showSaveButton, setShowSaveButton] = useState(false);
    //console.log("ingredientState in the MealIngredientrow", ingredientState);

    function handleOnChange(e){
        setShowSaveButton(true);
        console.log("handle on change is running")
        setIngredientState({...ingredientState, [e.target.name]: e.target.value});
    }

    function handleSaveChanges(){
        updateIngredientsData(firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber, ingredientArrIndex, ingredientState);
        console.log("Inside handlesave changes")
        setShowSaveButton(false);
    }

    function handleDelete(){
        deleteIngredientData(firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber, ingredientArrIndex);
    }

    useEffect(()=>{
        setIngredientState(ingredient);
    },[ingredient])

    return (
        <tr className="bg-white border-b hover:bg-gray-50  ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                <input
                    value={ingredientState.item}
                    className="outline-none p-1 w-auto"
                    type="text" name="item" id=""
                    placeholder="Enter Ingredients name"
                    onChange={handleOnChange}
                />
            </th>
            <td className="px-6 py-4">
                <input
                    //value={ingredientState.protein }
                    className="outline-none p-1 w-full"
                    type="number" name="protein" id=""
                    placeholder={ingredientState.protein }
                    onChange={handleOnChange}
                />
            </td>
            <td className="px-6 py-4">
                <input
                    // value={ingredientState.fat || 0}
                    className="outline-none p-1 w-full"
                    type="number" name="fat" id=""
                    placeholder={ingredientState.fat}
                    onChange={handleOnChange}
                />
            </td>
            <td className="px-6 py-4">
                <input
                    // value={ingredientState.carbs || 0}
                    className="outline-none p-1 w-full"
                    type="number" name="carbs" id=""
                    placeholder={ingredientState.carbs}
                    onChange={handleOnChange}
                />
            </td>
            <td className="px-6 py-4">
                <input
                    // value={ingredientState.calories || 0}
                    className="outline-none p-1 w-full"
                    type="number" name="calories" id=""
                    placeholder={ingredientState.calories}
                    onChange={handleOnChange}
                />
            </td>
            <td className="px-6 py-4 text-right">
                {showSaveButton && <button 
                className="font-medium text-blue-600 hover:underline"
                onClick={handleSaveChanges}
                >
                    <i className="ai ai-note-pencil mx-1"></i>
                </button>}
                <button 
                className="font-medium text-rose-500 hover:underline"
                onClick={handleDelete}
                >
                    <i className="ai ai-trash-fill mx-1"></i>
                </button>
            </td>
        </tr>
    )
}


export default MealIngredientRow;
import { useState } from "react";


export default function MealName({name, firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber, updateMealName,deleteMeals}){
    const [editMealName, setEditMealName] = useState(false);
    const [mealName, setMealName] = useState(name);


    function handleSave(){
        updateMealName(firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber, mealName);
        setEditMealName(false);
    }

    function handleDelete(){
        deleteMeals(firstDataObject, secondDataObject, thirdDataObject, fourthIndexNumber);
    }

    return(
        <>
        {!editMealName && <><h6
            className="mb-4 text-lg text-emerald-600 dark:text-slate-300"
            onClick={() => setEditMealName(true)}
        >
            {name}
        </h6>
        
        <button 
                className="font-medium text-rose-500 hover:underline"
                onClick={handleDelete}
                >
                    <i className="ai ai-trash-fill mx-1"></i>
                </button>
        </>
        }

        {
            editMealName && <><input
                placeholder={name}
                onChange={(e)=> setMealName(e.target.value)}
            />
                <button
                    className="bg-green-600 text-white rounded p-0.5 px-2 m-2"
                    onClick={handleSave}
                >
                    Save
                </button></>
        }
        </>
    )
}
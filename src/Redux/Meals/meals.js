const initialState = {
    totalMeals:[],
    recommendedMeals:[]
}


export default function Meal(state=initialState, action){
    console.log("Inside meals reducer and action.payload is", action.payload)
    if(action.type === "populateTotalMeals"){
        return{
            ...state,
            totalMeals:action.payload
        }
    }
    return state;
}
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authReducer"
import userDetails from "./userDetails/userDetails";
import Meal from "./Meals/meals";


const store = configureStore({
    reducer:{
        loginDetail: authReducer,
        allUser: userDetails,
        meal: Meal
    }
})

export default store;
const initialState = {
    userArr: []
}

export default function userDetails(state=initialState, action){
    console.log("Inside userdetails reducer and action.payload is", action.payload)
    if(action.type = "setUserDetails"){
        let arr = action.payload;
        return {
            userArr : arr
        }
    }
    return state;
}
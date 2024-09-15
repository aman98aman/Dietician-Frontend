import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { decodeJwt } from '../pages/middelwares';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from "./AxiosInterceptor";


const RaiseRequest = () => {
    const [disableBtn, setDisableBtn] = useState(false)
    const navigate = useNavigate();
    const inputRef = useRef();
    const token = localStorage.getItem("dietToken");
    const decoded = token ? decodeJwt(token) : null;
    console.log("decoded is in Raise request", decoded)

    const handleSubmit = async (e) => {
        setDisableBtn(true)
        e.preventDefault();
        const userData = decoded?.userData;
        let reqBody = {
            name: userData.name,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            description: inputRef.current.value
        }
        const res = await api.post(
          "/request/postRequest",
          JSON.stringify(reqBody),
        );
        const resJson = res;
        if (resJson.success) {
            toast("Succcesfully sent")
            setDisableBtn(false)
        } else {
            toast("Something went wrong")
            setDisableBtn(false)
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <ToastContainer />
            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Submit Your Request</h2>



                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                    <input
                        type="text"
                        id="description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description"
                        ref={inputRef}
                    />
                </div>

                <div className="text-center">
                    <button
                        disabled={disableBtn}
                        className={`${disableBtn ? ' bg-gray-200' : ""} w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        onClick={handleSubmit}
                    >
                        {disableBtn ? "Sending..." : "Submit"}
                    </button>
                </div>
            </form >
        </div >
    );
}

export default RaiseRequest;

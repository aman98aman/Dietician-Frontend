import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { decodeJwt } from "../pages/middelwares"; // Assuming 'middlewares' is correctly named

export default function Protectedroutes({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(null); // New state to manage authorization

    const token = localStorage.getItem("dietToken");
    const decoded = token ? decodeJwt(token) : null;

    const currentPath = location.pathname.split("/")[1];
    // console.log("current path in the protected route is", currentPath);
    // console.log("Condition is", token !== null && decoded?.isAdmin === true && decoded?.isUser === false);
    // console.log("token inside protectedroute is", token);
    // console.log("decoded jwt in the protected route is", decoded);

    useEffect(() => {
        if (!token) {
            navigate("/auth/login");
        } else if (currentPath === "dashboard") {
            if (decoded?.userData.isAdmin === true && decoded.userData.isUser === false) {
                setIsAuthorized(true);
            } else {
                navigate("/");
            }
        } else if (currentPath === "fitness" || currentPath === "UserProfile" || currentPath === "UserProgress" || currentPath === "raiseRequest") {
            if (decoded?.userData.isAdmin === false && decoded?.userData.isUser === true) {
                setIsAuthorized(true);
            } else {
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, []);

    if (isAuthorized === null) {
        return null; // Or a loading spinner if you prefer
    }

    return isAuthorized ? children : null;
}


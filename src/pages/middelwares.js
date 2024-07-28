import {jwtDecode} from "jwt-decode";

export function decodeJwt(token){
    return jwtDecode(token);
}


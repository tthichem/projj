import { jwtDecode } from "jwt-decode";

export const decoderToken = (token) => {
    if(!token) return null;
    try{
        return jwtDecode(token);
    }
    catch(error){
        return null;
    }
};

export const hasRole = (token, allowedRoles) =>{
    const decoded = decoderToken(token);
    return decoded && allowedRoles.includes(decoded.role);
}
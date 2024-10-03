import { jwtDecode } from "jwt-decode";

export const isTokenValid = ()=>{
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        // Check if the token is expired
        return decoded.exp > currentTime;
    } catch (error) {
        console.error("Invalid token", error);
        return false;
    }
}

export const saveToken = (token) =>{
    localStorage.setItem('authToken',token);
}

export const logOut = ()=>{
    localStorage.removeItem('authToken');
}

export const getToken = ()=>{
    return localStorage.getItem('authToken');
}
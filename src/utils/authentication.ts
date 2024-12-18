import { getCookie } from "./cookie";

export const isAuthenticated = () => {
    const token = getCookie("jwt_access_token");

    if (token === undefined || token === null || token === "") {
        return false;
    }

    return true;
};

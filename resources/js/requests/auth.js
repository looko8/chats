import axios from "axios";

export const sanctum = () => {
    return axios.get("/sanctum/csrf-cookie");
};

export const login = (data) => {
    return axios.post("api/login", data);
};

export const register  = (data) => {
    return axios.post('api/register', data);
};

export const logout = () => {
    return axios.post('api/logout');
};

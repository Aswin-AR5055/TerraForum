import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("interceptor token:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized, redirecting to login");

            localStorage.removeItem("token");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;
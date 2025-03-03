import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "https://edwise.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to attach the Bearer token
apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;

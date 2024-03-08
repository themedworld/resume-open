import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/v1/users"
});

export default axiosInstance;
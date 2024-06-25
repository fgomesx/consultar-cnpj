import axios from "axios";

const api = axios.create({
    baseURL: "https://minhareceita.org/"
})

export default api;

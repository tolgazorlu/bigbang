import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8000" : '/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default apiClient;
import axios from "axios"

const BASE_URL = 'http://localhost:9000/api/'

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" }
})

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const ApiCall = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data)
        return { success: true, data: response.data }
    } catch (error) {
        const message = error.response?.data?.error || error.response?.data?.message || "Something went wrong"
        return { success: false, error: message }
    }
}
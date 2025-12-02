import axios from "axios"
import { jwtDecode } from "jwt-decode"

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

export const ApiCall = async (endpoint, extraData = {}) => {
    try {
        const token = sessionStorage.getItem("token")
        const body = { Token: token, ...extraData }

        const response = await api.post(endpoint, body, {
            headers: { "Content-Type": "application/json" }
        })
        return { success: true, data: response.data }
    } catch (error) {
        const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Something went wrong"

        return { success: false, error: message }
    }
}

export const roleRoutes = {
    1: "/super_admin",
    2: "/admin",
    3: "/warehouse",
    4: "/store_manager",
    5: "/purchase",
    6: "/accountant",
    7: "/delivery"
};

export function getTokenData() {
    try {
        const token = sessionStorage.getItem("token")
        if (!token) return null

        const decoded = jwtDecode(token)
        console.log("Decoded Token:", decoded)

        return decoded
    } catch (error) {
        console.error("Error decoding token:", error)
        return null
    }
}

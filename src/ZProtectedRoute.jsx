import React from "react"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, allowed }) {
    const token = sessionStorage.getItem("token")
    const role = Number(sessionStorage.getItem("role"))

    if (!token) return <Navigate to="/" replace />

    if (!allowed.includes(role))
        return <Navigate to="/not-authorized" replace />

    return children
}

export default ProtectedRoute
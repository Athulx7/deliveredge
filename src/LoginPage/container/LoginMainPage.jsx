import React from 'react'
import CarousalComponent from '../component/CarousalComponent'
import LoginComponent from '../component/LoginComponent'

function LoginMainPage() {
    return (
        <>
            <div className="min-h-screen bg-indigo-500 flex flex-col md:flex-row">
                <CarousalComponent />
                <LoginComponent />
            </div>
        </>
    )
}

export default LoginMainPage

import React, { useState } from 'react'
import { faArrowRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginComponent() {
    const navigate = useNavigate()
    const [isCompanyLogin, setIsCompanyLogin] = useState(false)
    const [isLoginLoader, setIsLoginLoader] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        companyName: '',
        userId: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        companyName: '',
        userId: '',
        loginError: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        let valid = true
        const newErrors = {}

        if (isCompanyLogin) {
            if (!formData.companyName.trim()) {
                newErrors.companyName = 'Please enter company name'
                valid = false
            }
            if (!formData.userId.trim()) {
                newErrors.userId = 'Please enter user ID'
                valid = false
            }
            if (!formData.password) {
                newErrors.password = 'Please enter password'
                valid = false
            }
        } else {
            if (!formData.email.trim()) {
                newErrors.email = 'Please enter email'
                valid = false
            } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
                newErrors.email = 'Email is invalid'
                valid = false
            }
            if (!formData.password) {
                newErrors.password = 'Please enter password'
                valid = false
            } else if (formData.password.length < 3) {
                newErrors.password = 'Password must be at least 3 characters'
                valid = false
            }
        }
        setErrors(newErrors)
        return valid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        setIsLoginLoader(true)
        setErrors(prev => ({ ...prev, loginError: '' }))
        try {
            const url = 'http://localhost:9000/api/login'
            const payload = { email: formData.email, password: formData.password }
            const response = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' } })
            console.log('✅ Login successful:', response.data.token)
            if(response.data.token.length > 0){
                sessionStorage.setItem('token', response.data.token)
                navigate('/dash')
            }
        } catch (error) {
            console.error('Login failed:', error)
            setErrors(prev => ({ ...prev, loginError: message }))
        }
        setIsLoginLoader(false)
    }

    return (
        <>
            <div className="md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            {isCompanyLogin ? 'Login with Company Account' : 'Welcome back!'} <h1 className="text-4xl md:hidden font-bold mb-6 flex items-center gap-2">
                        {/* <FontAwesomeIcon icon={faMicrochip} className="text-blue-400" /> */}
                       To Deliver<span className="text-indigo-200">Edge</span>
                    </h1>
                        </h2>

                        {!isCompanyLogin && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                        required
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="remember" className="mr-2" />
                                        <label htmlFor="remember" className="text-gray-700">Remember me</label>
                                    </div>
                                    <a href="#" className="text-indigo-600 hover:underline">Forgot password?</a>
                                </div>
                            </>
                        )}

                        {isCompanyLogin && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                        required
                                    />
                                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">User ID</label>
                                    <input
                                        type="text"
                                        name="userId"
                                        value={formData.userId}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.userId ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                        required
                                    />
                                    {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                        required
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={isLoginLoader}
                            className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center ${isLoginLoader ? 'cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoginLoader ? (
                                <FontAwesomeIcon
                                    icon={faCircleNotch}
                                    className="animate-spin h-5 w-5"
                                />
                            ) : (
                                <>
                                    Sign In
                                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                                </>
                            )}
                        </button>

                        {errors.loginError && (
                            <p className='text-center text-red-500 mt-1'>{errors.loginError}</p>
                        )}

                        <div className="mt-3 text-center">
                            <p className="text-gray-600">
                                <button
                                    type="button"
                                    onClick={() => setIsCompanyLogin(!isCompanyLogin)}
                                    className="text-indigo-600 hover:underline cursor-pointer font-medium"
                                >
                                    {isCompanyLogin
                                        ? 'Login with Email instead'
                                        : 'Login with Company Account'}
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginComponent
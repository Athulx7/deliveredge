import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './DashBoard/Container/Dashboard'
import LoginMainPage from './LoginPage/container/LoginMainPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginMainPage />} />
        <Route path='/dash' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

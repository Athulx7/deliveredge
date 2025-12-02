import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './DashBoard/Container/Dashboard'
import LoginMainPage from './LoginPage/container/LoginMainPage'
import ProtectedRoute from './ZProtectedRoute'
import AdminDashboard from './DashBoard/components/Admin/AdminDashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginMainPage />} />
        <Route path='/dash' element={<Dashboard />} />

        <Route path="/admin"
          element={ <ProtectedRoute allowed={[2]}>  <Dashboard role={2} /></ProtectedRoute>}
        >
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

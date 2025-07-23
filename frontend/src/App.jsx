import React, { useEffect } from 'react';
import { Routes,Route, Navigate } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import useAuthStore from './stores/useAuthStore'

function App() {
  const { user,checkAuth } = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  return (
   <>
   <Navbar/>
    <Routes>
      <Route path="/" element={user ? <HomePage/> : <Navigate to="login"/>}/>
      <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to="/"/>}/>
      <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/>}/>
    </Routes>
   </>
   
  )
}

export default App

import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ProtectedRoute = () => {
    const user = useSelector((state) => state.user.user)
  return user ? <Outlet /> : <Navigate to={'/'}/>
}

export default ProtectedRoute
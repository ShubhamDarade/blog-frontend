import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    let islogin = localStorage.getItem('userId')
    return (
        <>
            {
                islogin ? <Outlet /> : <Navigate to='login' />
            }
        </>
    )
}

export default ProtectedRoutes
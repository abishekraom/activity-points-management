import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { getData } from '../context/userContext.jsx';

function ProtectedRoute() {
    const { user, loading } = getData();
    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
        );

    if (!user) {
    return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
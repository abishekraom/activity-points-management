import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { getData } from '../context/userContext.jsx';

// Add 'adminOnly' prop to handle different access levels
function ProtectedRoute({ adminOnly = false }) {
    const { user, loading, isAdmin } = getData(); // Destructure isAdmin from context

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );

    // 1. If not logged in at all, go to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. If page requires admin but user is NOT an admin, redirect to student dashboard
    if (adminOnly && !isAdmin) {
        return <Navigate to="/StudentHome.jsx" replace />;
    }

    // 3. User is authorized
    return <Outlet />;
}

export default ProtectedRoute;
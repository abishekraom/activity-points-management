import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { getData } from '../context/userContext.jsx';

// We replace adminOnly with requiredRole (e.g., 'admin' or 'counselor')
function ProtectedRoute({ requiredRole }) {
    const { user, loading } = getData();

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );

    // 1. If not logged in, go to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. If a specific role is required (admin or counselor)
    if (requiredRole && user.role !== requiredRole) {
        // If they are unauthorized, send them back to the root (Student Home)
        return <Navigate to="/" replace />;
    }

    // 3. User is authorized
    return <Outlet />;
}

export default ProtectedRoute;
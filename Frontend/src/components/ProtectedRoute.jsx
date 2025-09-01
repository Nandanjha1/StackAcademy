import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Context } from '../main.jsx';

// This component checks if a user is logged in and has the required role
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useContext(Context);
    const location = useLocation();

    // 1. Check if user is authenticated
    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them back there after they log in.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Check if the user's role is allowed to access this route
    // The `user` object must be populated from your context
    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
        // User is logged in but doesn't have the right role, send to a "not authorized" page or home
        // For simplicity, we'll send them to the home page.
        return <Navigate to="/" replace />;
    }

    // 3. If all checks pass, render the component
    return children;
};

export default ProtectedRoute;

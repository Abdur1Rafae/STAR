import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAllowed = () => {
        return !!localStorage.getItem('questions'); 
    };

    return isAllowed() ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;

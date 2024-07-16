import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({element: Component, check,  ...rest }) => {
    const isAllowed = () => {
        return !!sessionStorage.getItem(check); 
    };

    return isAllowed() ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;

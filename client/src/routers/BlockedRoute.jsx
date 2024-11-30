import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const BlockedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    let route = "/"

    return isAuthenticated ? <Navigate to={route} /> : children;
};

export default BlockedRoute;
import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
    const location = useLocation();
    const authenticated = false;

	return authenticated ? <Outlet /> : <Navigate to="/login"  replace state={{ from: location }} />;
}

export default PrivateRoute
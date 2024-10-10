import React, { useContext } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = () => {
    const {user} = useContext(AuthContext);
    const location = useLocation();

	return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute
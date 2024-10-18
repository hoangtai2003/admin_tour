import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SidebarContext } from '../../../context/SideBarContext';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(SidebarContext);
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

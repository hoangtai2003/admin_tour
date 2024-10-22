import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SidebarContext } from '../../../context/SideBarContext';

const PrivateRoute = ({ children, requiredPermission }) => {
    const { user, isLoading, userPermissions } = useContext(SidebarContext);
    
    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!user || !userPermissions.length) {
        return <Navigate to="/login" />;
    }

    if (!userPermissions.includes(requiredPermission)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};




export default PrivateRoute;

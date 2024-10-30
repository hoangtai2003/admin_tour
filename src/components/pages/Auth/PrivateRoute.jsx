import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SidebarContext } from '../../../context/SideBarContext';

const PrivateRoute = ({ children, requiredPermission }) => {
    const { isLoading, token, userPermissions } = useContext(SidebarContext);

    // Hiển thị loading nếu đang tải dữ liệu hoặc chưa có dữ liệu permissions
    if (isLoading || userPermissions.length === 0) {
        return <div>Loading...</div>;
    }

    // Kiểm tra token, nếu không có thì chuyển đến trang login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Kiểm tra quyền truy cập, nếu không đủ quyền chuyển đến trang unauthorized
    if (!userPermissions.includes(requiredPermission)) {
        return <Navigate to="/unauthorized" />;
    }

    // Nếu có token và quyền truy cập hợp lệ, render component con
    return children;
};


export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { UserRoleContext } from "../context/RoleContext";

const ProtectedRoles = ({ children, roles }) => {
    const { userRole } = UserRoleContext();
    
    if (!roles.includes(userRole)) {
        return <Navigate to="/dashboard" />;
    }
    return children;
    }

export default ProtectedRoles;


import React from 'react';
import { Button, Result } from 'antd';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import UnAuthorised from '../pages/UnAuthorised';

const ProtectedRoute = ({ role, children }) => {
  const { user, userRole } = UserAuth();

  console.log(userRole);
  if (!user) {
    return <Navigate to="/signin" />;
  }
  if (role === 'admin' && userRole !== 'admin') {
    return <UnAuthorised />;
  } else if (role === 'student' && userRole !== 'student') {
    return <UnAuthorised />;
  } else if (role === 'teacher' && userRole !== 'teacher') {
    return <UnAuthorised />;
  }

  return children;

  
};

export default ProtectedRoute;

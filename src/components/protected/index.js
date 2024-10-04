import { memo } from 'react';

import './style.css';

import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
  const tokenLocalStorage = localStorage.getItem('token');

  return tokenLocalStorage ? <Outlet /> : <Navigate to="/login" />;
};

export default memo(Protected);

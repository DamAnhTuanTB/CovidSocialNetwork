import Cookies from 'js-cookie';
import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginComponent from '../../../components/Auth/Login';
export default function LoginAdmin() {

  const isAuthenticated = !!Cookies.get('tokenAdmin');
  if (isAuthenticated) return <Redirect to="/admin/post-management" />;

  return (
    <LoginComponent isAdmin />
  );
}

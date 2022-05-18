import Cookies from 'js-cookie';
import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginComponent from '../../components/Auth/Login';
export default function Login() {

  const isAuthenticated = !!Cookies.get('token');
  if (isAuthenticated) return <Redirect to="/post" />;

  return (
    <LoginComponent />
  );
}

import Cookies from 'js-cookie';
import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginComponent from '../../../components/Auth/Login';
export default function LoginExpert() {

  const isAuthenticated = !!Cookies.get('tokenExpert');
  if (isAuthenticated) return <Redirect to="/expert/chat" />;

  return (
    <LoginComponent isExpert />
  );
}

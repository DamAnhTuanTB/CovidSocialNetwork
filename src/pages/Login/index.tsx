import React from 'react';
import { login } from '../../api/authentication';
import { Redirect, useHistory } from 'react-router-dom';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { handleErrorMessage } from '../../helpers';
import LoginComponent from '../../components/Auth/Login';
export default function Login() {
  // const history = useHistory();

  // const handleSubmit = async (payload: any) => {
  //   const params = _.pick(payload, ['username', 'password']);
  //   try {
  //     const data = await login(params);
  //     const { token, refreshToken } = data.data;
  //     Cookies.set('token', token, {
  //       expires: payload.rememberMe ? 999999 : undefined,
  //     });
  //     Cookies.set('refreshToken', refreshToken, {
  //       expires: payload.rememberMe ? 999999 : undefined,
  //     });
  //     history.push('/');
  //   } catch (error) {
  //     handleErrorMessage(error);
  //   }
  // };

  const isAuthenticated = !!Cookies.get('token');
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <LoginComponent />
  );
}

/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

const LogoutPage = () => {
  const history = useHistory();
  useEffect(() => {
    Cookies.remove('token');
    history.push('/');
  }, []);
  return null;
};

export default LogoutPage;
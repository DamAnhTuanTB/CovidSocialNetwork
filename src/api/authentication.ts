import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const login = async (payload: any) => {
  const res = await sendPost('http://localhost:8888/covid-network-social/auth/login', payload);
  return res;
}
export const signUp = async (payload: any) => {
  const res = await sendPost('http://localhost:8888/covid-network-social/auth/create', payload);
  return res;
}

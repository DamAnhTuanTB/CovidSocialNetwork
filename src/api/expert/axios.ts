import Axios from 'axios';
import Cookies from 'js-cookie';
import { history } from '../../App';
import configs from '../../config';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    const token = Cookies.get('tokenExpert');
    // const token = Cookies.get('token');
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const logout = () => {
  Cookies.remove('tokenExpert');
  history.push('/expert/login');
};
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    const originalConfig = error.config;
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      logout();
      return Promise.reject(error);
    }
    return Axios.post(`${configs.API_DOMAIN}/v1/app/auth/request-access-token`, {
      refreshToken,
    })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          Cookies.set('token', data.token);
          originalConfig.headers.Authorization = `Bearer ${data.token}`;
          return Axios(originalConfig);
        } else {
          logout();
          return Promise.reject(error);
        }
      })
      .catch(() => {
        logout();
        return Promise.reject(error);
      });
  }
);

export const sendGetExpert = (url: string, params?: any) => axiosInstance.get(url, { params }).then((res) => res);
export const sendPostExpert = (url: string, params?: any, queryParams?: any) =>
  axiosInstance.post(url, params, { params: queryParams }).then((res) => res);
export const sendPutExpert = (url: string, params?: any) => axiosInstance.put(url, params).then((res) => res);
export const sendPatchExpert = (url: string, params?: any) => axiosInstance.patch(url, params).then((res) => res);
export const sendDeleteExpert = (url: string, params?: any) => axiosInstance.delete(url, { params }).then((res) => res);

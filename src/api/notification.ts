import { sendGet } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getAllNotification = () =>
  sendGet("http://localhost:8888/covid-network-social/notification/get-all-notifications").then((res) => res.data);

import { sendGetAdmin } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getProfileAdmin = () =>
  sendGetAdmin("http://localhost:8888/covid-network-social/patient/profile").then((res) => {
    return res.data;
  });

import { sendGetAdmin, sendPutAdmin } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getProfileAdmin = () =>
  sendGetAdmin("http://localhost:8888/covid-network-social/patient/profile").then((res) => {
    return res.data;
  });

export const updatePasswordAdmin = async (params: any) => {
  const res = await sendPutAdmin("http://localhost:8888/covid-network-social/admin/update-password", params);
  return res;
}
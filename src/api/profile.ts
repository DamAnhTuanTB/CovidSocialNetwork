import { sendGet, sendPut } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getProfile = () =>
  sendGet("http://localhost:8888/covid-network-social/patient/profile").then((res) => res.data);
export const updateProfile = async (params: any) => {
  const res = await sendPut("http://localhost:8888/covid-network-social/patient/profile", params);
  return res;
}

import { sendGet, sendPut } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getProfile = () =>
  sendGet("http://localhost:8888/covid-network-social/patient/profile").then((res) => res.data);

export const updateProfile = async (params: any) => {
  const res = await sendPut("http://localhost:8888/covid-network-social/patient/profile", params);
  return res;
}

export const getProfileOther = async (key: any) => {
  const id_user = key?.queryKey[1].id;
  const res = await sendGet(`http://localhost:8888/covid-network-social/patient/profile/${id_user}`);
  return res;
}

export const updatePassword = async (params: any) => {
  const res = await sendPut("http://localhost:8888/covid-network-social/patient/update-password", params);
  return res;
}
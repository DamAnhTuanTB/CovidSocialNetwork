import { sendGetAdmin } from './admin/axios';
import { sendGet, sendPut } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getProfile = () =>
  sendGet("http://localhost:8888/covid-network-social/patient/profile").then((res) => res.data);

export const updateProfile = async (params: any) => {
  const res = await sendPut("http://localhost:8888/covid-network-social/patient/profile", params);
  return res;
}

export const updateActive = async (isActive: any) => {
  const res = await sendPut(`http://localhost:8888/covid-network-social/patient/update-active?isActive=${isActive}`);
  return res;
}

export const getProfileOther = async (key: any) => {
  const id_user = key?.queryKey[1].id;
  const res = await sendGet(`http://localhost:8888/covid-network-social/patient/profile/${id_user}`);
  return res;
}

export const getProfileOtherAdmin = async (key: any) => {
  const id_user = key?.queryKey[1].id;
  const res = await sendGetAdmin(`http://localhost:8888/covid-network-social/patient/profile/${id_user}`);
  return res;
}

export const updatePassword = async (params: any) => {
  const res = await sendPut("http://localhost:8888/covid-network-social/patient/update-password", params);
  return res;
}

export const getListImageOther = async (id_user: any) => {
  const res = await sendGet(`http://localhost:8888/covid-network-social/patient/get-all-image-of-patient/${id_user}`);
  return res?.data;
}

export const getMyListImage = async () => {
  const res = await sendGet(`http://localhost:8888/covid-network-social/patient/get-all-image-of-patient`);
  return res?.data;
}
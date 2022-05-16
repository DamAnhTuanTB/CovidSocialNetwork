import { sendDelete, sendGet, sendPost, sendPut } from "../axios";
import { sendGetAdmin } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getListGuest = async (params: any) => {
  const res = await sendGetAdmin("http://localhost:8888/covid-network-social/admin/patient/get-all-patients", params);
  return res?.data;
}

export const getListImageByIdGuest = async (idUser: any) => {
  const res = await sendGetAdmin(`http://localhost:8888/covid-network-social/admin/patient/get-all-image-of-patient/${idUser}`);
  return res?.data;
}

export const deleteGuest = async (idUser: any) => {
  const res = await sendDelete(`http://localhost:8888/covid-network-social/admin/patient/delete-patient/${idUser}`);
  return res?.data;
}
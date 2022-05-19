import { sendDeleteAdmin, sendGetAdmin, sendPostAdmin, sendPutAdmin } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const createExpertAdmin = async (params: any) => {
  const res = await sendPostAdmin("http://localhost:8888/covid-network-social/admin/expert/create-expert", params);
  return res?.data;
}

export const getListExpert = async (params: any) => {
  const res = await sendGetAdmin("http://localhost:8888/covid-network-social/admin/expert/get-all-experts", params);
  return res?.data;
}

export const deleteExpert = async (idExpert: any) => {
  const res = await sendDeleteAdmin(`http://localhost:8888/covid-network-social/admin/expert/delete-expert/${idExpert}`);
  return res?.data;
}

export const updateExpert = async (params: any) => {
  const idExpert = params?.idExpert;
  const newParam = { ...params };
  delete newParam.idExpert
  const res = await sendPutAdmin(`http://localhost:8888/covid-network-social/admin/expert/update-expert/${idExpert}`, newParam);
  return res?.data;
}

export const updatePasswordExpert = async (params: any) => {
  const idExpert = params?.idExpert;
  const newParam = { ...params };
  delete newParam.idExpert
  const res = await sendPutAdmin(`http://localhost:8888/covid-network-social/admin/expert/update-password-expert/${idExpert}`, newParam);
  return res?.data;
}
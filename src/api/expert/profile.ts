import { sendGetExpert, sendPutExpert } from "./axios";

export const updatePasswordExpert = async (params: any) => {
  const res = await sendPutExpert("http://localhost:8888/covid-network-social/patient/update-password", params);
  return res?.data;
}

export const getProfileExpert = () =>
  sendGetExpert("http://localhost:8888/covid-network-social/patient/profile").then((res) => res.data);

export const updateProfileExpert = async (params: any) => {
  const res = await sendPutExpert("http://localhost:8888/covid-network-social/patient/profile", params);
  return res?.data;
}

export const updateActiveExpert = async (isActive: any) => {
  const res = await sendPutExpert(`http://localhost:8888/covid-network-social/patient/update-active?isActive=${isActive}`);
  return res;
}
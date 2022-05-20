import { sendPutExpert } from "./axios";

export const updatePasswordExpert = async (params: any) => {
  const res = await sendPutExpert("http://localhost:8888/covid-network-social/patient/update-password", params);
  return res;
}
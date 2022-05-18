import { sendPostAdmin } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const createExpertAdmin = async (params: any) => {
  const res = await sendPostAdmin("http://localhost:8888/covid-network-social/auth/create", params);
  return res?.data;
}
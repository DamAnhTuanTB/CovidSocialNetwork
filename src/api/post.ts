import { sendGet, sendPut } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getListPost = (params: any) =>
  sendGet("/v1/app/task/list", params);
export const updatePost = (params: any) => sendPut("/v1/app/profile", params);

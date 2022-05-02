import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getListPost = (params: any) =>
  sendGet("/v1/app/task/list", params);
export const updatePost = async (params: any) => {
  const idPost = params?.idPost;
  const newParam = {...params};
  delete newParam.idPost
  const res = await sendPut(`http://localhost:8888/covid-network-social/post/update-post/${idPost}`, newParam);
  return res?.data;
}

export const createPost = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/post/create", params);
  return res?.data;
}

export const deletePost = async (idPost: any) => {
  const res = await sendDelete(`http://localhost:8888/covid-network-social/post/delete/${idPost}`);
  return res?.data;
}

export const getListMyPost = async (key: any) => {
  const params = key?.queryKey[1]?.param;
  const res = await sendGet("http://localhost:8888/covid-network-social/post/get-list-post-user-login", params);
  return res?.data;
}

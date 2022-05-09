import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getListPost = async (params: any) => {
  const res = await sendGet("http://localhost:8888/covid-network-social/post/get-all-posts", params);
  return res?.data;
}

export const getDetailPost = async (id: any) => {
  const res = await sendGet(`http://localhost:8888/covid-network-social/post/get-post-detail/${id}`);
  return res?.data;
}

export const updatePost = async (params: any) => {
  const idPost = params?.idPost;
  const newParam = { ...params };
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
  const res = await sendGet("http://localhost:8888/covid-network-social/post/get-list-post-of-user", params);
  return res?.data;
}

export const handleLikePost = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/post/like-or-unlike-post", params);
  return res?.data;
}

export const handleSavePost = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/post/save-or-unsave-post", params);
  return res?.data;
}

export const createComment = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/post/create-comment", params);
  return res?.data;
}

export const handleLikeComment = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/post/like-or-unlike-comment", params);
  return res?.data;
}


export const getListCommentPost = async (param: any) => {
  const res = await sendGet(`http://localhost:8888/covid-network-social/post/get-all-comment-post`, param);
  return res?.data;
}
import { sendDelete, sendGet, sendPost, sendPut } from "../axios";

// eslint-disable-next-line import/prefer-default-export
export const getListPostAdmin = async (params: any) => {
  const newParams = {...params};
  newParams.createAt = newParams?.createAt?.format("YYYY-MM-DD");
  const res = await sendGet("http://localhost:8888/covid-network-social/admin/post/get-all-posts", newParams);
  return res?.data;
}

export const getListPostByUserAdmin = async (params: any) => {
  const newParams = {...params};
  newParams.createAt = newParams?.createAt?.format("YYYY-MM-DD");
  const res = await sendGet("http://localhost:8888/covid-network-social/admin/post/get-all-posts-by-userId", newParams);
  return res?.data;
}

export const getDetailPostAdmin = async (id: any) => {
  const res = await sendGet(`http://localhost:8888/covid-network-social/admin/post/get-post-detail/${id}`);
  return res?.data;
}

export const updatePostAdmin = async (params: any) => {
  const idPost = params?.idPost;
  const newParam = { ...params };
  delete newParam.idPost
  const res = await sendPut(`http://localhost:8888/covid-network-social/admin/post/update-post/${idPost}`, newParam);
  return res?.data;
}

export const createPostAdmin = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/admin/post/create-post", params);
  return res?.data;
}

export const deletePostAdmin = async (idPost: any) => {
  const res = await sendDelete(`http://localhost:8888/covid-network-social/admin/post/delete/${idPost}`);
  return res?.data;
}

export const updateStatusPostAdmin = async (params: any) => {
  const idPost = params?.idPost;
  const newParam = { ...params };
  delete newParam.idPost
  const res = await sendPut(`http://localhost:8888/covid-network-social/admin/post/update-status-post/${idPost}`, newParam);
  return res?.data;
}
// export const getListMyPost = async (key: any) => {
//   const params = key?.queryKey[1]?.param;
//   const res = await sendGet("http://localhost:8888/covid-network-social/post/get-list-post-of-user", params);
//   return res?.data;
// }

export const handleLikePostAdmin = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/admin/post/like-or-unlike-post", params);
  return res?.data;
}

export const handleSavePostAdmin = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/admin/post/save-or-unsave-post", params);
  return res?.data;
}

export const createCommentAdmin = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/admin/post/create-comment", params);
  return res?.data;
}

export const handleLikeCommentAdmin = async (params: any) => {
  const res = await sendPost("http://localhost:8888/covid-network-social/admin/post/like-or-unlike-comment", params);
  return res?.data;
}


export const getListCommentPostAdmin = async (param: any) => {
  const res = await sendGet(`http://localhost:8888/covid-network-social/admin/post/get-all-comment-post`, param);
  return res?.data;
}
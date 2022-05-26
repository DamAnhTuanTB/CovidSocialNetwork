import { sendGetAdmin } from './admin/axios';
import { sendGetExpert } from "./expert/axios";
import { sendGet } from "./axios";

// p
// eslint-disable-next-line import/prefer-default-export
export const getInfoChatSession = async () => {
  const res = await sendGet(
    "http://localhost:8888/covid-network-social/chat/get-profile-expert-to-chat"
  );
  return res?.data;
};
// p
export const getListMessagesPatient = async (id: number) => {
  const res = await sendGet(
    `http://localhost:8888/covid-network-social/chat/get-list-messages-patient/${id}`
  );
  return res?.data;
};

// e
export const getDetailChatSession = async (id: number) => {
  const res = await sendGetExpert(
    `http://localhost:8888/covid-network-social/chat/get-detail-chat-session/${id}`
  );
  return res?.data;
};

// e
export const getListMessagesExpert = async (id: number) => {
  const res = await sendGetExpert(
    `http://localhost:8888/covid-network-social/chat/get-list-messages-expert/${id}`
  );
  return res?.data;
};
// e
export const getListChatSessionsOfExpert = async (
  id: number,
  date?: string,
  status?: number,
  page = 1,
  limit = 10
) => {
  const res = await sendGetExpert(
    `http://localhost:8888/covid-network-social/chat/get-list-chat-sessions-of-expert/${id}?date=${date}&status=${status}&page=${page}&limit=${limit}`
  );
  return res?.data;
};
// a
export const getListChatSessionsOfExpertAdmin = async (
  id: number,
  date?: string,
  status?: number,
  page = 1,
  limit = 10
) => {
  const res = await sendGetAdmin(
    `http://localhost:8888/covid-network-social/chat/get-list-chat-sessions-of-expert/${id}?date=${date}&status=${status}&page=${page}&limit=${limit}`
  );
  return res?.data;
};
// a
export const getDetailChatSessionAdmin = async (id: number) => {
  const res = await sendGetAdmin(
    `http://localhost:8888/covid-network-social/chat/get-detail-chat-session/${id}`
  );
  return res?.data;
};
// e
export const getListMessagesExpertAdmin = async (id: number) => {
  const res = await sendGetAdmin(
    `http://localhost:8888/covid-network-social/chat/get-list-messages-expert/${id}`
  );
  return res?.data;
};

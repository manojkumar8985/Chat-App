import { axiosInstance } from "./axiosInstance.js";
export const getAuthUser = async () => {
  const res = await axiosInstance.get(`/auth/me`);

  return res.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get(`/user/friend`);
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get(`/user`);
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get(`/user/OutgoingFriendRequest`);
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/user/friendRequest/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get(`/user/friendRequest`);
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(
    `/user/friendRequest/${requestId}/accept`
  );
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get(`/chat/token`);
  return response.data;
}

export async function logoutUser() {
  const response = await axiosInstance.post(`/auth/logout`);
  return response.data;
}


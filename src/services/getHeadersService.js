import apiClient from "./apiClient";

export const getHeadersService = (screenName) =>
  apiClient.get(`/headers${screenName}`).then((res) => res.data?.data);

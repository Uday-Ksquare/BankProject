import apiClient from "./apiClient";

export const getScreensData = (screenName, period,pageNumber,pageSize) =>
  apiClient.get(`/screens${screenName}/${period}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((res) => res.data);
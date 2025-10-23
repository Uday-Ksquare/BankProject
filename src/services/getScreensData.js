import apiClient from "./apiClient";

export const getScreensData = (
  screenName,
  reportType,
  period,
  pageNumber,
  pageSize
) =>
  apiClient
    .get(
      `/screens/${reportType}${screenName}/${period}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => res.data);

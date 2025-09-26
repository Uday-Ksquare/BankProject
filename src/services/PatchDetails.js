import apiClient from "./apiClient";

export const PatchDetails = (data) =>
  apiClient.post(`/detailsvalues`, data).then((res) => res.data);

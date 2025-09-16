import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://138.128.246.29:8080/api/dynamic/screens/",
  headers: {
    "Content-Type": "application/json",
  },
});

// optional: add interceptors (auth, error handling, logging)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
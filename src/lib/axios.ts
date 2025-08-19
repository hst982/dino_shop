import axios from "axios";

const api = axios.create({
  baseURL: "/api",         // Gọi API trong Next.js
  withCredentials: true,   // Gửi cookie kèm theo request
});

// Request Interceptor → tự động gắn accessToken vào header (nếu bạn lưu trong memory)
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken"); // hoặc memory
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor → nếu bị 401 thì refresh rồi retry
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Nếu bị 401 và chưa retry → gọi refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Gọi API refresh token
      await axios.post("/api/refresh", {}, { withCredentials: true });

      // Retry lại request cũ
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;

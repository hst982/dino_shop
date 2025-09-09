import axios from "axios"

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // gửi cookie HttpOnly khi gọi API
})

// Interceptor để tự refresh token
api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401 && !err.config._retry) {
      err.config._retry = true
      try {
        const refresh = await api.post("/auth/refresh")
        const newAccessToken = refresh.data.accessToken

        // gắn lại token mới vào header
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
        err.config.headers["Authorization"] = `Bearer ${newAccessToken}`

        return api(err.config) // gọi lại request cũ
      } catch (refreshError) {
        console.error("Refresh token fail")
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(err)
  }
)

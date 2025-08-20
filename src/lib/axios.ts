import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // gửi cookie tự động
})

// Axios interceptor để refresh token tự động
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await axios.post('/api/auth/refresh-token', {}, { withCredentials: true })
        return api(originalRequest)
      } catch {
        // token hết hạn → logout
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

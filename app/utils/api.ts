import Axios from 'axios'
import authApi from '@/api/auth'

const api = Axios.create({
  baseURL: import.meta.env.API_URL || "http://localhost:3000",
  withCredentials: true,
})

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config    

    if (
      err.response?.status !== 401 || 
      originalRequest._retry || 
      originalRequest.url === 'auth/refresh'
    ) {      
      return Promise.reject(err)
    }

    originalRequest._retry = true

    try {      
      const res = await authApi.refresh()

      console.log(res);
      

      if (res?.success) {
        return api(originalRequest)
      }
    } catch {
      return Promise.reject(err)
    }
  } 
)

export default api

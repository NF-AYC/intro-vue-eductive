import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
})
axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.withXSRFToken = true
export default axiosInstance

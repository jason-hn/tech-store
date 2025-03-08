import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {}
    
    // If token is invalid or expired
    if (status === 401) {
      localStorage.removeItem('token')
      // Optionally redirect to login
      // window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default api 
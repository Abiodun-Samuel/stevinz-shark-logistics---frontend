import axios from 'axios'
import NProgress from 'nprogress'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.js'
import { toastError } from '@/utils/helper'

function getAuthStore() {
  return useAuthStore()
}

let baseURL =
  import.meta.env.VITE_APP_ENVIRONMENT === 'production'
    ? import.meta.env.VITE_APP_API_LIVE
    : import.meta.env.VITE_APP_API_DEV

const $axios = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': 'true',
  },
})

const progressFns = () => {
  let progressTimeout,
    count = 0

  const start = () => {
    count++

    progressTimeout = setTimeout(() => {
      NProgress.start()
    }, 200)
  }

  const stop = () => {
    count = Math.max(0, count - 1)
    if (count > 0) return

    NProgress.done()
    clearTimeout(progressTimeout)
  }

  return { start, stop }
}

const { start: progressStart, stop: progressStop } = progressFns()

$axios.interceptors.request.use(
  async (config) => {
    const { token } = getAuthStore()
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    if (!config.__noProgress) progressStart()
    return config
  },
  (error) => {
    progressStop()
    return Promise.reject(error)
  },
)

$axios.interceptors.response.use(
  (response) => {
    if (!response.config.__noProgress) progressStop()
    return response
  },
  (error) => {
    progressStop()
    const status = error?.response?.status
    if (status == 401) {
      localStorage.removeItem('auth')
      localStorage.clear()
      toastError('Your session has expired, please login.')
      window.open('/login', '_self')
    }
    return Promise.reject(error)
  },
)

export default $axios

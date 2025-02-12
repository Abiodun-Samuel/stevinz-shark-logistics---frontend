import $axios from './api'

export default {
  login(data) {
    return $axios.post(`/login`, data)
  },

  register(data) {
    return $axios.post(`/register`, data)
  },

  logout(data) {
    return $axios.post(`/logout`, data)
  },
}

import $axios from './api'

export default {
  getUserProfile() {
    return $axios.get(`/user-profile`)
  },
  getAllUsers() {
    return $axios.get(`/users`)
  },
  assignUserRole(form) {
    return $axios.post(`/assign-user-role`, form)
  },
}

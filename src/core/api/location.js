import $axios from './api'

export default {
  getLocations() {
    return $axios.get(`/locations`)
  },
  createLocation(form) {
    return $axios.post(`/locations`, form)
  },
  deleteLocation(id) {
    return $axios.delete(`/locations/${id}`)
  },
  updateLocation(form) {
    return $axios.put(`/locations/${form.id}`, form)
  },
}

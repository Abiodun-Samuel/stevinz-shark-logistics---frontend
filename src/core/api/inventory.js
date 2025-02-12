import $axios from './api'

export default {
  getInventory(id) {
    return $axios.get(`/inventories/${id}`)
  },
  getInventories(data) {
    const params = new URLSearchParams({
      page: data?.page,
      start_date: data?.start_date,
      end_date: data?.end_date,
      location: data?.location,
      search_query: data?.search_query,
      user_id: data?.user_id,
      payment_mode: data?.payment_mode,
      order_column: data?.order_column,
      order_state: data?.order_state,
    })
    return $axios.get(`/inventories?${params?.toString()}`)
  },
  deleteInventory(id) {
    return $axios.delete(`/inventories/${id}`)
  },
  createInventory(form) {
    return $axios.post(`/inventories`, form)
  },
  updateInventory(form) {
    return $axios.put(`/inventories/${form.id}`, form)
  },
  trackInventory(form) {
    return $axios.post(`/track-inventory`, form)
  },
  createInventoryTimeline(form) {
    return $axios.post(`/timelines`, form)
  },
}

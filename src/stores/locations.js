import { defineStore } from 'pinia'
import location from '@/core/api/location'
import { toastError, toastSuccess } from '@/utils/helper'

export const useLocationStore = defineStore('location', {
  state: () => ({
    locations: [],
    loading: false,
    errors: null,
  }),
  getters: {},
  actions: {
    async getLocations() {
      this.loading = true
      try {
        const { data } = await location.getLocations()
        this.locations = data?.data
        toastSuccess(data?.message)
        this.loading = false
      } catch (error) {
        this.loading = false
        this.locations = []
        toastError(error?.response?.data?.message)
      }
    },

    async createLocation(form) {
      this.loading = true
      try {
        const { data } = await location.createLocation(form)
        this.locations?.push(data?.data)
        toastSuccess(data?.message)
        this.loading = false
        return true
      } catch (error) {
        this.loading = false
        toastError(error?.response?.data?.message)
        return false
      }
    },

    async deleteLocation(id) {
      this.loading = true
      try {
        const { data } = await location.deleteLocation(id)
        this.locations = this.locations?.filter((location) => location.id != id)
        toastSuccess(data?.message)
        this.loading = false
      } catch (error) {
        this.loading = false
        toastError(error?.response?.data?.message)
      }
    },

    async updateLocation(form) {
      this.loading = true
      try {
        const { data } = await location.updateLocation(form)
        this.locations = data?.data
        toastSuccess(data?.message)
        this.loading = false
        return true
      } catch (error) {
        this.loading = false
        toastError(error?.response?.data?.message)
        return false
      }
    },
  },
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import inventoryApi from '@/core/api/inventory'
import { toastError, toastSuccess } from '@/utils/helper'
import router from '@/router'

export const useInventoryStore = defineStore('inventory', () => {
  const inventories = ref([])
  const inventory = ref({})
  const trackedInventory = ref({})
  const loading = ref(false)
  const errors = ref(null)

  const getInventory = async (id) => {
    loading.value = true
    try {
      const { data } = await inventoryApi.getInventory(id)
      inventory.value = data?.data
      loading.value = false
    } catch (error) {
      loading.value = false
      errors.value = error?.response?.data?.message
      toastError(error?.response?.data?.message)
    }
  }
  const getInventories = async (params) => {
    loading.value = true
    try {
      const { data } = await inventoryApi.getInventories(params)
      inventories.value = data?.data
      loading.value = false
    } catch (error) {
      loading.value = false
      errors.value = error?.response?.data?.message
      toastError(error?.response?.data?.message)
    }
  }
  const deleteInventory = async (id) => {
    loading.value = true
    try {
      const { data } = await inventoryApi.deleteInventory(id)
      const updatedInventories = inventories.value?.data?.filter((inventory) => inventory.id != id)
      inventories.value = { ...inventories.value, data: updatedInventories }
      toastSuccess(data?.message)
      loading.value = false
    } catch (error) {
      loading.value = false
      errors.value = error?.response?.data?.message
      toastError(error?.response?.data?.message)
    }
  }
  const createInventory = async (form) => {
    loading.value = true
    try {
      const { data } = await inventoryApi.createInventory(form)
      toastSuccess(data?.message)
      loading.value = false
      return true
    } catch (error) {
      loading.value = false
      errors.value = error?.response?.data?.message
      toastError(error?.response?.data?.message)
      return false
    }
  }
  const updateInventory = async (form) => {
    loading.value = true
    try {
      const { data } = await inventoryApi.updateInventory(form)
      toastSuccess(data?.message)
      loading.value = false
      router.push({ name: 'dashboard.index' })
    } catch (error) {
      loading.value = false
      errors.value = error?.response?.data?.message
      toastError(error?.response?.data?.message)
    }
  }

  const trackInventory = async (form) => {
    loading.value = true
    try {
      const { data } = await inventoryApi.trackInventory(form)
      toastSuccess(data?.message)
      loading.value = false
      trackedInventory.value = data?.data
      return true
    } catch (error) {
      loading.value = false
      // trackedInventory.value = null
      errors.value = error?.response?.data?.message
      toastError(error?.response?.data?.message)
      return false
    }
  }
  const createInventoryTimeline = async (form) => {
    loading.value = true
    try {
      const { data } = await inventoryApi.createInventoryTimeline(form)
      toastSuccess(data?.message)
      loading.value = false
      trackedInventory.value = data?.data
      return true
    } catch (error) {
      loading.value = false
      // trackedInventory.value = null
      errors.value = error?.response?.data?.message
      toastError(error?.response?.data?.message)
      return false
    }
  }

  return {
    trackedInventory,
    loading,
    inventory,
    inventories,
    getInventories,
    deleteInventory,
    getInventory,
    createInventory,
    updateInventory,
    trackInventory,
    createInventoryTimeline,
  }
})

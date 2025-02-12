import { defineStore } from 'pinia'
import { ref } from 'vue'
import User from '@/core/api/user'
import { toastError, toastSuccess } from '@/utils/helper'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const users = ref([])
  const loading = ref(false)
  const errors = ref(null)

  const getUserProfile = async () => {
    loading.value = true
    try {
      const { data } = await User.getUserProfile()
      toastSuccess(data?.message)
      loading.value = false
      user.value = data?.data
    } catch (error) {
      loading.value = false
      toastError(error?.response?.data?.message)
    }
  }

  const getAllUsers = async () => {
    loading.value = true
    try {
      const { data } = await User.getAllUsers()
      loading.value = false
      users.value = data?.data
    } catch (error) {
      loading.value = false
      users.value = []
      toastError(error?.response?.data?.message)
    }
  }

  const assignUserRole = async (form) => {
    loading.value = true
    try {
      const { data } = await User.assignUserRole(form)
      loading.value = false
      toastSuccess(data?.message)
      await getAllUsers()
    } catch (error) {
      loading.value = false
      toastError(error?.response?.data?.message)
    }
  }

  return { user, users, loading, errors, getUserProfile, getAllUsers, assignUserRole }
})

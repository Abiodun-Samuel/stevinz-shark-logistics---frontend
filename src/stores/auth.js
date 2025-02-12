import { defineStore } from 'pinia'
import Auth from '@/core/api/auth'
import router from '@/router'
import { toastError, toastSuccess } from '@/utils/helper'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isLoggedIn: false,
    loading: false,
    loginErrors: null,
  }),
  getters: {
    isSuperAdmin: (state) => state.user?.roles[0] === 'superadmin',
    isAdmin: (state) => state.user?.roles[0] === 'admin',
  },
  actions: {
    async register(form) {
      this.loading = true
      try {
        const { data } = await Auth.register(form)
        toastSuccess(data?.message)
        this.loading = false
        router.push({ name: 'login' })
      } catch (error) {
        this.loading = false
        toastError(error?.response?.data?.message)
      }
    },
    async login(form) {
      this.loading = true
      try {
        const { data } = await Auth.login(form)
        this.user = data.data.user
        this.token = data.data.token
        this.isLoggedIn = true
        toastSuccess(data?.message)
        router.push({ name: 'dashboard.index' })
        this.loading = false
        this.loginErrors = null
      } catch (error) {
        this.user = this.token = null
        this.isLoggedIn = this.loading = false
        const errorMessage = error?.response?.data?.message || 'Unable to login, Please try again.'
        this.loginErrors = errorMessage
        toastError(errorMessage)
      }
    },
    async logout() {
      try {
        const { data } = await Auth.logout()
        this.user = null
        this.token = null
        this.isLoggedIn = false
        toastSuccess(data?.message)
        router.push({ name: 'login' })
      } catch (error) {}
    },
  },
  persist: {
    storage: localStorage,
    pick: ['user', 'token', 'isLoggedIn'],
  },
})

// export const useAuthStore = defineStore(
//   'auth',
//   () => {
//     // state
//     const user = ref(null)
//     const token = ref(null)
//     const isLoggedIn = ref(false)
//     const loading = ref(false)
//     const loginErrors = ref(null)

//     return {
//       user,
//       isSuperAdmin,
//       isAdmin,
//       token,
//       isLoggedIn,
//       loading,
//       loginErrors,
//       login,
//       register,
//       logout,
//     }
//   },
//   {
//     persist: {
//       storage: localStorage,
//       pick: ['user', 'token', 'isLoggedIn', 'isSuperAdmin', 'isAdmin'],
//     },
//   },
// )

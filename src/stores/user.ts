import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')!) || null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user
  },

  actions: {
    async login(email: string, password: string, confirmPassword: string) {
      const response = await axios.post('https://localhost:7172/api/Account/login', {
        email,
        password,
        confirmPassword
      })

      const user = response.data
      console.log(response.data)

      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      return user
    },
    async logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})

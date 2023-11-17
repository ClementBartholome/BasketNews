<template>
  <form @submit.prevent="loginUser">
    <label>Email:</label>
    <input type="email" v-model="loginData.email" required />

    <label>Mot de passe:</label>
    <input type="password" v-model="loginData.password" required />

    <label>Confirmer le mot de passe:</label>
    <input type="password" v-model="loginData.confirmPassword" required />

    <button type="submit">Se connecter</button>

    <div v-if="catchError">
      {{ catchError }}
    </div>
  </form>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const loginData = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const catchError = ref('')

const loginUser = async () => {
  try {
    const response = await userStore.login(
      loginData.value.email,
      loginData.value.password,
      loginData.value.confirmPassword
    )
    if (response) {
      router.push('/')
    }
    console.log(response)
  } catch (error: any) {
    const errors = error.response?.data?.errors
    if (errors) {
      for (const key in errors) {
        catchError.value = errors[key][0]
      }
    } else {
      catchError.value = 'Une erreur est survenue'
    }
  }
}
</script>

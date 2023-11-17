<template>
  <form @submit.prevent="registerUser">
    <label>Email:</label>
    <input type="email" v-model="registerData.email" required />

    <label>Mot de passe:</label>
    <input type="password" v-model="registerData.password" required />

    <label>Confirmer le mot de passe:</label>
    <input type="password" v-model="registerData.confirmPassword" required />

    <button type="submit">S'inscrire</button>

    <div v-if="catchError">
      {{ catchError }}
    </div>
  </form>
</template>

<script setup lang="ts">
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'

const registerData = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const catchError = ref('')

const registerUser = async () => {
  try {
    const response = await axios.post(
      'https://localhost:7172/api/Account/register',
      registerData.value
    )

    if (response.status === 200) {
      router.push('/login')
    }
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

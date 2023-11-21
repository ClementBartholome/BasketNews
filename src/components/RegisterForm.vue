<template>
  <main>
    <h2>Inscription</h2>
    <form @submit.prevent="registerUser">
      <label>Email:</label>
      <input type="email" autocomplete="username" v-model="registerData.email" required />

      <label>Mot de passe:</label>
      <input type="password" autocomplete="new-password" v-model="registerData.password" required />

      <label>Confirmer le mot de passe:</label>
      <input
        type="password"
        autocomplete="new-password"
        v-model="registerData.confirmPassword"
        required
      />

      <button type="submit">S'inscrire</button>

      <p v-if="catchError">
        {{ catchError }}
      </p>
    </form>
  </main>
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

<style lang="scss" scoped>
h2 {
  position: absolute;
  left: 40%;
  @media (max-width: 500px) {
    position: initial;
  }
}
form {
  position: absolute;
  bottom: 40%;
  left: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  @media (max-width: 500px) {
    position: initial;
  }

  input {
    padding: 5px;
  }
}

button {
  color: var(--text-color);
  border: 1px solid var(--text-color);
  padding: 10px;

  &:hover {
    background-color: var(--text-color);
    color: var(--background-color);
    transition: background-color 0.6s;
  }
}
</style>

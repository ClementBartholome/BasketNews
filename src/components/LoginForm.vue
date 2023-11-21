<template>
  <main>
    <h2>Connexion</h2>
    <form @submit.prevent="loginUser">
      <label>Email:</label>
      <input type="email" autocomplete="username" v-model="loginData.email" required />

      <label>Mot de passe:</label>
      <input
        type="password"
        autocomplete="current-password"
        v-model="loginData.password"
        required
      />

      <label>Confirmer le mot de passe:</label>
      <input
        type="password"
        autocomplete="current-password"
        v-model="loginData.confirmPassword"
        required
      />

      <button type="submit">Se connecter</button>

      <p v-if="catchError">
        {{ catchError }}
      </p>
      <p>
        Pas de compte ?
        <router-link to="/register" class="register-link">Inscrivez-vous</router-link>
      </p>
    </form>
  </main>
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
  width: 250px;

  @media (max-width: 500px) {
    position: initial;
  }

  input {
    padding: 5px;
  }
  .register-link {
    text-decoration: underline;

    &:hover {
      opacity: 0.7;
    }
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

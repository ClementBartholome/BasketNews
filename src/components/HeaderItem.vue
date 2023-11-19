<template>
  <header class="header">
    <router-link to="/">
      <div class="header-content">
        <span class="material-symbols-outlined"> sports_basketball </span>
        <h1>Daily Basket</h1>
      </div>
    </router-link>
    <DarkModeBtn />
    <button @click="showModal = true">
      <span class="material-symbols-outlined" style="color: var(--text-color)"> person </span>
    </button>
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      v-if="user"
    >
      <div class="user">
        <p>Bienvenue, {{ user.userName }} !</p>
        <button @click="userStore.logout">Se déconnecter</button>
      </div>
    </vue-final-modal>
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      v-else
    >
      <div class="user">
        <router-link to="/login">
          <button>Se connecter</button>
        </router-link>
        <router-link to="/register">
          <button>S'inscrire</button>
        </router-link>
      </div>
    </vue-final-modal>
  </header>
</template>

<script setup lang="ts">
import { $vfm, VueFinalModal } from 'vue-final-modal'
import { ref, watch, onMounted } from 'vue'
import DarkModeBtn from '@/components/DarkModeBtn.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const user = ref(userStore.getUser)
const showModal = ref(false)

onMounted(() => {
  console.log(user.value)
}),
  watch(
    () => userStore.getUser,
    () => {
      user.value = userStore.getUser
    }
  )
</script>

<style lang="scss" scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  text-transform: uppercase;
  margin-top: 40px;
  margin-right: 10px;
  max-width: 1280px;
  margin: 40px auto;
  grid-column: 2;
  gap: 40px;

  @media (max-width: 590px) {
    flex-direction: column;
    gap: 10px;
  }

  .header-content {
    display: flex;
    align-items: center;
    margin-left: auto;
    transition:
      transform 0.2s,
      color 0.2s;
    border-bottom: 2px solid rgba(235, 235, 235, 0.8352941176);

    &:hover {
      transform: scale(1.1);
      color: #007bff;
    }

    h1 {
      margin-left: 10px;
      font-size: 3rem;
      transition: color 0.2s;

      @media (max-width: 530px) {
        font-size: 2rem;
      }

      @media (max-width: 350px) {
        font-size: 1.8rem;
      }
    }
  }
  .material-symbols-outlined {
    font-size: 2rem;
    transition:
      transform 0.2s,
      color 0.2s;
  }

  button .material-symbols-outlined {
    &:hover {
      opacity: 0.7;
      transition: opacity 0.2s ease-in-out;
    }
  }

  .user {
    display: flex;
    flex-direction: column;

    button {
      color: white;
      font-size: 2rem;

      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>

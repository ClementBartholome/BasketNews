<template>
  <button @click="toggleDarkMode">
    <span class="material-symbols-outlined">{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDarkMode = ref(true)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  document.body.classList.toggle('light-mode')
}
</script>

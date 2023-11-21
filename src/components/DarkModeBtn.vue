<template>
  <button @click="toggleDarkMode" class="dark-mode-btn">
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

<style lang="scss" scoped>
.dark-mode-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  color: var(--text-color);

  @media (max-width: 700px) {
    right: 5px;
    top: 10px;
  }

  &:hover {
    opacity: 0.7;
    transition: opacity 0.2s;
  }
}
</style>

<template>
  <header class="header">
    <router-link to="/">
      <div class="header-content">
        <span class="material-symbols-outlined"> sports_basketball </span>
        <h1>Daily Basket</h1>
      </div>
    </router-link>
    <DarkModeBtn />
  </header>
</template>

<script setup lang="ts">
import DarkModeBtn from '@/components/DarkModeBtn.vue'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid rgba(235, 235, 235, 0.8352941176);
  padding-bottom: 40px;
  padding-right: 10px;
  text-transform: uppercase;
  margin-top: 40px;
  margin-right: 10px;
  max-width: 1280px;
  width: 100%;
  margin: 40px auto;
  grid-column: 2;

  .header-content {
    display: flex;
    align-items: center;
    margin-left: auto;
    transition:
      transform 0.2s,
      color 0.2s;

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

      @media (max-width: 530px) {
        font-size: 1.7rem;
      }
    }
  }
  .material-symbols-outlined {
    font-size: 2rem;
    transition:
      transform 0.2s,
      color 0.2s;
  }
}
</style>

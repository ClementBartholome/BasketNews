<template>
  <header class="header">
    <div class="header-content">
      <span class="material-symbols-outlined"> sports_basketball </span>
      <h1>Basket News</h1>
    </div>
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
  border-bottom: 2px solid #ebebebd5;
  padding-bottom: 40px;
  text-transform: uppercase;
  margin-top: 40px;
  margin-right: 10px;
  .header-content {
    display: flex;
    align-items: center;
    margin-left: auto;

    h1 {
      margin-left: 10px;
      font-size: 3rem;

      @media (max-width: 530px) {
        font-size: 1.5rem;
      }
    }
  }
  .material-symbols-outlined {
    font-size: 2rem;
    // @media (max-width: 530px) {
    //   font-size: 1.5rem;
    // }
  }
}
</style>

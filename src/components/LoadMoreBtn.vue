<template>
  <button>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #cecece;
  font-size: 14px;
  padding: 8px;
  margin-top: 10px;
  color: var(--text-color);
  width: fit-content;
  cursor: pointer;
  &:hover {
    color: #2c84c1;
    border: 1px solid #95c2e1;
  }
}
</style>

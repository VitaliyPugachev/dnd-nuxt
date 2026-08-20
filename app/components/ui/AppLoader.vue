<script setup lang="ts">
defineProps<{small?: boolean}>()
</script>

<template>
  <div class="loader" :class="{small: small}"></div>
</template>

<style scoped>
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid var(--color-secondary); /* Цвет верхней грани */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;

  &.small {
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-top: 2px solid var(--color-secondary);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script setup lang="ts">
defineProps<{compact?: boolean}>();
const model = defineModel();
</script>

<template>
  <input class="input" :class="{compact: compact}" v-model="model"/>
</template>

<style lang="scss" scoped>
.input {
  padding: 8px 10px;
  font-size: 16px;
  border-radius: 8px;
  background: var(--color-accent-secondary);
  outline-color: var(--color-accent);
  box-shadow: 0 4px 20px rgba(0, 0 ,0 , 0.15);
  border: none;
  color: var(--color-text);
  &.compact {
    padding: 4px 6px;
  }

}
</style>

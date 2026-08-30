<script setup lang="ts">
defineProps<{compact?: boolean}>();
const model = defineModel();
</script>

<template>
  <input class="input" :class="{compact: compact}" v-model="model"/>
</template>

<style lang="scss" scoped>

  // --color-input-focus: #b98222;
  // --color-input-placeholder: #a89982;
  // --color-input-text: #3b2b1e;
.input {
  padding: 12px 10px;
  font-size: 16px;
  border-radius: var(--radius-md);
  background: var(--color-input-bg);
  outline: none;
  border: 1px solid var(--color-input-border);
  color: var(--color-text);
  color: var(--color-input-text);

  &:focus {
    outline: 1px solid var(--color-input-focus)
  }

  &.compact {
    padding: 4px 6px;
  }

}
</style>

<script setup lang="ts">
import AppLoader from '@/components/ui/AppLoader.vue'

defineProps<{
  label?: string,
  primary?: boolean,
  small?: boolean,
  medium?: boolean,
  loading?: boolean,
  borderless?: boolean,
  clearBackground?: boolean,
  disabled?: boolean
}>();
defineEmits(['click'])
</script>

<template>
  <button
    class="button"
    :class="{
    primary: primary,
    small: small,
    borderless: borderless,
    background: clearBackground,
    medium: medium}"
    :disabled
    @click="$emit('click')"
  >
    <template v-if="loading">
      <AppLoader small/>
    </template>
    <template v-else>
      <slot name="before"/>
      <span class="button__label" v-if="label">
        {{label}}
      </span>
      <slot/>
    </template>
  </button>
</template>

<style lang="scss" scoped>
.button {
  padding: 8px 20px;
  background: var(--color-main);
  border-radius: 6px;
  border: 1px solid var(--color-text);
  cursor: pointer;
  transition: background 0.3s;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  &:disabled {
    color: #adadad;
    cursor: not-allowed;
    border-color: #adadad;
  }

  &.background {
    background: none;
  }

  &.medium {
    padding: 4px 8px;
  }

  &.small {
    padding: 4px 2px 4px 8px;
  }

  &.borderless {
    border: none;
  }

  &.primary {
    background: var(--color-secondary);
    color: var(--color-text-inverted);
  }

  &__label {
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>

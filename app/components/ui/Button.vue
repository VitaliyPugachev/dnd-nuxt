<script setup lang="ts">
import AppLoader from '@/components/ui/AppLoader.vue'

defineProps<{
  label?: string,
  primary?: boolean,
  secondary?: boolean,
  small?: boolean,
  fit?: boolean
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
    primary,
    small,
    borderless,
    background: clearBackground,
    secondary,
    fit,
    medium }"
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
  padding: 0 8px;
  background: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.3s;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: 1px solid var(--color-text-secondary);
  font-family: 'Cinzel', serif;
  height: var(--button-height);
  width: 100%;

  &:disabled {
    color: var(--color-button-disabled-text);
    cursor: not-allowed;
    background: var(--color-button-disabled);
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
    background: var(--color-button-primary);
    color: var(--color-button-primary-text);
  }

  &.secondary {
    background: var(--color-button-secondary);
    color: var(--color-button-secondary-text);
  }

  &__label {
    font-size: var(--font-size-lg);
    white-space: nowrap;
  }

  &.fit {
    width: fit-content;
  }
}
</style>

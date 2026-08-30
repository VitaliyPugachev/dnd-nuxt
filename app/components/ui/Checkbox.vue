<script setup lang="ts">
const model = defineModel<boolean>({required: true})
defineProps<{label?: string, valuelabel?: string, disabled?: boolean}>();
</script>

<template>
  <label class="checkbox" :class="{disabled: disabled}">
    <input
      v-model="model"
      type="checkbox"
      :disabled
      class="checkbox__input"
    />
    <div
      class="checkbox__icon"
    >
      <svg
        v-if="model"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span v-if="label" class="checkbox__label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: var(--color-text);

  &.disabled {
    cursor: not-allowed;
    color: var(--color-button-disabled-text);

    & .checkbox__icon {
      background: var(--color-button-disabled);
      border-color: var(--color-button-disabled-text);
    }
  }

  &__input {
    display: none;
  }

  &__icon {
    width: 24px;
    height: 24px;
    border: 1px solid var(--color-text);
    border-radius: 4px;
    background: var(--color-text-inverse);
  }
}
</style>

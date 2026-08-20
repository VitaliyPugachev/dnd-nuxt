<script setup lang="ts">
defineProps<{value: boolean, label: string, disabled?: boolean}>();
defineEmits(['update:modelValue']);
</script>

<template>
  <label class="checkbox" :class="{disabled: disabled}">
    <input
      type="checkbox"
      :disabled
      :value
      @change="$emit('update:modelValue', value)"
      class="checkbox__input"
    />
    <div
      class="checkbox__icon"
    >
      <svg
        v-if="value"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span class="checkbox__label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    color: #adadad;
  }

  &__input {
    display: none;
  }

  &__icon {
    width: 18px;
    height: 18px;
    border: 1px solid var(--color-secondary);
    border-radius: 4px;
  }
}
</style>

<script setup lang="ts">

defineProps<{incDisabled?: boolean, decDisabled?: boolean, accent?: boolean}>()
defineEmits(['inc', 'dec']);
const model = defineModel<number>({required: true});

</script>

<template>
  <div class="counter">
    <button :disabled="decDisabled" class="counter__button" @click="$emit('dec')">
      -
    </button>
    <div class="counter__input" :class="{accent: accent}">
      <span>
        {{ model || 0 }}
      </span>
    </div>
    <button :disabled="incDisabled" class="counter__button" @click="$emit('inc')">
      +
    </button>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 4px;

  &__input {
    width: 30px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: 1px solid var(--color-secondary);
    border-radius: 8px;
    background: var(--color-main);
    color: var(--color-text);

    & span {
      font-weight: 600;
    }

    &.accent {
      color: var(--color-accent);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-main);
    border-radius: 8px;
    border: 1px solid var(--color-secondary);
    height: 34px;
    width: 30px;
    cursor: pointer;
    color: var(--color-text);

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}
</style>

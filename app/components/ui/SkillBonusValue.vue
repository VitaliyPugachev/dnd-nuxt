<script setup lang="ts">
defineProps<{value: number}>();
</script>

<template>
  <div class="skill">
    <span class="skill__value" :class="{positive: value > 0, negative: value < 0}">
      {{value > 0 ? `+${value}` : value}}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.skill {
  width: 32px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__value {
    font-weight: 600;

    &.positive {
      color: var(--color-accent);
    }

    &.negative {
      color: var(--color-error);
    }
  }
}
</style>

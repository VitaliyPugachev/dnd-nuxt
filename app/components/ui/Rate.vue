<script lang="ts" setup>
const { value } = defineProps<{
  value: number,
}>()

const rate = computed(() => {
  if (!value) {
    return {
      value: 50,
      class: 'middle'
    }
  }

  return value > 0 ? {value: 50 + value * 10, class: 'high'} : {value: 50 + value * 10, class: 'low'}
})
</script>

<template>
  <div class="rate">
    <div class="filled" :class="rate.class" :style="{ width: `${rate.value}%` }"></div>
  </div>
</template>

<style lang="scss" scoped>
.rate {
  overflow: hidden;
  border-radius: var(--radius-full);
  background: var(--color-surface-secondary);
  position: relative;
  height: 10px;
  width: min(150px, 100%);

  & .filled {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: var(--color-warning);

    &.high {
      background-color: var(--color-success);
    }

    &.low {
      background-color: var(--color-error);
    }
  }
}
</style>
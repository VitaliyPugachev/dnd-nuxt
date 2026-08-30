<script setup lang="ts">
import { computed } from 'vue'

const {value, total} = defineProps<{value: number, total: number}>()

const percentBySteps: Record<number, number> = {
  1: 20,
  2: 50,
  3: 80,
  4: 100
}

const currentPercent = computed(() => {
  if (!value || !total) return '0%';

  return `${percentBySteps[value]}%`
})

const isActive = (progress: number) => {
  if (!value || !total || !progress) return false;

  return ((value / total) * 100) >= progress
}
</script>

<template>
  <div class="progress-bar__wrapper">
    <span class="progress-bar__step active">1</span>
    <span class="progress-bar__step" :class="{active: isActive(33)}">2</span>
    <span class="progress-bar__step" :class="{active: isActive(66)}">3</span>
    <span class="progress-bar__step" :class="{active: isActive(99)}">4</span>
    <div class="progress-bar">
      <div :style="{width: currentPercent}" class="progress-bar__filled"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  position: relative;
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  height: 8px;
  margin-bottom: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  &__wrapper {
    position: relative;
  }

  &__filled {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: var(--color-bronze);
    width: 100%;
  }

  &__label {
    z-index: 1000;
    color: var(--color-text);
    font-size: 14px;
  }

  &__step {
    position: absolute;
    z-index: 2;
    top: -18px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    background: var(--color-bg);
    color: var(--color-gold);

    &.active {
      border: 4px solid var(--color-gold);
      box-shadow: 0px 0px 14px 4px var(--color-gold);
    }

    &:nth-child(1) {
      left: -4px;
    }

    &:nth-child(2) {
      left: calc((100% - 40px) / 3);
    }

    &:nth-child(3) {
      left: calc(2 * (100% - 40px) / 3);
    }

    &:nth-child(4) {
      left: calc(100% - 38px);
    }
  }
}
</style>

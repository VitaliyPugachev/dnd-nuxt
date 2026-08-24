<script setup lang="ts">
import { computed } from 'vue'

const { bonusPoints, isLevelUp } = defineProps<{
  label: string,
  bonusPoints: number,
  baseStat?: number,
  maxStat?: number,
  isLevelUp?: boolean,
}>();
const model = defineModel<number>({required: true});
const availablePoints = defineModel<number>('available', {required: true});

const displayValue = computed(() => model.value + Math.max(0, bonusPoints));

const onIncrement = () => {
  if (!isLevelUp && (model.value === 13 || model.value === 14)) {
    availablePoints.value -= 2;
  } else {
    availablePoints.value -= 1;
  }

  model.value += 1;
}

const onDecrement = () => {
  if (!isLevelUp && (model.value === 14 || model.value === 15)) {
    availablePoints.value += 2;
  } else {
    availablePoints.value += 1;
  }

  model.value -= 1;
}

const upgradeCost = computed(() => {
  if (model.value === 14 || model.value === 13) {
    return 2;
  } else {
    return 1;
  }
})
</script>

<template>
  <div class="ability-counter">
    <div class="ability-counter__label-wrapper">
      <span class="ability-counter__label">
        {{label}}
      </span>
      <span class="ability-counter__bonus" v-if="bonusPoints > 0">
          +{{bonusPoints}}
      </span>
    </div>
    <UiCounter
      :dec-disabled="model <= (baseStat || 8)"
      :inc-disabled="model >= (maxStat || 15) || availablePoints < (isLevelUp ? 1 : upgradeCost)"
      :model-value="displayValue"
      :accent="bonusPoints > 0"
      @dec="onDecrement"
      @inc="onIncrement"
    />
  </div>
</template>

<style lang="scss" scoped>
.ability-counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  &__label {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text);
  }

  &__bonus {
    font-size: 10px;
    align-self: start;
    color: var(--color-accent);
  }

  &__label-wrapper {
    display: flex;
    align-items: center;
    gap: 2px;
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'

const {hitsMax, hitsCurrent} = defineProps<{hitsMax?: number, hitsCurrent?: number}>();
const currentLine = computed(() => {
  if (!hitsMax || !hitsCurrent) return '100%';
  if (!hitsCurrent) return '0%';
  return `${(hitsCurrent / hitsMax) * 100}%`
})
const lineColor = computed(() => {
  if (!hitsMax || !hitsCurrent) return '';
  if (
    hitsMax * 0.2 >= hitsCurrent
  ) return '#D64550';

  return '#16A085'
})
</script>

<template>
  <div class="hits">
    <div :style="{width: currentLine, background: lineColor}" class="hits__bg"></div>
    <span class="hits__label">
      {{`${hitsCurrent}/${hitsMax} HP`}}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.hits {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--color-secondary);
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  &__label {
    z-index: 2;
    font-weight: 600;
  }
}
</style>

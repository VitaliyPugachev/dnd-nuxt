<script setup lang="ts">
import { computed } from 'vue'
import { expPerLevel } from '@/types/local.ts'

const {exp, level} = defineProps<{level?: number, exp?: number}>();

const currentLineWidth = computed(() => {
  if (!exp || !level) return '0%';
  if (level === 20) return '100%';
  const max = expPerLevel[level + 1];

  return `${(exp / max) * 100}%`
})

const canLevelUp = computed(() => {
  if (!level || !exp || level === 20) return false;
  const max = expPerLevel[level + 1];

  return exp >= max;
})
</script>

<template>
  <div class="level" :class="{up: canLevelUp}">
    <div class="level__value">
      <IconsLevelUp class="level__icon" v-if="canLevelUp"/>
      <span>
        {{level}} ур.
      </span>
    </div>
    <div class="level__exp">
      <div :style="{width: currentLineWidth}" class="level__bg"></div>
      <span :class="{small: exp ?? 0 > 9999}">
        {{`${exp} ОП.`}}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.level {
  display: flex;
  border: 1px solid var(--color-secondary);
  border-radius: 4px;

  &__icon {
    width: 14px;
    height: 14px;
  }

  &__value {
    border-right: 1px solid var(--color-secondary);
    padding: 4px 8px;
    color: white;
    background: var(--color-secondary);
    display: flex;
    align-items: center;
  }

  &__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #d9d9d9;
  }

  &__exp {
    padding: 4px 8px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    & > span {
      white-space: nowrap;
      z-index: 2;

      &.small {
        font-size: 12px;
      }
    }
  }

  &.up {
    box-shadow: 0px 0px 8px 1px gold;
  }
}
</style>

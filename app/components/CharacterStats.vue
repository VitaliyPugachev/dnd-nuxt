<script setup lang="ts">
import type { CharacterAbilities } from '@/types/CharacterModel.ts'

defineProps<{stats: CharacterAbilities}>()
</script>

<template>
  <ul class="stats">
    <li class="stats__item">
      <span class="stats__label">
        СИЛ
      </span>
      <span class="stats__value">
        {{stats.strength}}
      </span>
    </li>

    <li class="stats__item">
      <span class="stats__label">
        ЛВК
      </span>
      <span class="stats__value">
        {{stats.dexterity}}
      </span>
    </li>

    <li class="stats__item">
      <span class="stats__label">
        МДР
      </span>
      <span class="stats__value">
        {{stats.wisdom}}
      </span>
    </li>

    <li class="stats__item">
      <span class="stats__label">
        ТЕЛ
      </span>
      <span class="stats__value">
        {{stats.constitution}}
      </span>
    </li>

    <li class="stats__item">
      <span class="stats__label">
        ИНТ
      </span>
      <span class="stats__value">
        {{stats.intelligence}}
      </span>
    </li>

    <li class="stats__item">
      <span class="stats__label">
        ХАР
      </span>
      <span class="stats__value">
        {{stats.charisma}}
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  border-radius: 12px;
  padding: 4px 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__label {
    border-bottom: 1px solid black;
    padding: 4px 0;
  }

  &__value {
    padding: 4px 0;
    font-weight: 600;

  }
}
</style>

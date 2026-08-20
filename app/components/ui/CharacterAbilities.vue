<script setup lang="ts">

import type { CharacterAbilities } from '@/types/CharacterModel.ts'
import { computed } from 'vue'

const {abilities} = defineProps<{abilities?: CharacterAbilities }>();

const translate: Record<keyof CharacterAbilities, string> = {
  charisma: 'ХАР',
  constitution: 'ТЕЛ',
  dexterity: 'ЛВК',
  intelligence: 'ИНТ',
  strength: 'СИЛ',
  wisdom: 'МДР'
}

const abilityList = computed<[string, number][]>(() => {
  if (!abilities) return [];
  return Object.entries(abilities)
})

</script>

<template>
  <ul class="abilities">
    <template v-for="ability in abilityList" :key="ability[0]">
      <li class="abilities__item">
        <span class="abilities__label">{{translate[ability[0] as keyof CharacterAbilities]}}</span>
        <span class="abilities__value">{{ability[1]}}</span>
      </li>
    </template>
  </ul>
</template>

<style lang="scss" scoped>
.abilities {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  &__label {
    font-weight: 500;
    font-size: 16px;
  }
}
</style>

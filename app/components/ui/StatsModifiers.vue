<script setup lang="ts">
import type { CharacterAbilities } from '@/types/CharacterModel.ts'

const {bonusStats, stats} = defineProps<{stats: CharacterAbilities, bonusStats: CharacterAbilities}>();

const displayStats = computed<CharacterAbilities>(() => {
  return {
    constitution: Math.floor((stats.constitution + Math.max(0, bonusStats.constitution) - 10) / 2),
    charisma: Math.floor((stats.charisma + Math.max(0, bonusStats.charisma) - 10) / 2),
    wisdom: Math.floor((stats.wisdom + Math.max(0, bonusStats.wisdom) - 10) / 2),
    strength: Math.floor((stats.strength + Math.max(0, bonusStats.strength) - 10) / 2),
    dexterity: Math.floor((stats.dexterity + Math.max(0, bonusStats.dexterity) - 10) / 2),
    intelligence: Math.floor((stats.intelligence + Math.max(0, bonusStats.intelligence) - 10) / 2),
  }
})
</script>

<template>
  <section class="modifiers">
    <h4 class="modifiers__title">Модификаторы</h4>
    <ul class="modifiers__list">
      <li class="modifiers__item">
        <span class="modifiers__label">
          СИЛ
        </span>
        <span class="modifiers__value" :class="{minus: displayStats.strength < 0, plus: displayStats.strength > 0}">
          {{`${displayStats.strength > 0 ? '+' : ''}${displayStats.strength}`}}
        </span>
      </li>

      <li class="modifiers__item">
        <span class="modifiers__label">
          ЛВК
        </span>
        <span class="modifiers__value" :class="{minus: displayStats.dexterity < 0, plus: displayStats.dexterity > 0}">
          {{`${displayStats.dexterity > 0 ? '+' : ''}${displayStats.dexterity}`}}
        </span>
      </li>

      <li class="modifiers__item">
        <span class="modifiers__label">
          МДР
        </span>
        <span class="modifiers__value" :class="{minus: displayStats.wisdom < 0, plus: displayStats.wisdom > 0}">
          {{`${displayStats.wisdom > 0 ? '+' : ''}${displayStats.wisdom}`}}
        </span>
      </li>

      <li class="modifiers__item">
        <span class="modifiers__label">
          ТЕЛ
        </span>
        <span class="modifiers__value" :class="{minus: displayStats.constitution < 0, plus: displayStats.constitution > 0}">
          {{`${displayStats.constitution > 0 ? '+' : ''}${displayStats.constitution}`}}
        </span>
      </li>

      <li class="modifiers__item">
        <span class="modifiers__label">
          ИНТ
        </span>
        <span class="modifiers__value" :class="{minus: displayStats.intelligence < 0, plus: displayStats.intelligence > 0}">
          {{`${displayStats.intelligence > 0 ? '+' : ''}${displayStats.intelligence}`}}
        </span>
      </li>

      <li class="modifiers__item">
        <span class="modifiers__label">
          ХАР
        </span>
        <span class="modifiers__value" :class="{minus: displayStats.charisma < 0, plus: displayStats.charisma > 0}">
          {{`${displayStats.charisma > 0 ? '+' : ''}${displayStats.charisma}`}}
        </span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.modifiers {
  padding: 20px;
  box-shadow: 0 0 10px var(--color-text);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--color-text);

  &__list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  &__value {
    font-weight: 600;
    font-size: 18px;

    &.minus {
      color: var(--color-error);
    }

    &.plus {
      color: var(--color-accent);
    }
  }
}
</style>

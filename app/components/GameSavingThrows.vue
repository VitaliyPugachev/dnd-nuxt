<script setup lang="ts">
import type { CharacterAbilities, SavingThrowsModel } from '@/types/CharacterModel.ts'

defineProps<{modifiers: CharacterAbilities, savingThrows: SavingThrowsModel, bonus: number}>();
</script>

<template>
  <div class="save-throws">
    <h4 class="save-throws__title">Спасброски</h4>
    <div class="save-throws__content">
      <div class="save-throws__item" :class="{active: savingThrows.strength}">
        <span class="save-throws__label">СИЛ</span>
        <span class="save-throws__value">
          {{`${savingThrows.strength || modifiers.strength > 0 ? '+' : ''}${savingThrows.strength ? modifiers.strength + bonus : modifiers.strength}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.dexterity}">
        <span class="save-throws__label">ЛВК</span>
        <span class="save-throws__value">
          {{`${savingThrows.dexterity || modifiers.dexterity > 0 ? '+' : ''}${savingThrows.dexterity ? modifiers.dexterity + bonus : modifiers.dexterity}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.wisdom}">
        <span class="save-throws__label">МДР</span>
        <span class="save-throws__value">
          {{`${savingThrows.wisdom || modifiers.wisdom > 0 ? '+' : ''}${savingThrows.wisdom ? modifiers.wisdom + bonus : modifiers.wisdom}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.constitution}">
        <span class="save-throws__label">ТЕЛ</span>
        <span class="save-throws__value">
          {{`${savingThrows.constitution || modifiers.constitution > 0 ? '+' : ''}${savingThrows.constitution ? modifiers.constitution + bonus : modifiers.constitution}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.charisma}">
        <span class="save-throws__label">ХАР</span>
        <span class="save-throws__value">
          {{`${savingThrows.charisma || modifiers.charisma > 0 ? '+' : ''}${savingThrows.charisma ? modifiers.charisma + bonus : modifiers.charisma}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.intelligence}">
        <span class="save-throws__label">ИНТ</span>
        <span class="save-throws__value">
          {{`${savingThrows.intelligence || modifiers.intelligence > 0 ? '+' : ''}${savingThrows.intelligence ? modifiers.intelligence + bonus : modifiers.intelligence}`}}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.save-throws {
  padding: 12px;
  box-shadow: 0 4px 20px rgba(0, 0 ,0 , 0.15);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__title {
    font-size: 16px;
    font-weight: 600;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--color-secondary);
  }

  &__label,
  &__value {
    font-weight: 600;
  }
}
</style>

<script setup lang="ts">
import type { CharacterAbilities, SavingThrowsModel } from '@/types/CharacterModel.ts'
import { POPUP_TEXT } from '@/constants/InfoText'

defineProps<{modifiers: CharacterAbilities, savingThrows: SavingThrowsModel, bonus: number}>();
</script>

<template>
  <div class="save-throws">
    <h4 class="save-throws__title">
      Спасброски
      <UiInfoPopup :text="POPUP_TEXT.savingThrows"/>
    </h4>
    <div class="save-throws__content">
      <div class="save-throws__item" :class="{active: savingThrows.strength}">
        <span class="save-throws__label">Сила</span>
        <span class="save-throws__value">
          {{`${savingThrows.strength || modifiers.strength > 0 ? '+' : ''}${savingThrows.strength ? modifiers.strength + bonus : modifiers.strength}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.dexterity}">
        <span class="save-throws__label">Ловкость</span>
        <span class="save-throws__value">
          {{`${savingThrows.dexterity || modifiers.dexterity > 0 ? '+' : ''}${savingThrows.dexterity ? modifiers.dexterity + bonus : modifiers.dexterity}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.wisdom}">
        <span class="save-throws__label">Мудрость</span>
        <span class="save-throws__value">
          {{`${savingThrows.wisdom || modifiers.wisdom > 0 ? '+' : ''}${savingThrows.wisdom ? modifiers.wisdom + bonus : modifiers.wisdom}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.constitution}">
        <span class="save-throws__label">Телосложение</span>
        <span class="save-throws__value">
          {{`${savingThrows.constitution || modifiers.constitution > 0 ? '+' : ''}${savingThrows.constitution ? modifiers.constitution + bonus : modifiers.constitution}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.charisma}">
        <span class="save-throws__label">Харизма</span>
        <span class="save-throws__value">
          {{`${savingThrows.charisma || modifiers.charisma > 0 ? '+' : ''}${savingThrows.charisma ? modifiers.charisma + bonus : modifiers.charisma}`}}
        </span>
      </div>
      <div class="save-throws__item" :class="{active: savingThrows.intelligence}">
        <span class="save-throws__label">Интеллект</span>
        <span class="save-throws__value">
          {{`${savingThrows.intelligence || modifiers.intelligence > 0 ? '+' : ''}${savingThrows.intelligence ? modifiers.intelligence + bonus : modifiers.intelligence}`}}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.save-throws {
  padding: 20px;
  box-shadow: 0 0 10px var(--color-text);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--color-text);

  &__title {
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--color-accent-secondary);

    &.active {
      color: var(--color-accent);
    }
  }

  &__label,
  &__value {
    font-weight: 600;
  }
}
</style>

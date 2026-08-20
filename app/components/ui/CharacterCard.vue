<script setup lang="ts">
import type { CharacterModel } from '@/types/CharacterModel.ts'
import CharacterAbilities from '@/components/ui/CharacterAbilities.vue'

defineProps<{ character: CharacterModel }>();
defineEmits(['onDelete', 'onSelect']);
</script>

<template>
  <article class="character">
    <div class="character__header-wrapper">
      <header class="character__header">
        <h4 class="character__name">{{character?.name || 'Имя не указано'}}</h4>
        <span class="character__class">{{character.class || 'Не указан'}}, {{character.level || 1}} уровня</span>
        <span class="character__race">{{character.race || 'Не указана'}}</span>
      </header>

      <div class="character__buttons">
        <UiButton primary label="Выбрать" @click="$emit('onSelect', character.id)"/>
        <UiButton label="Удалить" @click="$emit('onDelete', character)"/>
      </div>
    </div>
    <CharacterAbilities :abilities="character?.abilities"/>
  </article>
</template>

<style lang="scss" scoped>
.character {
  border: 1px solid var(--color-secondary);
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--color-main);
  color: var(--color-text);

  &__header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__buttons {
    display: flex;
    gap: 4px;
    flex-direction: column;
  }

  &__name {
    font-size: 20px;
    font-weight: 600;
  }

  &__class,
  &__race {
    font-size: 16px;
    font-weight: 400;
  }
}
</style>

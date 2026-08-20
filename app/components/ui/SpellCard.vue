<script setup lang="ts">
import type { SpellModel } from '@/types/CharacterModel.ts'

defineEmits(['onDelete'])
defineProps<{spell: SpellModel, hideDeletable?: boolean}>()
</script>

<template>
  <article class="spell-card">
    <div class="spell-card__header">
      <h5 class="spell-card__title">
        {{spell.name}}
      </h5>
      <UiButton v-if="!hideDeletable" medium label="Удалить" @click="$emit('onDelete', spell)"/>
    </div>
    <p class="spell-card__description">
      {{spell.description}}
    </p>
    <div class="spell-card__about">
      <div class="spell-card__chip" v-if="spell.damage">
        <IconsSword/>
        {{spell.damage}}
      </div>

      <div class="spell-card__chip" v-if="spell.castingTime">
        <IconsTime/>
        {{spell.castingTime}}
      </div>

      <div class="spell-card__chip" v-if="spell.range">
        <IconsRange/>
        {{spell.range}}
      </div>

      <div class="spell-card__chip" v-if="spell.duration">
        <IconsHourglass/>
        {{spell.duration}}
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.spell-card {
  padding: 12px 10px;
  border-radius: 12px;
  border: 1px solid var(--color-secondary);
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--color-main);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
  }

  &__description {
    font-style: italic;
  }

  &__about {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
  }

  &__chip {
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    border: 1px solid var(--color-secondary);
  }
}
</style>

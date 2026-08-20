<script setup lang="ts">
import type { ArmorModel } from '@/types/ArmorModel.ts'

defineProps<{
  armor: ArmorModel,
  deletable?: boolean,
  isHeavy?: boolean,
  proficient?: boolean,
  equipped?: boolean
}>();
defineEmits(['onClick', 'onDelete']);
</script>

<template>
  <article class="armor" :class="{deletable: deletable, proficient: !proficient, equipped: equipped}">
    <h5 class="armor__subtitle">{{armor.name}}</h5>
    <span class="armor__type armor__center">{{armor.type}}</span>
    <div class="armor__center">
      <IconsVisible v-if="armor.stealthDisadvantage"/>
      <IconsInvisible v-else/>
    </div>
    <div class="armor__col armor__center" :class="{heavy: isHeavy}">
      <span class="armor__type">СИЛ</span>
      <span class="armor__type">{{armor.strengthRequirement || 'люб.'}}</span>
    </div>
    <div class="armor__points armor__center">
      <IconsShield/>
      <span class="armor__type">{{armor.ac}}</span>
    </div>
    <UiButton medium clear-background borderless v-if="deletable" @click="$emit('onDelete', armor)">
      <IconsDelete/>
    </UiButton>
  </article>
</template>

<style lang="scss" scoped>
.armor {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--color-secondary);
  position: relative;

  &.deletable {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 30px;
  }

  &.proficient {
    border: 2px solid var(--color-error);
  }

  &.equipped:after {
    content: 'н';
    font-weight: 600;
    position: absolute;
    right: 2px;
    top: -2px;
  }

  &__subtitle {
    font-size: 12px;
    font-weight: 600;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: manual;
  }

  &__col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    &.heavy {
      color: var(--color-error);
      font-weight: 600;
    }
  }

  &__points {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 600;
  }

  &__type {
    font-size: 12px;
  }

  &__center {
    justify-self: center;
  }
}
</style>

<script setup lang="ts">
import type { WeaponModel } from '@/types/WeaponModel.ts'

defineProps<{weapon: WeaponModel, deletable?: boolean}>();
defineEmits(['onClick', 'onDelete']);
</script>

<template>
  <article class="weapon" :class="{deletable: deletable}" @click="$emit('onClick', weapon)">
    <h5 class="weapon__title">{{weapon.name}}</h5>
    <span class="weapon__damage">{{weapon.damage}}</span>
    <span class="weapon__type">{{weapon.damageType}}</span>
    <UiButton medium clear-background borderless fit v-if="deletable" @click="$emit('onDelete', weapon)">
      <IconsDelete/>
    </UiButton>
  </article>
</template>

<style lang="scss" scoped>
.weapon {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  &__title {
    font-size: 14px;
    color: var(--color-text);
  }

  &__type {
    font-size: 12px;
    color: var(--color-text-secondary);
  }

  &__damage {
    font-size: 14px;
    color: var(--color-accent);
    font-weight: 600;
    margin-left: auto;
  }
}
</style>

<script setup lang="ts">
import type { WeaponModel } from '@/types/WeaponModel.ts'

defineProps<{weapon: WeaponModel, deletable?: boolean}>();
defineEmits(['onClick', 'onDelete']);
</script>

<template>
  <article class="weapon" :class="{deletable: deletable}" @click="$emit('onClick', weapon)">
    <h5 class="weapon__title">{{weapon.name}}</h5>
    <span class="weapon__type">{{weapon.type}}</span>
    <span class="weapon__type">{{weapon.damageType}}</span>
    <span class="weapon__damage">{{weapon.damage}}</span>
    <UiButton medium clear-background borderless v-if="deletable" @click="$emit('onDelete', weapon)">
      <IconsDelete/>
    </UiButton>
  </article>
</template>

<style lang="scss" scoped>
.weapon {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 30px;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--color-secondary);

  &.deletable {
    grid-template-columns: 1fr 1fr 1fr 30px 50px;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
  }

  &__type {
    font-size: 12px;
  }

  &__damage {
    font-size: 12px;
    color: var(--color-accent);
    font-weight: 600;
  }
}
</style>

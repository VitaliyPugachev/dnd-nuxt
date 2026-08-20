<script setup lang="ts">
import type { SpellModel } from '@/types/CharacterModel.ts'

defineProps<{spells: SpellModel[]}>()
</script>

<template>
  <div class="spell__container">
    <template v-for="spell in spells" :key="spell.name">
      <UiSpellCard :spell hide-deletable/>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.spell__container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

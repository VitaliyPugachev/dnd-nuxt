<script setup lang="ts">
import type { CharacterModel, SubclassModel } from '@/types/CharacterModel.ts'
import { computed } from 'vue'
import { subclasses } from '@/constants/Subclasses.ts'

const character = defineModel<CharacterModel>();

const characterSubclasses = computed<SubclassModel[]>(() => {
  if (!character.value?.class || !subclasses.hasOwnProperty(character.value.class)) {
    return []
  }
  return subclasses[character.value.class];
})

const onSelectSubclass = (sub: SubclassModel) => {
  if (!character.value) return;

  character.value.subclass = sub
}

</script>

<template>
  <div class="subclasses">
    <p class="subclasses__warning" v-if="!characterSubclasses.length">На данный момент для выбранного класса не доступен подкласс</p>
    <div class="subclasses__list">
      <template v-for="subclass in characterSubclasses">
        <div
          class="subclasses__item"
          :class="{active: subclass.name === character?.subclass?.name}"
          @click="onSelectSubclass(subclass)"
        >
          <span class="subclasses__name">
            {{subclass.name}}
          </span>
          <span class="subclasses__description">
            {{subclass.description}}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subclasses {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__name {
    font-weight: 600;
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    padding: 12px;
    border: 1px solid var(--color-secondary);
    border-radius: 8px;

    &.active {
      background: var(--color-accent);
      color: white;
    }
  }
}
</style>

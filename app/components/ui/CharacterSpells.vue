<script setup lang="ts">
import type { SpellModel } from '@/types/CharacterModel.ts'
import ModalComponent from '@/components/widgets/ModalComponent.vue'
import { computed, ref, watch } from 'vue'
import InputUi from '~/components/ui/Input.vue'

const emits = defineEmits(['onAddSpell', 'onDeleteSpell']);
const {notShownSpells, spellList} = defineProps<{spellList?: SpellModel[], notShownSpells?: SpellModel[]}>();

const isCreateModalOpen = ref(false);

const newSpell = ref<SpellModel>({
  name: '',
  description: '',
  castingTime: '',
  damage: '',
  duration: '',
  range: ''
})

const onClearSpell = () => {
  newSpell.value.description = '';
  newSpell.value.castingTime = '';
  newSpell.value.damage = '';
  newSpell.value.duration = '';
  newSpell.value.range = '';
  newSpell.value.name = '';
}

const onAddSpell = () => {
  emits('onAddSpell', {...newSpell.value});
  isCreateModalOpen.value = false;
}

const onDeleteSpell = (spell: SpellModel) => {
  if (!spell) return;

  emits('onDeleteSpell', spell)
}

const filteredSpellList = computed(() => {
  if (!spellList?.length) {
    return []
  }

  if (!notShownSpells?.length) {
    return spellList
  }

  const names: string[] = notShownSpells.map((spell: SpellModel) => spell.name)

  return spellList.filter(spell => {
    return !names.includes(spell.name)
  })
})

watch(isCreateModalOpen, () => onClearSpell());
</script>

<template>
  <div class="spells">
    <UiButton medium class="spells__add-button"  label="Добавить" @click="isCreateModalOpen = true">
      <IconsAdd/>
    </UiButton>
    <template v-for="spell in filteredSpellList">
      <UiSpellCard :spell @on-delete="onDeleteSpell" />
    </template>
  </div>

  <ModalComponent :visible="isCreateModalOpen" @close="isCreateModalOpen = false">
    <div class="create-spell">
      <header class="create-spell__header">
        <h3 class="create-spell__title">Добавить заклинание / умение</h3>
        <UiButton medium borderless @click="isCreateModalOpen = false">
          <IconsClose/>
        </UiButton>
      </header>
      <section class="create-spell__form">
        <div class="create-spell__field">
          <span class="create-spell__label required">
            Название
          </span>
          <InputUi compact v-model="newSpell.name"/>
        </div>

        <div class="create-spell__field">
          <span class="create-spell__label">
            Скорость сотворения
          </span>
          <InputUi compact v-model="newSpell.castingTime"/>
        </div>

        <div class="create-spell__field">
          <span class="create-spell__label">
            Дальность, радиус действия
          </span>
          <InputUi compact v-model="newSpell.range"/>
        </div>

        <div class="create-spell__field">
          <span class="create-spell__label">
            Урон
          </span>
          <InputUi compact v-model="newSpell.damage"/>
        </div>

        <div class="create-spell__field">
          <span class="create-spell__label">
            Длительность эффекта
          </span>
          <InputUi compact v-model="newSpell.duration"/>
        </div>

        <div class="create-spell__field">
          <span class="create-spell__label required">
            Описание
          </span>
          <textarea class="create-spell__textarea" v-model="newSpell.description"/>
        </div>

        <UiButton class="create-spell__button" label="Добавить" primary @click="onAddSpell" />
      </section>
    </div>
  </ModalComponent>
</template>

<style lang="scss" scoped>
.spells {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--color-text);

  &__add-button {
    align-self: stretch;
  }
}

.create-spell {
  color: var(--color-text);
  &__header {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 6px;
    justify-content: space-between;
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__label {
    font-size: 14px;

    &.required:after {
      content: ' *';
      color: var(--color-error);
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__textarea {
    resize: none;
    height: 100px;
    border-radius: 8px;
    padding: 4px;
    outline: none;
    border: none;
    background: var(--color-accent-secondary);
    color: var(--color-text);
  }

  &__button {
    align-self: stretch;
    margin-top: 10px;
  }
}
</style>

<script setup lang="ts">
import ModalComponent from '@/components/widgets/ModalComponent.vue'
import type {
  CharacterAbilities,
  CharacterModel,
  SpellModel
} from '@/types/CharacterModel.ts'
import AbilityCounter from '@/components/widgets/AbilityCounter.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { applyRaceBonusStats } from '@/utils/statsUtil.ts'
import { expPerLevel } from '@/types/local.ts'
import { useNotificationStore } from '@/stores/notification.ts'
import { ASI_LEVELS, SKILL_LEVELS } from '@/constants/LevelBonuses.ts'
import CharacterSpells from '@/components/ui/CharacterSpells.vue'
import SubclassSelect from '@/components/SubclassSelect.vue'
import { subclasses } from '@/constants/Subclasses.ts'

const {isOpen} = defineProps<{
  isOpen: boolean,
  baseAbilities?: CharacterAbilities
  baseSpells?: SpellModel[]
}>();
const emits = defineEmits(['onClose']);

const {showNotification} = useNotificationStore()

const character = defineModel<CharacterModel>('character');
const abilityPoints = ref(0);
const bonusPoints = reactive<CharacterAbilities>({
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
});

const isASI = computed(() => {
  if (!character.value) return false;
  return ASI_LEVELS.includes(character.value.level + 1)
})

const isNewSkills = computed(() => {
  if (!character.value) return false;
  return SKILL_LEVELS.includes(character.value.level + 1)
})

const isSubclassSelect = computed(() => {
  if (!character.value) return false;
  return character.value.level + 1 === 3
})

const getAvailablePoints = () => {
  if (!character.value?.level) return;
  if (isASI) {
    abilityPoints.value = 2
  }
}

const onAddSpell = (spell?: SpellModel) => {
  if (!spell) return;
  character.value?.spells?.push(spell);
}

const onDeleteSpell = (spell?: SpellModel) => {
  if (!spell) return;
  const index = character.value?.spells?.findIndex(el => el.name === spell.name) ?? -1;
  if (index < 0) return;
  character.value?.spells?.splice(index, 1);
}

const apply = () => {
  if (!character.value) return;

  if (isASI.value && abilityPoints.value) {
    showNotification('Распределите все очки способностей', 3000, 'error');
    return
  }

  if (subclasses.hasOwnProperty(character.value.class) && isSubclassSelect.value && !character.value.subclass) {
    showNotification('Выбирете подкласс', 3000, 'error')
    return
  }

  character.value.level += 1;
  character.value.experience -= expPerLevel[character.value.level];

  emits('onClose');
}

watch(() => isOpen, () => {
  getAvailablePoints();
})

onMounted(() => {
  if (!character.value) return;
  applyRaceBonusStats(bonusPoints, character.value.race);
})

</script>

<template>
  <ModalComponent :visible="isOpen" @close="$emit('onClose')">
    <div class="level-up" v-if="character">
      <header class="level-up__header">
        <h4 class="level-up__title">Повысить уровень</h4>
        <UiButton @click="$emit('onClose')" medium borderless>
          <IconsClose/>
        </UiButton>
      </header>
      <section class="level-up__current">
        Уровень
        <span>{{character?.level ?? 1}} <IconsArrowRight/> {{(character.level ?? 1) + 1}}</span>
      </section>
      <section class="level-up__skill" v-if="isNewSkills">
        <h4 class="level-up__subtitle">Вам доступны новые чары, магия или боевые навыки</h4>
        <CharacterSpells
          :spell-list="character.spells"
          :not-shown-spells="baseSpells"
          @on-add-spell="onAddSpell"
          @on-delete-spell="onDeleteSpell"
        />
      </section>
      <section class="level-up__subclass" v-if="isSubclassSelect">
        <h4 class="level-up__subtitle">Выбор подкласса</h4>
        <SubclassSelect v-model="character"/>
      </section>
      <section class="level-up__section" v-if="isASI">
        <h4 class="level-up__subtitle">Очки способностей</h4>
        <section class="level-up__abilities" v-if="character?.abilities">
          <AbilityCounter
            label="СИЛ"
            v-model="character.abilities.strength"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.strength"
            :base-stat="baseAbilities?.strength || 8"
            :max-stat="20"
            is-level-up
          />
          <AbilityCounter
            label="ТЕЛ"
            v-model="character.abilities.constitution"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.constitution"
            :base-stat="baseAbilities?.constitution || 8"
            :max-stat="20"
            is-level-up
          />
          <AbilityCounter
            label="ЛВК"
            v-model="character.abilities.dexterity"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.dexterity"
            :base-stat="baseAbilities?.dexterity || 8"
            :max-stat="20"
            is-level-up
          />
          <AbilityCounter
            label="ИНТ"
            v-model="character.abilities.intelligence"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.intelligence"
            :base-stat="baseAbilities?.intelligence || 8"
            :max-stat="20"
            is-level-up
          />
          <AbilityCounter
            label="МДР"
            v-model="character.abilities.wisdom"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.wisdom"
            :base-stat="baseAbilities?.wisdom || 8"
            :max-stat="20"
            is-level-up
          />
          <AbilityCounter
            label="ХАР"
            v-model="character.abilities.charisma"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.charisma"
            :base-stat="baseAbilities?.charisma || 8"
            :max-stat="20"
            is-level-up
          />
        </section>
        <span>Доступно: {{abilityPoints}}</span>
      </section>
      <div class="level-up__footer">
        <p class="level-up__warning" v-if="isNewSkills">
          Чары, магию и боевые навыки нельзя изменить после повышения уровня. Проверьте заполненные данные!
        </p>
        <UiButton
          class="level-up__apply-button"
          @click="apply"
          label="Повысить уровень"
          primary
        />
      </div>
    </div>
  </ModalComponent>

</template>

<style lang="scss" scoped>
.level-up {
  min-height: 90vh;
  min-width: 310px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 90vh;
  overflow-y: auto;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    text-align: center;
    width: 100%;
    margin-left: 20px;
    font-weight: 600;
    font-size: 18px;
  }

  &__abilities {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 16px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__subtitle {
    font-size: 16px;
    font-weight: 500;
  }

  &__current {
    font-size: 20px;
    display: flex;
    gap: 4px;

    & > span {
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  &__skill {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__subclass {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__warning {
    color: var(--color-error);
    font-weight: 600;
  }

  &__footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>

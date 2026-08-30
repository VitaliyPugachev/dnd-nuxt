<script setup lang="ts">
import type { CharacterAbilities, CharacterSkillsModel } from '@/types/CharacterModel.ts'
import { computed, reactive, ref, watch } from 'vue'

const modifiers = defineModel<CharacterAbilities>('modifier',{required: true});
const skills = defineModel<CharacterSkillsModel>({required: true});
const {
  bonusValue = 2,
  background,
  available
} = defineProps<{bonusValue: number, background: string[], available: number}>();

interface SkillModel {
  name: string,
  modifierName: string,
}

const skillsTranslate = reactive<Record<keyof CharacterSkillsModel, SkillModel>>(
  {
    acrobatics : {name: 'Акробатика', modifierName: 'ЛВК'},
    animalHandling : {name: 'Уход за животными', modifierName: 'МДР'},
    arcana : {name: 'Магия', modifierName: 'ИНТ'},
    athletics : {name: 'Атлетика', modifierName: 'СИЛ'},
    deception : {name: 'Обман', modifierName: 'ХАР'},
    history : {name: 'История', modifierName: 'ИНТ'},
    insight : {name: 'Проницательность', modifierName: 'МДР'},
    intimidation : {name: 'Запугивание', modifierName: 'ХАР'},
    investigation : {name: 'Анализ', modifierName: 'ИНТ'},
    medicine : {name: 'Медицина', modifierName: 'МДР'},
    nature : {name: 'Природа', modifierName: 'ИНТ'},
    perception : {name: 'Внимательность', modifierName: 'МДР'},
    performance : {name: 'Выступление', modifierName: 'ХАР'},
    persuasion : {name: 'Убеждение', modifierName: 'ХАР'},
    religion : {name: 'Религия', modifierName: 'ИНТ'},
    sleightOfHand : {name: 'Ловкость рук', modifierName: 'ЛВК'},
    stealth : {name: 'Скрытность', modifierName: 'ЛВК'},
    survival : {name: 'Выживание', modifierName: 'МДР'}
  }
)

const getModifierByName = (name: string, applyBonus?: boolean) => {
  let value = 0;
  if (name === 'СИЛ') value = modifiers.value.strength;
  if (name === 'ЛВК') value = modifiers.value.dexterity;
  if (name === 'ХАР') value = modifiers.value.charisma;
  if (name === 'ИНТ') value = modifiers.value.intelligence;
  if (name === 'МДР') value = modifiers.value.wisdom;
  if (name === 'ТЕЛ') value = modifiers.value.constitution;

  if (applyBonus) value += bonusValue;

  if (value > 0) return `+${value}`
  return value;
}

const usedPoints = ref(0);
const displayedPoints = computed(() => {
  return available - usedPoints.value;
})

const onSelectSkill = (val: unknown, cb: () => void) => {
  if (typeof val !== 'boolean') return;

  if (usedPoints.value >= available && !val) return;
  if (usedPoints.value <= 0 && val) return;

  val ? usedPoints.value-- : usedPoints.value++;

  cb();
}


watch(() => background, () => {
  usedPoints.value = 0;
  for (const key in skillsTranslate) {
    if (background.includes(skillsTranslate[key as keyof CharacterSkillsModel].name)) {
      skills.value[key as keyof CharacterSkillsModel] = true;
    }
  }
})
</script>

<template>
  <section class="skills">
    <span class="skills__available">Доступно: {{displayedPoints}}</span>
    <ul class="skills__list">
      <template v-for="[key, skill] in Object.entries(skillsTranslate)" :key="key">
        <li class="skills__item">
          <div class="skills__info">
            <UiCheckbox
              v-model="skills[key as keyof typeof skills]"
              :disabled="background.includes(skill.name)"
              :label="skill.name"
            />
            <span>({{skill.modifierName}})</span>
          </div>
          <div>
            {{ getModifierByName(skill.modifierName, skills[key as keyof typeof skills]) }}
          </div>
        </li>
      </template>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.skills {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--color-text);
  padding: 12px;
  font-size: 16px;
  border-radius: 12px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);

  &__list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0;

  }

  &__item {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: space-between;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__bonus {
    font-size: 8px;
    align-self: start;
    color: var(--color-accent);
  }

  &__available {
    font-weight: 600;
    align-self: end;
  }
}
</style>

<script setup lang="ts">
import type { CharacterAbilities, CharacterSkillsModel } from '@/types/CharacterModel.ts'
import { reactive } from 'vue'
import SkillBonusValue from '@/components/ui/SkillBonusValue.vue'

const {
  bonusValue = 2,
  backgroundSkills,
  skills,
  modifiers,
} = defineProps<{
  bonusValue: number,
  backgroundSkills: string[],
  skills: CharacterSkillsModel,
  modifiers: CharacterAbilities
}>();

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
  if (name === 'СИЛ') value = modifiers.strength;
  if (name === 'ЛВК') value = modifiers.dexterity;
  if (name === 'ХАР') value = modifiers.charisma;
  if (name === 'ИНТ') value = modifiers.intelligence;
  if (name === 'МДР') value = modifiers.wisdom;
  if (name === 'ТЕЛ') value = modifiers.constitution;

  if (applyBonus) value += bonusValue;

  return value;
}

</script>

<template>
  <section class="skills">
    <ul class="skills__list">
      <template v-for="[key, skill] in Object.entries(skillsTranslate)" :key="key">
        <li class="skills__item">
          <div class="skills__info">
            <span class="skills__name">{{skill.name}}</span>
            <span>({{skill.modifierName}})</span>
            <div class="skills__bonus" v-if="backgroundSkills.includes(skill.name)">
              (предыстория)
            </div>
          </div>
          <div class="skills__divider"></div>
          <SkillBonusValue :value="getModifierByName(skill.modifierName, skills[key as keyof typeof skills])"/>
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

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    display: flex;
    align-items: baseline;
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

  &__divider {
    flex: 1 0;
    width: 100%;
    border-bottom: 1px dashed var(--color-secondary);
  }
}
</style>

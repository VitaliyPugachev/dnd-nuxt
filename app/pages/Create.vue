<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import InputUi from '~/components/ui/Input.vue'
import { computed, onUnmounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type {
  CharacterAbilities,
  CharacterSkillsModel, SpellModel
} from '@/types/CharacterModel.ts'
import { useNotificationStore } from '@/stores/notification.ts'
import {
  calcProficiencyBonus,
  characterAlignments,
  characterClasses,
  characterRaces, getHitsByClass, getSkillPointByClass, getSpeedByRace
} from '@/types/local.ts'
import { storeToRefs } from 'pinia'
import { applyRaceBonusStats } from '@/utils/statsUtil.ts'
import CharacterSecondaryStats from '@/components/ui/CharacterSecondaryStats.vue'
import StatsModifiers from '@/components/ui/StatsModifiers.vue'
import { calcModifiers } from '@/utils/calcModifiers.ts'
import { backgroundList, getBonusSkillsByBackground } from '@/constants/BackgroundList.ts'
import { applySavingThrowProficiencies } from '@/utils/getSavingThrow.ts'
import SavingThrows from '@/components/ui/SavingThrows.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import { useCreateCharacter } from '@/composables/useCreateCharacter.ts'
import PhotoUploader from '@/components/ui/PhotoUploader.vue'
import { POPUP_TEXT } from '@/constants/InfoText.ts'
import characterApi from '@/api/character'
import AppHeader from '~/components/widgets/AppHeader.vue'

const router = useRouter();
const loading = ref(false);
const { showNotification } = useNotificationStore();
const { isAuth } = storeToRefs(useAuth());

const {
  newCharacter,
  validateStepOne,
  validateStepTwo,
  abilityPoints
} = useCreateCharacter();

const currentStep = ref(1);

const backgroundOptions = backgroundList.map(item => item.name);

const bonusPoints = reactive<CharacterAbilities>({
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
});

const statsModifiers = computed(() => {
  if (!newCharacter.abilities) return {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  }

  return {
    strength: calcModifiers(newCharacter.abilities.strength, bonusPoints.strength),
    dexterity: calcModifiers(newCharacter.abilities.dexterity, bonusPoints.dexterity),
    constitution: calcModifiers(newCharacter.abilities.constitution, bonusPoints.constitution),
    intelligence: calcModifiers(newCharacter.abilities.intelligence, bonusPoints.intelligence),
    wisdom: calcModifiers(newCharacter.abilities.wisdom, bonusPoints.wisdom),
    charisma: calcModifiers(newCharacter.abilities.charisma, bonusPoints.charisma),
  }
})

const proficiencyBonus = computed(() => {
  return calcProficiencyBonus(newCharacter.level);
});

const classHits = computed(() => {
  return getHitsByClass(newCharacter.class, newCharacter.level);
})

const speed = computed(() => {
  return getSpeedByRace(newCharacter.race)
});

const bonusSkills = computed(() => {
  return getBonusSkillsByBackground(newCharacter.background);
});

const availableSkillPoints = computed(() => {
  return getSkillPointByClass(newCharacter.class);
});

const armorClass = computed(() => {
  let value = 0;

  const shield = newCharacter.equipment?.armor?.find(item => item.type === 'щит');

  if (shield) {
    value += 2
  }

  if (!newCharacter.equipment?.armor?.length
    || (newCharacter.equipment?.armor?.length && newCharacter?.equipment?.armor?.[0]?.type === 'щит')
  ) {
    value += 10 + statsModifiers.value.dexterity
    if (newCharacter.class === 'Монах') {
      return value + statsModifiers.value.wisdom;
    }
    if (newCharacter.class === 'Варвар') {
      return value + statsModifiers.value.constitution
    }

    return value;
  }

  let equippedArmor = newCharacter.equipment.armor[0];

  if (equippedArmor?.type === 'щит' && newCharacter.equipment.armor.length > 1) {
    equippedArmor = newCharacter.equipment.armor[1];
  }

  if (equippedArmor?.type === 'тяжёлый') return value + equippedArmor.ac;
  if (equippedArmor?.type === 'средний') {
    return value + (statsModifiers.value.dexterity > 2 ? 2 : statsModifiers.value.dexterity) + equippedArmor.ac
  }

  return value + statsModifiers.value.dexterity + (equippedArmor?.ac || 0);
})

const clearBonusAbilities = () => {
  //Сбросить все характеристики

  for (let key in bonusPoints) {
    if (bonusPoints.hasOwnProperty(key)) {
      bonusPoints[key as keyof CharacterAbilities] = 0;
    }
  }
}

const clearAbilities = () => {
  //Сбросить все характеристики
  abilityPoints.value = 27;

  for (let key in newCharacter.abilities) {
    if (newCharacter.abilities.hasOwnProperty(key)) {
      newCharacter.abilities[key as keyof CharacterAbilities] = 8;
    }
  }
}

const clearSkills = () => {
  if (!newCharacter.skills) return;

  for (let key in newCharacter.skills) {
    if (newCharacter.skills.hasOwnProperty(key)) {
      newCharacter.skills[key as keyof CharacterSkillsModel] = false;
    }
  }
}

const clearEquipment = () => {
  if (!newCharacter.equipment) return;
  newCharacter.equipment.armor = [];
  newCharacter.equipment.weapons = [];
}

const clearData = () => {
  //Сбросить основные статы
  newCharacter.name = '';
  newCharacter.alignment = '';
  newCharacter.background = '';
  newCharacter.experience = 0;
  newCharacter.class = '';
  newCharacter.race = '';
  newCharacter.level = 1;

  clearAbilities();
  clearSkills();
  clearEquipment();
}

const onChangeRace = (race: string) => {
  if (!newCharacter.abilities) return;
  clearBonusAbilities();
  applyRaceBonusStats(bonusPoints, race);
};

const onChangeBackground = () => {
  clearSkills()
}

const onChangeClass = () => {
  clearSkills();
  newCharacter.background = '';
  applySavingThrowProficiencies(newCharacter);
}

const onAddSpell = (spell?: SpellModel) => {
  if (!spell) return;
  newCharacter.spells?.push(spell);
}

const onDeleteSpell = (spell?: SpellModel) => {
  if (!spell) return;
  const index = newCharacter.spells?.findIndex(el => el.name === spell.name) ?? -1;
  if (index < 0) return;
  newCharacter.spells?.splice(index, 1);
}

const createNewCharacter = async () => {
  if (!isAuth.value) {
    showNotification('Для сохранения персанажа необходимо авторизоваться в telegram', 3000, 'error');
    return;
  }

  loading.value = true;

  try {
    newCharacter.combat.currentHp = classHits.value + (statsModifiers.value.constitution * newCharacter.level);

    const { data } = await characterApi.createCharacter(newCharacter)

    if (!data.success) {
      throw new Error(String(data.message))
    } else {
      showNotification('Персонаж успешно создан!', 4000);
      clearData();
      await router.push('/')
    }
  } catch(e) {
    showNotification(String(e), 4000, 'error');
  } finally {
    loading.value = false;
  }
}

const nextStep = () => {
  if (currentStep.value >= 4) return

  if (currentStep.value === 1 && !validateStepOne()) {
    return
  }

  if (currentStep.value === 2 && !validateStepTwo()) {
    return
  }

  currentStep.value += 1
}

const prevStep = () => {
  if (currentStep.value <= 1) return
  currentStep.value -= 1
}

onUnmounted(() => {
  clearData();
})

</script>

<template>
  <div class="create-page">
    <WidgetsAppHeader/>
    <ProgressBar class="create-page__progress" :total="4" :value="currentStep"/>

    <template v-if="currentStep === 1">
      <section class="create-page__section photo">
        <PhotoUploader v-model="newCharacter.imageId"/>
      </section>
      <InputUi placeholder="Имя персонажа" ref="nameElement" v-model="newCharacter.name"/>
      <section class="create-page__section">
        <UiTitle content="о персонаже">
          <UiInfoPopup :text="POPUP_TEXT.mainInfo"/>
        </UiTitle>
        <UiRoundedInput
          v-model="newCharacter.class"
          ref="classElement"
          label="Класс"
          placeholder="Выберите класс"
          type="select"
          :options="characterClasses"
          @update:model-value="onChangeClass"
        />
        <UiRoundedInput
          v-model="newCharacter.race"
          label="Раса"
          type="select"
          placeholder="Выберите расу"
          :options="characterRaces"
          @update:modelValue="(val) => {typeof val === 'string' ? onChangeRace(val): null}"
        />

        <UiRoundedInput
          v-model="newCharacter.background"
          :options="backgroundOptions"
          label="Предыстория"
          type="select"
          placeholder="Выберите предысторию"
          @update:model-value="onChangeBackground"
        />
        <UiRoundedInput
          label="Мировоззрение"
          v-model="newCharacter.alignment"
          type="select"
          placeholder="Выберите мировоззрение"
          :options="characterAlignments"
        />
      </section>
    </template>

    <template v-if="currentStep === 2">
      <section class="create-page__section" ref="abilityElement">
        <UiTitle content="Очки способностей">
          <UiInfoPopup :text="POPUP_TEXT.skillPoints"/>
        </UiTitle>
        <section class="create-page__abilities">
          <WidgetsAbilityCounter
            label="СИЛ"
            v-model="newCharacter.abilities.strength"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.strength"
            v-if="newCharacter.abilities?.strength"
          />
          <WidgetsAbilityCounter
            label="ТЕЛ"
            v-model="newCharacter.abilities.constitution"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.constitution"
            v-if="newCharacter.abilities?.constitution"
          />
          <WidgetsAbilityCounter
            label="ЛВК"
            v-model="newCharacter.abilities.dexterity"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.dexterity"
            v-if="newCharacter.abilities?.dexterity"
          />
          <WidgetsAbilityCounter
            label="ИНТ"
            v-model="newCharacter.abilities.intelligence"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.intelligence"
            v-if="newCharacter.abilities?.intelligence"
          />
          <WidgetsAbilityCounter
            label="МДР"
            v-model="newCharacter.abilities.wisdom"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.wisdom"
            v-if="newCharacter.abilities?.wisdom"
          />
          <WidgetsAbilityCounter
            label="ХАР"
            v-model="newCharacter.abilities.charisma"
            v-model:available="abilityPoints"
            :bonus-points="bonusPoints.charisma"
            v-if="newCharacter.abilities?.charisma"
          />
        </section>
        <span class="create-page__available">
          <span>Доступно: <b>{{abilityPoints}}</b></span>
        </span>
      </section>

      <section class="create-page__section">
        <UiTitle content="характеристики"/>
        <CharacterSecondaryStats
          :armor="armorClass"
          :initiative="statsModifiers.dexterity"
          :hp="classHits + (statsModifiers.constitution * newCharacter.level)"
          :speed="speed"
        />
        <div class="create-page__bonus">
          <span class="create-page__bonus-label">Бонус мастерства:</span>
          <span class="create-page__bonus-value">+{{proficiencyBonus}}</span>
        </div>


        <UiTitle content="Модификаторы"/>
        <StatsModifiers :stats="newCharacter.abilities" :bonus-stats="bonusPoints" v-if="newCharacter.abilities"/>

        <UiTitle content="Спасброски">
          <UiInfoPopup :text="POPUP_TEXT.savingThrows"/>
        </UiTitle>
        <SavingThrows :bonus="proficiencyBonus" :modifiers="statsModifiers" :saving-throws="newCharacter.savingThrows"/>
      </section>
    </template>

    <template v-if="currentStep === 3">
      <section class="create-page__section">
        <UiTitle content="Навыки">
          <UiInfoPopup :text="POPUP_TEXT.abilities"/>
        </UiTitle>
        <UiCharacterSkills
          v-model:modifier="statsModifiers"
          v-model="newCharacter.skills"
          :bonus-value="proficiencyBonus"
          :background="bonusSkills"
          :available="availableSkillPoints || 0"
          v-if="newCharacter.skills"/>
      </section>
    </template>

    <template v-if="currentStep === 4">
      <section class="create-page__section">
        <UiTitle content="Снаряжение"/>
        <UiCharacterEquipment
          v-model="newCharacter"
          :class-name="newCharacter.class"
          :strength="newCharacter.abilities?.strength"
        />
      </section>

      <section class="create-page__section">
        <UiTitle content="Заклинания / умения"/>
        <UiCharacterSpells
          :spell-list="newCharacter.spells"
          @on-add-spell="onAddSpell"
          @on-delete-spell="onDeleteSpell"
        />
      </section>
    </template>

    <footer class="create-page__footer">
      <UiButton
        v-if="currentStep !== 1"
        class="create-page__button"
        secondary
        label="Назад"
        @click="prevStep"
      />
      <UiButton
        v-if="currentStep !== 4"
        class="create-page__button"
        primary
        label="Далее"
        @click="nextStep"
      />
      <UiButton
        v-else
        primary
        class="create-page__save-button create-page__button"
        label="Сохранить персонажа"
        :loading="loading"
        @click="createNewCharacter"
      />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.create-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  span {
    color: var(--color-text);
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    color: var(--color-text);
  }

  &__subtitle {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__option {
    font-size: 18px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &.photo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
  }

  &__available {
    display: flex;
    align-items: center;
    justify-content: space-between;

    b {
      font-weight: 600;
      color: var(--color-accent);
    }
  }

  &__row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;

    & > div {
      flex: 1 0;
    }
  }

  &__abilities {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  &__footer {
    display: flex;
    gap: 12px;
    width: 100%;
    background: transparent;
    z-index: 2;
  }

  &__button {
    flex: 1 0;
  }

  &__bonus {
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: baseline;
    gap: 4px;
    background: var(--color-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    font-size: 18px;
  }

  &__bonus-value {
    color: var(--color-accent);
    font-weight: 600;
  }
}
</style>

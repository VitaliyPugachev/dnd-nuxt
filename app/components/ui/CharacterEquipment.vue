<script setup lang="ts">

import type { WeaponModel } from '@/types/WeaponModel.ts'
import WeaponCard from '@/components/ui/WeaponCard.vue'
import ModalComponent from '@/components/widgets/ModalComponent.vue'
import { computed, ref } from 'vue'
import { weaponList } from '@/constants/WeaponList.ts'
import TabsComponent from '@/components/ui/TabsComponent.vue'
import type { CharacterModel } from '@/types/CharacterModel.ts'
import ArmorCard from '@/components/ui/ArmorCard.vue'
import { armorList } from '@/constants/ArmorList.ts'
import type { ArmorModel } from '@/types/ArmorModel.ts'
import { getArmorProficient } from '@/utils/getEquipmentProficient.ts'

type Section = 'weapon' | 'armor' | 'things' | null

const {strength = 8, className} = defineProps<{className?: string, strength?: number}>()
const model = defineModel<CharacterModel>({required:true});

const isWeaponModalOpen = ref(false);
const selectedWeaponTab = ref('ближний');
const filteredWeapons = computed(() => {
  return weaponList.filter(item => {
    const added = model.value.equipment?.weapons?.find(w => w.id === item.id);
    return item.type === selectedWeaponTab.value && !added;
  });
});
const weaponTabs = [
  {
    label: 'Рукопашное',
    value: 'ближний'
  },
  {
    label: 'Дальнобойное',
    value: 'дальний'
  },
];

const onAddWeapon = (weapon: WeaponModel) => {
  model.value.equipment?.weapons?.push(weapon);
  isWeaponModalOpen.value = false;
}

const onDeleteWeapon = (weapon: WeaponModel) => {
  const index = model.value.equipment?.weapons?.findIndex(el => el.id === weapon.id);
  if (index === undefined || index < 0) return;
  model.value.equipment?.weapons?.splice(index, 1);
}

const isArmorModalOpen = ref(false);
const filteredArmor = computed(() => {
  return armorList.filter(item => {
    return !model.value.equipment?.armor?.find(el => el.id === item.id);
  })
})

const onAddArmor = (armor: ArmorModel) => {
  model.value.equipment?.armor?.push(armor);
  isArmorModalOpen.value = false;
}

const onDeleteArmor = (armor: ArmorModel) => {
  const index = model.value.equipment?.armor?.findIndex(el => el.id === armor.id);
  if (index === undefined || index < 0) return;
  model.value.equipment?.armor?.splice(index, 1);
}

const isMethodModalOpen = ref(false)
const selectedSection = ref<Section>(null)

const openModal = (section: Section) => {
  selectedSection.value = section
  isMethodModalOpen.value = true
}

const onSearchClick = () => {
  switch(selectedSection.value) {
    case('weapon'):
      isWeaponModalOpen.value = true
      break;
    case('armor'):
      isArmorModalOpen.value = true
      break;
    case('things'):
      break;
  }

  isMethodModalOpen.value = false
}

</script>

<template>
  <div class="equipment">
    <div class="equipment__section">
      <section class="equipment__header">
        <div class="equipment__icon">
          <IconsWeapon/>
        </div>
        <div class="equipment__description">
          <h4 class="equipment__subtitle">Оружие</h4>
          Выбрано: {{ model.equipment?.weapons?.length ?? 0 }}
        </div>
      </section>

      <section class="equipment__list">
        <template v-for="weapon in model.equipment?.weapons" :key="weapon.name">
          <WeaponCard :weapon deletable @on-delete="onDeleteWeapon"/>
        </template>
        <UiButton clear-background label="Добавить" @click="openModal('weapon')">
          <template #before>
            <IconsAdd/>
          </template>
        </UiButton>
      </section>
    </div>

    <div class="equipment__section">
      <section class="equipment__header">
        <div class="equipment__icon">
          <IconsArmor/>
        </div>
        <div class="equipment__description">
          <h4 class="equipment__subtitle">Доспехи</h4>
          Выбрано: {{ model.equipment?.armor?.length ?? 0 }}
        </div>
      </section>

      <section class="equipment__list">
        <template v-for="(armor, index) in model.equipment?.armor" :key="armor.name">
          <ArmorCard
            :is-heavy="strength < Number(armor.strengthRequirement)"
            :proficient="getArmorProficient(armor, className)"
            :armor
            :equipped="armor.type === 'щит' || index === 0 || (!!model.equipment?.armor?.length && model?.equipment?.armor[0]?.type === 'щит' && index === 1)"
            deletable
            @on-delete="onDeleteArmor"
          />
        </template>
        <UiButton clear-background label="Добавить" @click="openModal('armor')">
          <template #before>
            <IconsAdd/>
          </template>
        </UiButton>
      </section>
    </div>

    <div class="equipment__section">
      <section class="equipment__header">
        <div class="equipment__icon">
          <IconsBackpack/>
        </div>
        <div class="equipment__description">
          <h4 class="equipment__subtitle">Предметы</h4>
          Выбрано: {{ model.equipment?.weapons?.length ?? 0 }}
        </div>
      </section>

      <section class="equipment__list">
        <template v-for="weapon in model.equipment?.weapons" :key="weapon.name">
          <WeaponCard :weapon deletable @on-delete="onDeleteWeapon"/>
        </template>
        <UiButton clear-background label="Добавить" @click="openModal('things')">
          <template #before>
            <IconsAdd/>
          </template>
        </UiButton>
      </section>
    </div>
  </div>

  <ModalComponent :visible="isMethodModalOpen" @close="isMethodModalOpen = false">
    <div class="methods-modal">
      <div class="methods-modal__header">
        <span class="methods-modal__title">Выберите способ добавления</span>
        <UiButton medium borderless class="methods-modal__close" @click="isMethodModalOpen = false">
          <IconsClose />
        </UiButton>
      </div>
      <div class="methods-modal__select" @click="onSearchClick">
        <IconsSearch class="methods-modal__icon"/>
        Выбрать
      </div>
      <div class="methods-modal__select">
        <IconsPlusOutline class="methods-modal__icon"/>
        Создать свое
      </div>
    </div>
  </ModalComponent>

  <ModalComponent :visible="isWeaponModalOpen" @close="isWeaponModalOpen = false">
    <div class="create-weapon">
      <UiButton medium borderless class="create-weapon__close" @click="isWeaponModalOpen = false">
        <IconsClose/>
      </UiButton>
      <TabsComponent :tabs="weaponTabs" v-model="selectedWeaponTab"/>
      <div class="create-weapon__list">
        <template v-for="weapon in filteredWeapons">
          <WeaponCard
            :weapon
            @click="onAddWeapon(weapon)"
          />
        </template>
      </div>
    </div>
  </ModalComponent>

  <ModalComponent :visible="isArmorModalOpen" @close="isArmorModalOpen = false">
    <div class="create-weapon">
      <UiButton medium borderless class="create-weapon__close" @click="isArmorModalOpen = false">
        <IconsClose/>
      </UiButton>
      <div class="create-weapon__list">
        <template v-for="armor in filteredArmor">
          <ArmorCard
            :is-heavy="strength < Number(armor.strengthRequirement)"
            :proficient="getArmorProficient(armor, className)"
            :armor
            @click="onAddArmor(armor)"
          />
        </template>
      </div>
    </div>
  </ModalComponent>
</template>

<style lang="scss" scoped>
.equipment {
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--color-text);

  &__subtitle {
    font-size: 18px;
    font-weight: 600;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: 1px solid var(--color-border);
    padding: 10px;
    border-radius: var(--radius-md);
    background: var(--color-bg);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__icon {
    width: 60px;
    height: 60px;
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

}

.create-weapon {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 90vh;
  color: var(--color-text);
  padding: 30px 12px 12px 12px;
  background: var(--color-bg);
  border-radius: var(--radius-md);

  &__close {
    position: absolute;
    right: 12px;
    top: 8px;
    width: 50px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: auto;
  }
}

.methods-modal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: var(--color-bg);
  padding: 12px;
  border-radius: var(--radius-md);
  position: relative;
  color: var(--color-text);

  &__close {
    position: absolute;
    right: 0;
    top: -6px;
    width: 40px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    grid-column: 1 / span 2;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
  }

  &__icon {
    color: var(--color-border);
  }

  &__select {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    flex: 1;
    padding: 24px;
    border: 1px solid var(--color-text);
    border-radius: var(--radius-md);
    background: var(--color-bg-secondary);
  }

}
</style>

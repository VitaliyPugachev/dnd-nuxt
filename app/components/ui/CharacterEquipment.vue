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

</script>

<template>
  <div class="equipment">
    <div class="equipment__section">
      <section class="equipment__header">
        <h4 class="equipment__subtitle">Оружие</h4>
        <UiButton clear-background medium label="Добавить" @click="isWeaponModalOpen = true">
          <template #before>
            <IconsAdd/>
          </template>
        </UiButton>
      </section>

      <section class="equipment__list">
        <template v-for="weapon in model.equipment?.weapons" :key="weapon.name">
          <WeaponCard :weapon deletable @on-delete="onDeleteWeapon"/>
        </template>
      </section>
    </div>

    <div class="equipment__section">
      <section class="equipment__header">
        <h4 class="equipment__subtitle">Броня</h4>
        <UiButton clear-background medium label="Добавить" @click="isArmorModalOpen = true">
          <template #before>
            <IconsAdd/>
          </template>
        </UiButton>
      </section>

      <section class="equipment__list">
        <template v-for="(armor, index) in model.equipment?.armor" :key="armor.name">
          <ArmorCard
            :is-heavy="strength < Number(armor.strengthRequirement)"
            :proficient="getArmorProficient(armor, className)"
            :armor
            :equipped="armor.type === 'щит' || index === 0 || (!!model.equipment?.armor?.length && model.equipment.armor[0].type === 'щит' && index === 1)"
            deletable
            @on-delete="onDeleteArmor"
          />
        </template>
      </section>
    </div>

  </div>

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
  gap: 12px;
  color: var(--color-text);

  &__subtitle {
    font-size: 16px;
    font-weight: 600;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.create-weapon {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 90vh;
  color: var(--color-text);
  padding-top: 12px;

  &__close {
    position: absolute;
    right: 4px;
    top: 4px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: auto;
  }
}
</style>

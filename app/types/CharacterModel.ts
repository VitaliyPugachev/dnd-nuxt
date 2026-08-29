import type { ArmorModel } from '@/types/ArmorModel.ts'
import type { WeaponModel } from '@/types/WeaponModel.ts'

export interface CharacterAbilities {
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number
}

export interface CharacterSkillsModel {
  acrobatics : boolean,
  animalHandling : boolean,
  arcana : boolean,
  athletics : boolean,
  deception : boolean,
  history : boolean,
  insight : boolean,
  intimidation : boolean,
  investigation : boolean,
  medicine : boolean,
  nature : boolean,
  perception : boolean,
  performance : boolean,
  persuasion : boolean,
  religion : boolean,
  sleightOfHand : boolean,
  stealth : boolean,
  survival : boolean
}

export interface SubclassModel {
  name: string,
  description: string,
}

export interface EquipmentModel {
  armor?: ArmorModel[],
  weapons?: WeaponModel[],
  other?: any[],
}

export interface SavingThrowsModel {
  strength: boolean,
  dexterity: boolean,
  constitution: boolean,
  intelligence: boolean,
  wisdom: boolean,
  charisma: boolean
}

export interface CombatModel {
  currentHp: number,
  temporaryHp?: number,
}

export interface SpellModel {
  name: string,
  castingTime?: string,
  range?: string,
  duration?: string,
  damage?: string,
  description: string
}

export interface CharacterModel {
  id?: string,
  name: string,
  imageId?: string,
  class: string,
  level: number,
  race: string,
  background: string,
  alignment: string,
  experience: number,
  abilities?: CharacterAbilities,
  savingThrows: SavingThrowsModel,
  skills?: CharacterSkillsModel,
  combat: CombatModel,
  equipment?: EquipmentModel,
  inspiration?: boolean,
  spells?: SpellModel[],
}

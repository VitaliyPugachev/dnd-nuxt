import { computed, reactive, ref } from 'vue'
import type { CharacterAbilities, CharacterModel } from '@/types/CharacterModel.ts'
import { calcModifiers } from '@/utils/calcModifiers.ts'

export default () => {
  const newCharacterItem = ref<CharacterModel>({
    name: '',
    class: '',
    race: '',
    level: 1,
    experience: 0,
    inspiration: false,
    background: '',
    alignment: '',
    abilities: {
      strength: 8,
      dexterity: 8,
      constitution: 8,
      intelligence: 8,
      wisdom: 8,
      charisma: 8,
    },
    skills: {
      acrobatics : false,
      animalHandling : false,
      arcana : false,
      athletics : false,
      deception : false,
      history : false,
      insight : false,
      intimidation : false,
      investigation : false,
      medicine : false,
      nature : false,
      perception : false,
      performance : false,
      persuasion : false,
      religion : false,
      sleightOfHand : false,
      stealth : false,
      survival : false
    },
    equipment: {
      armor: [],
      weapons: []
    },
    savingThrows: {
      charisma: false,
      constitution: false,
      dexterity: false,
      intelligence: false,
      strength: false,
      wisdom: false
    },
    combat: {
      currentHp: 0
    },
    spells: []
  });


  const statsModifiers = computed(() => {
    if (!newCharacterItem.value?.abilities) return {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    }

    return {
      strength: calcModifiers(newCharacterItem.value?.abilities?.strength ?? 8, raceBonusStats.strength),
      dexterity: calcModifiers(newCharacterItem.value?.abilities?.dexterity ?? 8, raceBonusStats.dexterity),
      constitution: calcModifiers(newCharacterItem.value?.abilities?.constitution ?? 8, raceBonusStats.constitution),
      intelligence: calcModifiers(newCharacterItem.value?.abilities?.intelligence ?? 8, raceBonusStats.intelligence),
      wisdom: calcModifiers(newCharacterItem.value?.abilities?.wisdom ?? 8, raceBonusStats.wisdom),
      charisma: calcModifiers(newCharacterItem.value?.abilities?.charisma ?? 8, raceBonusStats.charisma),
    }
  })

  const raceBonusStats = reactive<CharacterAbilities>({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });

  const calculatedAbilities = computed(() => {
    if (!newCharacterItem.value?.abilities) return raceBonusStats;

    return {
      strength: raceBonusStats.strength + newCharacterItem.value.abilities.strength,
      dexterity: raceBonusStats.dexterity + newCharacterItem.value.abilities.dexterity,
      constitution: raceBonusStats.constitution + newCharacterItem.value.abilities.constitution,
      intelligence: raceBonusStats.intelligence + newCharacterItem.value.abilities.intelligence,
      wisdom: raceBonusStats.wisdom + newCharacterItem.value.abilities.wisdom,
      charisma: raceBonusStats.charisma + newCharacterItem.value.abilities.charisma,
    }
  })

  return {
    newCharacterItem,
    statsModifiers,
    raceBonusStats,
    calculatedAbilities,
  }
}

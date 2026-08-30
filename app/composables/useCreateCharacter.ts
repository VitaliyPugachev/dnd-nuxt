import { reactive, ref } from 'vue'
import type { CharacterModel } from '@/types/CharacterModel.ts'
import { useNotificationStore } from '@/stores/notification.ts'

export const useCreateCharacter = () => {
  const {showNotification} = useNotificationStore();

  const abilityPoints = ref(27);

  const newCharacter = reactive<CharacterModel>({
    name: '',
    class: '',
    imageId: '',
    race: '',
    level: 1,
    experience: 0,
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

  const validateStepOne = () => {
    const {name, race, background, alignment} = newCharacter;

    if (!name || !race || !background || !alignment) {
      showNotification('Необходимо заполнить все данные персонажа', 4000, 'error')
      return false
    }
    return true
  }

  const validateStepTwo = () => {
    if (abilityPoints.value > 0) {
      showNotification('Распределите все очки характеристик', 4000, 'error')
      return false
    }
    return true
  }

  const validateStepThree = (points: number) => {
    if (points > 0) {
      showNotification('Распределите все очки навыков', 4000, 'error')
      return false
    }
    return true
  }

  return {
    newCharacter,
    abilityPoints,
    validateStepOne,
    validateStepTwo,
    validateStepThree
  }
}

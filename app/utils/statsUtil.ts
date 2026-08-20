import type { CharacterAbilities } from '@/types/CharacterModel.ts'

export const applyRaceBonusStats = (stats: CharacterAbilities, race: string) => {
  if (race === 'Человек') {
    for (let key in stats) {
      if (Object.prototype.hasOwnProperty.call(stats, key)) {
        stats[key as keyof CharacterAbilities] += 1;
      }
    }
  }

  if (race === 'Полуэльф') {
    stats.charisma += 2;
  }

  if (race === 'Полуорк') {
    stats.strength += 2;
    stats.constitution += 1;
  }

  if (race === 'Холмовой дворф') {
    stats.constitution += 2;
    stats.wisdom += 1;
  }

  if (race === 'Горный дворф') {
    stats.constitution += 2;
    stats.strength += 2;
  }

  if (race === 'Эльф') {
    stats.dexterity += 2;
  }

  if (race === 'Лесной эльф') {
    stats.dexterity += 2;
    stats.wisdom += 1;
  }

  if (race === 'Высший эльф') {
    stats.dexterity += 2;
    stats.intelligence += 1;
  }

  if (race === 'Дроу') {
    stats.dexterity += 2;
    stats.charisma += 1;
  }

  if (race === 'Гном') {
    stats.intelligence += 2;
  }

  if (race === 'Лесной гном') {
    stats.intelligence += 2;
    stats.dexterity += 1;
  }

  if (race === 'Скальный гном') {
    stats.intelligence += 2;
    stats.constitution += 1;
  }

  if (race === 'Тифлинг') {
    stats.charisma += 2;
    stats.intelligence += 1;
  }

  if (race === 'Драконорождённый') {
    stats.strength += 2;
    stats.charisma += 1;
  }

  if (race === 'Полурослик') {
    stats.dexterity += 2;
  }

  if (race === 'Легконогий полурослик') {
    stats.dexterity += 2;
    stats.charisma += 1;
  }

  if (race === 'Крепкий полурослик') {
    stats.dexterity += 2;
    stats.charisma += 1;
  }
}

import type { CharacterAbilities } from '@/types/CharacterModel.ts'

export const characterClasses = [
  'Варвар',
  'Бард',
  'Жрец',
  'Друид',
  'Воин',
  'Паладин',
  'Следопыт',
  'Плут',
  'Чародей',
  'Колдун',
  'Волшебник',
  'Монах'
];

export const characterRaces = [
  'Человек',
  'Эльф',
  'Дроу',
  'Высший эльф',
  'Лесной эльф',
  'Дварф',
  'Холмовой дворф',
  'Горный дворф',
  'Полурослик',
  'Легконогий полурослик',
  'Крепкий полурослик',
  'Гном',
  'Лесной гном',
  'Скальный гном',
  'Полуэльф',
  'Полуорк',
  'Тифлинг',
  'Драконорождённый'
];

//Бонус мастерства
export const calcProficiencyBonus = (level?: number) => {
  if (!level) return 2;

  if (level <= 4) return 2;
  if (level <= 8) return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  if (level <= 20) return 6;

  return 2;
}

export const characterAlignments = [
  'Законопослушный добрый',
  'Законопослушный нейтральный',
  'Законопослушный злой',
  'Нейтральный добрый',
  'Истинно нейтральный',
  'Нейтральный злой',
  'Хаотичный добрый',
  'Хаотичный нейтральный',
  'Хаотичный злой'
];

export const hitsByClasses: Record<string, [number, number]> = {
  'Варвар' : [12, 7],
  'Бард' : [8 ,5],
  'Жрец' : [8, 5],
  'Друид' : [8, 5],
  'Воин' : [10, 6],
  'Паладин' : [10, 6],
  'Следопыт' : [10, 6],
  'Плут' : [8, 5],
  'Чародей' : [6, 4],
  'Колдун' : [8, 5],
  'Волшебник' : [6, 4],
  'Монах' : [8, 5]
};

export const skillPointsByClass: Record<string, number> = {
  'Варвар' : 2,
  'Бард' : 3,
  'Жрец' : 2,
  'Друид' : 2,
  'Воин' : 2,
  'Паладин' : 2,
  'Следопыт' : 3,
  'Плут' : 4,
  'Чародей' : 2,
  'Колдун' : 2,
  'Волшебник' : 2,
  'Монах' : 2
};

export const speedByRace = {
  'Человек': 30,
  'Эльф': 30,
  'Дроу': 30,
  'Высший эльф': 30,
  'Лесной эльф': 30,
  'Дварф': 25,
  'Холмовой дворф': 25,
  'Горный дворф': 25,
  'Полурослик': 25,
  'Легконогий полурослик': 25,
  'Крепкий полурослик': 25,
  'Гном': 25,
  'Лесной гном': 30,
  'Скальный гном': 30,
  'Полуэльф': 30,
  'Полуорк': 30,
  'Тифлинг': 30,
  'Драконорождённый': 30
}

export const getHitsByClass = (className: string, level: number) => {
  if (!hitsByClasses.hasOwnProperty(className) || !className) return 5 * level;

  return hitsByClasses[className as keyof typeof hitsByClasses][0] + hitsByClasses[className as keyof typeof hitsByClasses][1] * (level - 1);
}

export const getSpeedByRace = (race: string) => {
  if (!hitsByClasses.hasOwnProperty(race) || !race) return 30;

  return speedByRace[race as keyof typeof speedByRace];
}

export const getSkillPointByClass = (className: string) => {
  if (!skillPointsByClass.hasOwnProperty(className) || !className) return 0;

  return skillPointsByClass[className];
}

export const expPerLevel: Record<number, number> = {
  1: 0,
  2: 300,
  3: 900,
  4: 2700,
  5: 6500,
  6: 14000,
  7: 23000,
  8: 34000,
  9: 48000 ,
  10: 64000 ,
  11: 85000 ,
  12: 100000 ,
  13: 120000,
  14: 140000,
  15: 165000,
  16: 195000,
  17: 225000,
  18: 265000,
  19: 305000,
  20: 355000
}

function calculateLevelUps(currentExp: number, currentLevel: number): number {
  if (currentLevel < 1 || currentLevel >= 20) {
    return 0; // Нельзя повысить уровень, если уже 20+ или некорректный уровень
  }

  let levelsGained = 0;
  let nextLevel = currentLevel + 1;

  // Проверяем, достаточно ли опыта для каждого следующего уровня
  while (nextLevel <= 20 && currentExp >= expPerLevel[nextLevel]) {
    levelsGained++;
    nextLevel++;
  }

  return levelsGained;
}

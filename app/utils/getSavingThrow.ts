import type { CharacterModel } from '@/types/CharacterModel.ts'

const classSavingThrowsMap: Record<string, string[]> = {
  "Бард": ["dexterity", "charisma"],
  "Варвар": ["strength", "constitution"],
  "Воин": ["strength", "constitution"],
  "Волшебник": ["wisdom", "charisma"],
  "Друид": ["intelligence", "wisdom"],
  "Жрец": ["wisdom", "charisma"],
  "Монах": ["strength", "dexterity"],
  "Паладин": ["wisdom", "charisma"],
  "Плут": ["dexterity", "intelligence"],
  "Следопыт": ["strength", "dexterity"],
  "Чародей": ["constitution", "charisma"],
  "Колдун": ["intelligence", "wisdom"]
};

export function applySavingThrowProficiencies(character: CharacterModel): void {
  if (!character.class) return;
  const proficiencies = classSavingThrowsMap[character.class];

  if (!proficiencies) return;

  // Сначала сбрасываем все на false
  for (const ability in character.savingThrows) {
    character.savingThrows[ability as keyof typeof character.savingThrows] = false;
  }

  // Устанавливаем true для профилированных характеристик
  if (proficiencies) {
    for (const ability of proficiencies) {
      character.savingThrows[ability as keyof typeof character.savingThrows] = true;
    }
  }
}

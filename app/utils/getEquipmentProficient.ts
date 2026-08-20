import type { ArmorModel } from '@/types/ArmorModel.ts'

export const getArmorProficient = (armor?: ArmorModel, className?: string) => {
  if (!armor || !className) return false;

  if (armor.type === 'лёгкий'
    && ['Бард', 'Воин', 'Плут', 'Следопыт', 'Монах', 'Варвар', 'Жрец', 'Друид', 'Паладин'].includes(className)
  ) return true;

  if ((armor.type === 'средний' || armor.type === 'щит')
    && ['Воин', 'Следопыт', 'Монах', 'Варвар', 'Жрец', 'Друид', 'Паладин'].includes(className)
  ) return true;

  if (armor.type === 'тяжёлый'
    && ['Воин', 'Варвар', 'Паладин'].includes(className)
  ) return true;

  return false;
}

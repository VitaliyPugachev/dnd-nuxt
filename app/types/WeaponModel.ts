export interface WeaponModel {
  id: string;
  name: string;                     // Название оружия
  type: 'ближний' | 'дальний';        // Тип: ближний или дальнобойный
  damage: string;                  // Урон, например "1d8"
  damageType: 'колющий' | 'рубящий' | 'дробящий'; // Тип урона
  properties: WeaponProperty[];    // Свойства (например, легкое, двуручное)
  range?: [number, number];        // Дальность, если дальнобойное (например, [30, 120])
  weight: number;                  // Вес в фунтах
  cost: number;                    // Стоимость, например "10 gp"
  proficient?: boolean;            // Владение оружием (по умолчанию false)
}

export type WeaponProperty = string

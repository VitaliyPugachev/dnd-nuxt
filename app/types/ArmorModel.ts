export interface ArmorModel {
  id: string,
  name: string,
  type: "лёгкий" | "тяжёлый" | "средний" | "щит",
  ac: number,
  stealthDisadvantage: boolean,
  strengthRequirement?: number,
  weight: number,
  cost: number
}

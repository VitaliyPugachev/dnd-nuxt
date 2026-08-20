export const calcModifiers = (baseStat: number, bonusStat?: number) => {
  if (!bonusStat) return  Math.floor((baseStat - 10) / 2);
  return Math.floor((baseStat - 10 + bonusStat) / 2);
}

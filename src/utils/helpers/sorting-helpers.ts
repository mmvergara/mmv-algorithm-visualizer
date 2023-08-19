export const shuffleArray = (array: number[]) => {
  return array.sort(() => Math.random() - 0.5);
};
export const createArray = (length: number) => {
  return Array.from({ length }, (_, i) => i + 1);
};

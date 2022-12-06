export const shuffleArray = (arr: number[]) => {
  return arr.slice().sort(() => Math.random() - 0.5);
};

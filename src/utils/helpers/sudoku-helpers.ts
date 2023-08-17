export const emptySudokuGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const isValidSudoku = (
  grid: number[][],
  r: number,
  c: number,
  k: number
): boolean => {
  const notInRow = !grid[r].includes(k);
  const notInColumn = !Array.from({ length: 9 }, (_, i) => grid[i][c]).includes(
    k
  );

  const boxStartRow = Math.floor(r / 3) * 3;
  const boxStartCol = Math.floor(c / 3) * 3;

  const notInBox = !Array.from({ length: 3 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => grid[boxStartRow + i][boxStartCol + j])
  )
    .flat()
    .includes(k);

  return notInRow && notInColumn && notInBox;
};
export const getRandomGrid = (SudokuSampleGrids: number[][][]) => {
  const randomIndex =
    Math.floor(Math.random() * SudokuSampleGrids.length) %
    SudokuSampleGrids.length;
  return SudokuSampleGrids[randomIndex];
};

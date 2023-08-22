import { useEffect, useState } from "react";
import NQueensGrid from "./N-Queens-Grid";
import useRange from "@/hooks/useRange";
import { wait } from "@/utils/wait";
import useSortingSpeed from "@/hooks/useSortingSpeed";
const NQueensPage = () => {
  const [grid, setGrid] = useState<string[][]>([[]]);
  const [gridMax, setGridMax] = useState(15);
  const [gridSize, gridSizeRangeUI] = useRange(1, gridMax, 8, "⬜ Size ");
  const [isSolving, setIsSolving] = useState(false);
  const [speed, speedRangeUi] = useSortingSpeed();

  useEffect(() => {
    if (window.screen.width < 768) {
      setGridMax(10);
    }
  }, []);

  useEffect(() => {
    const newGrid = Array(gridSize)
      .fill(0)
      .map(() => Array(gridSize).fill("."));
    setGrid(newGrid);
  }, [gridSize]);

  const solveNQueens = async (board: string[][]) => {
    const cols: Set<number> = new Set();
    const posDiags: Set<number> = new Set(); // r + c
    const negDiags: Set<number> = new Set(); // r - c
    const rec = async (
      board: string[][],
      r: number,
      c: number
    ): Promise<boolean> => {
      setGrid([...board]);
      await wait(speed);
      const n = board.length;
      if (c >= n) return rec(board, r + 1, 0);
      if (r >= n) {
        const res = [...board];
        setGrid(res);
        await wait(speed);
        return true;
      }

      for (let c = 0; c < board.length; c++) {
        if (cols.has(c) || posDiags.has(r + c) || negDiags.has(r - c)) {
          continue;
        }
        posDiags.add(r + c);
        negDiags.add(r - c);
        cols.add(c);
        board[r][c] = "Q";
        await wait(1);
        if (await rec(board, r + 1, 0)) {
          return true;
        }
        board[r][c] = ".";
        posDiags.delete(r + c);
        negDiags.delete(r - c);
        cols.delete(c);
        await wait(1);
      }
      return false;
    };
    rec(board, 0, 0);
  };

  const resetHandler = () => {
    const grid = Array(gridSize)
      .fill(0)
      .map(() => Array(gridSize).fill("."));
    setGrid(grid);
  };

  const handleSolver = async () => {
    if (isSolving) return;
    // set grid to empty
    resetHandler();
    setIsSolving(true);
    await solveNQueens(grid);
    setIsSolving(false);
  };
  return (
    <section>
      <div className="flex flex-wrap  justify-center items-center gap-4 py-4">
        <div className="p-1 rounded-md">{gridSizeRangeUI}</div>
        <div className="p-1 rounded-md">{speedRangeUi}</div>
        <button className="btn-1" onClick={handleSolver}>
          Solve
        </button>
      </div>

      <NQueensGrid grid={grid} />
    </section>
  );
};

export default NQueensPage;

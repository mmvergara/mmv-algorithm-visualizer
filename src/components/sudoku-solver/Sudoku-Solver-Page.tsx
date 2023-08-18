import {
  emptySudokuGrid,
  getRandomGrid,
  isValidSudoku,
} from "@/utils/helpers/sudoku-helpers";
import { useRouter } from "next/router";
import { SudokuSampleGrids } from "./SudokuSampleGrids";
import { useEffect, useState } from "react";
import { wait } from "@/utils/wait";
import SudokuGrid from "./SudokuGrid";

const speedObj = {
  0: "instant",
  1: "fast",
  400: "medium",
  800: "slow",
};

const SudokuSolverPage = () => {
  const router = useRouter();
  const defaultSpeed = router.query.speed as 0 | 1 | 400 | 800 | undefined;

  const [grid, setGrid] = useState<number[][]>(emptySudokuGrid);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [activeCell, setActiveCell] = useState<number[] | null>(null); // [row, col]
  const [status, setStatus] = useState<string>("");
  const [speed, setSpeed] = useState<0 | 1 | 400 | 800>(defaultSpeed || 400);
  const [stopSolve, setStopSolve] = useState<boolean>(false);
  const solve = async (
    grid: number[][],
    r: number,
    c: number
  ): Promise<boolean> => {
    if (stopSolve) {
      setStopSolve(false);
      setIsSolving(false);
      return false;
    }
    if (speed > 0) await wait(speed);
    setGrid(grid);
    setActiveCell([r, c]);
    // if we are at the very end return true
    if (r === 9) {
      setGrid(grid);
      return true;
    }
    // if we're at the end of the col move on to the next row
    else if (c === 9) {
      return solve(grid, r + 1, 0);
    }
    // if it's pre-filled move on
    else if (grid[r][c] !== 0) {
      setStatus(`Skipping ${grid[r][c]}`);
      return solve(grid, r, c + 1);
    } else {
      // if it is not pre-filled
      for (let k = 1; k <= 9; k++) {
        setStatus(`Trying ${k}`);
        if (isValidSudoku(grid, r, c, k)) {
          grid[r][c] = k;
          // then continue solving
          if (await solve(grid, r, c + 1)) {
            return true;
          }
          setStatus(`not possible to put ${k} here`);
          // if it's not possible change the num back to 0 and then retry
          setActiveCell([r, c]);
          grid[r][c] = 0;
        }
      }
      setGrid(grid);
      return false;
    }
  };

  const handleSolveClick = async () => {
    if (isSolving) return;
    setIsSolving(true);
    if (!(await solve(grid, 0, 0))) {
      setStatus("No Solution Found");
    } else {
      setStatus("Solved");
    }
    setActiveCell(null);
    setIsSolving(false);
  };

  const handleGetNewGrid = () => {
    if (isSolving) return;
    const randomGrid = getRandomGrid(SudokuSampleGrids);
    setGrid(randomGrid);
    setStatus("......");
  };

  const handleChangeSpeed = () => {
    if (speed === 0) setSpeed(1);
    else if (speed === 1) setSpeed(400);
    else if (speed === 400) setSpeed(800);
    else if (speed === 800) setSpeed(0);
  };

  useEffect(() => {
    handleGetNewGrid();
  }, []);
  return (
    <main>
      <section className="flex items-center justify-center flex-col">
        <h1>Sudoku Solver</h1>
        <div className="flex flex-wrap justify-center items-center">
          <button
            className="btn-1 mr-1 my-2"
            disabled={isSolving}
            onClick={handleSolveClick}
          >
            Start Solve
          </button>
          <button
            className="btn-1 ml-1 my-2"
            disabled={isSolving}
            onClick={handleGetNewGrid}
          >
            New Grid
          </button>{" "}
          <button
            className="btn-1 ml-1 my-2"
            disabled={isSolving}
            onClick={handleChangeSpeed}
          >
            Click to Change Speed: {speedObj[speed]}
          </button>
          <button className="btn-1 ml-1 my-2" onClick={() => router.reload()}>
            Stop Solving
          </button>
        </div>
        <p>{status}</p>
      </section>

      <SudokuGrid sudokuGrid={[...grid]} activeCell={activeCell} />
    </main>
  );
};

export default SudokuSolverPage;

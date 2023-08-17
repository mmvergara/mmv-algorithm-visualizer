import SudokuSolverPage from "@/components/sudoku-solver/Sudoku-Solver-Page";
export const getStaticProps = async () => {
  return {
    props: {},
  };
};

const MainPageSudokuSolver = () => {
  return <SudokuSolverPage />;
};
export default MainPageSudokuSolver;

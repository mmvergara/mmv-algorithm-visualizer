import styles from "./SudokuGridStyles.module.scss";
interface props {
  sudokuGrid: number[][];
  activeCell: number[] | null;
}
const SudokuGrid = ({ sudokuGrid, activeCell }: props) => {
  return (
    <table className={styles.tableh}>
      <tbody>
        {sudokuGrid.map((row, r) => {
          return (
            <tr key={r}>
              {row.map((val, c) => {
                const inRow = activeCell && activeCell[0] === r;
                const inCol = activeCell && activeCell[1] === c;
                const isExact =
                  activeCell && activeCell[0] === r && activeCell[1] === c;
                let color = "";
                if (inRow) {
                  color = styles.rowH;
                }
                if (inCol) {
                  color = styles.colH;
                }
                if (isExact) {
                  color = styles.exactH;
                }

                return (
                  <td key={c} className={color}>
                    {val == 0 ? "" : val}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SudokuGrid;

interface props {
  grid: string[][];
}
const NQueensGrid = (props: props) => {
  const { grid } = props;

  return (
    <div className="flex flex-col items-center ">
      {grid.map((row, i) => (
        <div key={i} className="flex grow w-max">
          {row.map((boxVal, j) => {
            const queenBox = boxVal === "Q";
            return (
              <div
                key={j}
                className={`grow text-center border px-[6px]`}
                style={{
                  backgroundColor: queenBox ? "red" : "",
                  color: queenBox ? "white" : "rgba(225, 57, 19, 0)",
                }}
              >
                ♕
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NQueensGrid;

import React, { useEffect, useReducer, useRef, useState } from "react";

const SudokuGrid = ({
  sudokuGrid,
  activeCell,
}: {
  sudokuGrid: number[][];
  activeCell: number[] | null;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // change the canvas size to fit the screen
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const canvasConfig = {
    textColor: "white",
    backgroundColor: "#116A7B",
    highlightedColor: "hsl(194,70%,17%)",
    linesColor: "hsl(194,70%,17%)",
  };

  useEffect(() => {
    // set the canvas size to fit the screen
    const setCanvasSize = () => {
      let newWidth = window.screen.width * 0.94;
      let newHeight = window.screen.height * 0.94;
      if (newWidth > 600) {
        newWidth = 600;
        newHeight = 600;
      }

      setWidth(newWidth);
      setHeight(newHeight);
    };
    setCanvasSize();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    // Clear the canvas

    const cellSize = width / 9;
    const gridSize = width;
    context.fillStyle = canvasConfig.backgroundColor;
    context.fillRect(0, 0, gridSize, gridSize);

    // Draw the numbers
    context.font = `${cellSize * 0.4}px Arial`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const number = sudokuGrid[row][col];
        if (number !== 0) {
          const xPos = col * cellSize + cellSize / 2;
          const yPos = row * cellSize + cellSize / 2;

          // add color to the active cell
          if (activeCell && activeCell[0] === row && activeCell[1] === col) {
            context.fillStyle = canvasConfig.highlightedColor;
            context.fillRect(
              col * cellSize,
              row * cellSize,
              cellSize,
              cellSize
            );
          }

          context.fillStyle = canvasConfig.textColor;
          context.fillText(number.toString(), xPos + 0.5, yPos + 0.5);
        }
      }
    }
    // Draw the grid
    context.lineWidth = 1;
    for (let i = 0; i <= 9; i++) {
      context.strokeStyle = canvasConfig.linesColor;
      const xPos = i * cellSize;
      const yPos = i * cellSize;
      context.beginPath();
      context.moveTo(xPos, 0);
      context.lineTo(xPos, gridSize);
      context.stroke();

      context.beginPath();
      context.moveTo(0, yPos);
      context.lineTo(gridSize, yPos);
      context.stroke();

      // draw the thicker lines
      if (i == 3 || i == 6) {
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(xPos, 0);
        context.lineTo(xPos, gridSize);
        context.stroke();

        context.beginPath();
        context.moveTo(0, yPos);
        context.lineTo(gridSize, yPos);
        context.stroke();
        context.lineWidth = 1;
      }

      // draw the thicker lines
      const lastContextColor = context.strokeStyle;
      if (i == 9 || i == 0) {
        // context.strokeStyle = "#155f75";
        context.lineWidth = 6;
        context.beginPath();
        context.moveTo(xPos, 0);
        context.lineTo(xPos, gridSize);
        context.stroke();

        context.beginPath();
        context.moveTo(0, yPos);
        context.lineTo(gridSize, yPos);
        context.stroke();
        context.lineWidth = 1;
        context.strokeStyle = lastContextColor;
      }
    }
  }, [sudokuGrid, activeCell]);

  return (
    <canvas className="mx-auto" ref={canvasRef} width={width} height={height} />
  );
};

export default SudokuGrid;

import { getRandomValues } from "crypto";
import { useState, useEffect } from "react";
interface props {
  array: number[];
}
const Bars = ({ array }: props) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    const setCanvasSize = () => {
      let newWidth = window.screen.width * 0.94;
      let newHeight = window.screen.height * 0.44;

      setWidth(newWidth);
      setHeight(newHeight);
    };
    setCanvasSize();
  }, []);

  return (
    <svg width={width} height={height} className="mx-auto">
      <g className="text-center">
        {array.map((value, index, arr) => {
          const elementHeight = (value / Math.max(...arr)) * height;
          const elementWidth = width / arr.length;
          const centerX = index * elementWidth;
          const centerY = height - elementHeight;
          return (
            <rect
              className="transition-height duration-300 ease-in"
              key={index}
              x={centerX}
              y={centerY}
              width={elementWidth}
              height={elementHeight}
              fill="hsl(194,70%,77%)"
              stroke="hsl(194,70%,77%)"
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Bars;

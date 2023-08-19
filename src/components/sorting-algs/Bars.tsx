import { getRandomValues } from "crypto";
import { useState, useEffect } from "react";
interface props {
  array: number[];
  colors: { [key: number]: string };
}
const Bars = ({ array, colors }: props) => {
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
          let c = colors[value];
          if (!c) c = "hsl(194,70%,77%)";
          return (
            <rect
              className="BarsTrans"
              key={index}
              x={centerX}
              y={centerY}
              width={elementWidth}
              height={elementHeight}
              fill={c}
              stroke={c}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Bars;

import { useState } from "react";

const useRange = (
  min: number,
  max: number,
  defaultValue: number,
  text: string
): [number, JSX.Element] => {
  const [value, setValue] = useState<number>(max);

  const rangeUI = (
    <>
      <p className="text-2xl">
        {text}
        {value}
      </p>
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          setValue(val);
        }}
      />
    </>
  );

  return [value, rangeUI];
};

export default useRange;

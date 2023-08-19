import { useState } from "react";

const useSortingSpeed = () => {
  const [speed, setSpeed] = useState<number>(251);
  const [uiSpeed, setUISpeed] = useState<number>(750);
  const speedUI = (
    <>
      <p className="text-2xl">⏩{uiSpeed}</p>
      <input
        type="range"
        min="1"
        max="1000"
        defaultValue="750"
        onChange={(e) => {
          const val = parseInt(e.target.value);
          // reverse the value so that the slider is intuitive
          setUISpeed(val);
          setSpeed(1001 - val);
        }}
      />
    </>
  );

  return [speed, speedUI];
};

export default useSortingSpeed;

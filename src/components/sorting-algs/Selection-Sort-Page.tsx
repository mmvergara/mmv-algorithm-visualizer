import { useState, useEffect } from "react";
import { createArray } from "@/utils/helpers/sorting-helpers";
import { wait } from "@/utils/wait";
import Bars from "./Bars";
import useSortingSpeed from "@/hooks/useSortingSpeed";
import useRange from "@/hooks/useRange";

const SelectionSortPage = () => {
  const [speed, speedUI] = useSortingSpeed();
  const [array, setArray] = useState<number[]>(createArray(10));
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const [arrayLength, arrayLengthUi] = useRange(10, 500, 15, "📊");

  const selectionSort = async (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i; j < arr.length; j++) {
        setColors({ [array[minIndex]]: "#A1C181", [array[j]]: "#619B8A" });
        await wait(speed);
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      setColors({ [array[minIndex]]: "blue", [array[i]]: "blue" });
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);
      await wait(speed);
    }
    return arr;
  };

  const handleShuffle = () => {
    setArray((a) => {
      const arr = [...a];
      return arr.sort(() => Math.random() - 0.5);
    });
  };
  const handleStartSort = async () => {
    await selectionSort(array);
    setColors({});
  };

  useEffect(() => {
    setArray(createArray(arrayLength));
  }, [arrayLength]);

  return (
    <>
      <div className="flex flex-wrap bg-[hsl(216,28%,10%)] justify-center items-center gap-4 py-2">
        <div className="p-1 rounded-md">{arrayLengthUi}</div>
        <div className="p-1 rounded-md">{speedUI}</div>
        <button className="btn-1" onClick={handleShuffle}>
          Shuffe Array
        </button>
        <button className="btn-1" onClick={handleStartSort}>
          Sort
        </button>
      </div>

      <Bars array={array} colors={colors} />
    </>
  );
};

export default SelectionSortPage;

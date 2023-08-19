import { useState, useEffect } from "react";
import { createArray } from "@/utils/helpers/sorting-helpers";
import { wait } from "@/utils/wait";
import Bars from "./Bars";
import useSortingSpeed from "@/hooks/useSortingSpeed";
import useRange from "@/hooks/useRange";

const InsertionSortPage = () => {
  const [speed, speedUI] = useSortingSpeed();
  const [status, setStatus] = useState<string>("Insertion Sort");
  const [array, setArray] = useState<number[]>(createArray(10));
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [arrayLength, arrayLengthUi] = useRange(10, 500, 10, "📊");

  const insertionSort = async (arrayIn: number[]) => {
    let arr = [...arrayIn];
    for (let i = 0; i < arr.length; i++) {
      let j = i;
      setStatus(`Inserting ${arr[i]}`);
      await wait(100);
      while (j > 0 && arr[j] < arr[j - 1]) {
        setStatus(`Swapping ${arr[j]} and ${arr[j - 1]}`);
        setColors({ [arr[j]]: "#FCCA46", [arr[j - 1]]: "#FE7F2D" });
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        j -= 1;
        setArray(arr);
        await wait(speed);
      }
    }
    return arr;
  };

  const handleShuffle = () => {
    if (isSorting) return;
    setArray((a) => {
      const arr = [...a];
      return arr.sort(() => Math.random() - 0.5);
    });
  };
  const handleStartSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    await insertionSort(array);
    setStatus("Insertion Sort");
    setColors({});
    setIsSorting(false);
  };

  useEffect(() => {
    if (isSorting) return;
    setArray(createArray(arrayLength));
  }, [arrayLength]);

  return (
    <>
      <div className="flex flex-wrap  justify-center items-center gap-4 py-4">
        <div className="p-1 rounded-md">{arrayLengthUi}</div>
        <div className="p-1 rounded-md">{speedUI}</div>
        <button className="btn-1" onClick={handleShuffle}>
          Shuffe Array
        </button>
        <button className="btn-1" onClick={handleStartSort}>
          Sort
        </button>
      </div>
      <h1 className="text-center text-2xl">{status}</h1>
      <Bars array={array} colors={colors} />
    </>
  );
};

export default InsertionSortPage;

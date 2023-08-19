import { useState, useEffect } from "react";
import { createArray } from "@/utils/helpers/sorting-helpers";
import { wait } from "@/utils/wait";
import Bars from "./Bars";
import useSortingSpeed from "@/hooks/useSortingSpeed";
import useRange from "@/hooks/useRange";

const SelectionSortPage = () => {
  const [speed, speedUI] = useSortingSpeed();
  const [array, setArray] = useState<number[]>(createArray(10));
  const [sorted, setSorted] = useState<Set<number>>(new Set<number>());
  const [status, setStatus] = useState<string>("Selection Sort");
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [arrayLength, arrayLengthUi] = useRange(10, 500, 10, "📊");

  const selectionSort = async (arrayIn: number[]) => {
    let arr = [...arrayIn];
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i; j < arr.length; j++) {
        setStatus(`Finding Min: ${arr[minIndex]}`);
        setColors({ [array[minIndex]]: "#A1C181", [array[j]]: "#619B8A" });
        if (arr[j] < arr[minIndex]) {
          setStatus(`New Min found: ${arr[j]}`);
          minIndex = j;
        }
        await wait(speed);
      }
      setStatus(`Swapping ${arr[minIndex]} and ${arr[i]}`);
      setColors({ [array[minIndex]]: "blue", [array[i]]: "blue" });
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray(arr);
      setSorted((s) => {
        const newSet = new Set(s);
        newSet.add(i);
        return newSet;
      });
      await wait(speed);
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
    await selectionSort(array);
    setStatus("Selection Sort");
    setSorted(new Set<number>());
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
      <Bars array={array} colors={colors} sorted={sorted} />
    </>
  );
};

export default SelectionSortPage;

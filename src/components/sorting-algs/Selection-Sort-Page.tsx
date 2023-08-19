import { useState, useEffect } from "react";
import { createArray } from "@/utils/helpers/sorting-helpers";
import Bars from "./Bars";
import { wait } from "@/utils/wait";

const SelectionSortPage = () => {
  const [array, setArray] = useState<number[]>(createArray(100));
  const [colors, setColors] = useState<{ [key: number]: string }>({});

  const selectionSort = async (arr: number[]) => {
    let colors: { [key: number]: string } = {};
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;

      for (let j = i; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          setColors({ [minIndex]: "red" });
        }
      }

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);
      setColors({ [minIndex]: "red", [i]: "red" });
      await wait(100);
    }
    return arr;
  };

  return (
    <>
      <button
        onClick={() =>
          setArray((a) => {
            // shuffle
            const arr = [...a];
            return arr.sort(() => Math.random() - 0.5);
          })
        }
      >
        Shuffe Array
      </button>
      <button onClick={() => selectionSort(array)}>Sort</button>
      <Bars array={array} colors={colors} />
    </>
  );
};

export default SelectionSortPage;

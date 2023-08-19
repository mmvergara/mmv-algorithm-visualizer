import { createArray, shuffleArray } from "@/utils/helpers/sorting-helpers";
import React, { useState } from "react";
import { wait } from "@/utils/wait";
import Bars from "../Bars";

const InsertionSortPage = () => {
  // generate array 1 to 100
  const [array, setArray] = useState(createArray(100));
  const insertionSort = async () => {
    const n = array.length;
    let tempArray = [...array];

    for (let i = 1; i < n; i++) {
      let current = tempArray[i];
      let j = i - 1;

      // Move elements of arr[0..i-1] that are greater than current
      // to one position ahead of their current position
      while (j >= 0 && tempArray[j] > current) {
        tempArray[j + 1] = tempArray[j];
        j--;
      }

      tempArray[j + 1] = current;
      setArray([...tempArray]); // Update the array in state
      await wait(1);
    }
  };
  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-1 my-2">
        <button className="btn-1" onClick={insertionSort}>
          Sort
        </button>
        <button
          className="btn-1"
          onClick={() => setArray((a) => shuffleArray(a))}
        >
          Shuffle Array
        </button>
      </section>
      <Bars array={array} />
    </div>
  );
};

export default InsertionSortPage;

import { useState } from "react";
import { algSpeed } from "../types";
import { shuffleArray } from "../utilities/ShuffleArray";
import AlgSpeed from "./AlgSpeed";

const MergeSort: React.FC = () => {
  const [mainArr, setMainArr] = useState<number[]>(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  const [algSpeed, setAlgSpeed] = useState<algSpeed>({ ms: 250, speed: "Normal" });
  const [showControls, setShowControls] = useState(true);
  const [numsBeingSwapped, setNumsBeingSwapped] = useState<number[]>([]);

  //@ts-ignore
  async function mergeSort(unsortedArray: number[]) {
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }

    const middle = Math.floor(unsortedArray.length / 2);
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    // Using recursion to combine the left and right
    const merged: number[] = await merge(await mergeSort(left), await mergeSort(right));
    if (merged.length === mainArr.length) {
      setMainArr(merged);
    }
    return merged;
  }

  async function merge(left: number[], right: number[]) {
    const resArr = [...left, ...right];

    for (let i = 0; i < resArr.length; i++) {
      //find min number in subarray
      //and place it at ith position
      let minptr = i;
      for (let j = i + 1; j < resArr.length; j++) {
        if (resArr[minptr] > resArr[j]) {
          minptr = j;
        }
      }
      //swap
      setNumsBeingSwapped([resArr[i], resArr[minptr]]);
      setMainArr((prev) => {
        const newArr = prev.slice();
        const resI = newArr.findIndex((x) => x === resArr[i]);
        const minI = newArr.findIndex((x) => x === resArr[minptr]);
        const temp = newArr[resI];
        newArr[resI] = newArr[minI];
        newArr[minI] = temp;
        return newArr;
      });
      await delayMs(algSpeed.ms);
      let temp = resArr[i];
      resArr[i] = resArr[minptr];
      resArr[minptr] = temp;
    }
    //   leftIndex = 0,
    //   rightIndex = 0;

    // while (leftIndex < left.length && rightIndex < right.length) {
    //   if (left[leftIndex] < right[rightIndex]) {
    //     resultArray.push(left[leftIndex]);
    //     leftIndex++;
    //   } else {
    //     resultArray.push(right[rightIndex]);
    //     rightIndex++;
    //   }
    // }
    // const result = resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    return resArr;
  }

  async function delayMs(algSpeed: number) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(1);
      }, algSpeed);
    });
  }
  const updateAlgSpeedHandler = (algSpeed: algSpeed) => setAlgSpeed(algSpeed);
  const shuffleArrHandler = () => setMainArr((arr) => shuffleArray(arr));
  const changeArrSizeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arraySize = Number(e.target.value);
    const arr = Array.from(Array(arraySize).keys());
    arr.shift();
    arr.push(arraySize);
    setMainArr(arr);
  };

  return (
    <section>
      <div
        className={`flex items-center gap-4 flex-wrap justify-center ${
          showControls ? "h-fit" : " h-[60px]"
        } p-1 bg-navSecondary `}
      >
        {showControls ? (
          <>
            <div>
              <input
                type='number'
                placeholder='Array Size'
                className='input w-[120px] text-center'
                onChange={changeArrSizeHandle}
              />
            </div>
            <AlgSpeed UpdateSpeedHandler={updateAlgSpeedHandler} />
            <button className='btn btn-secondary' onClick={shuffleArrHandler}>
              Shuffle
            </button>
            <button
              className='btn btn-accent'
              onClick={() => {
                mergeSort(mainArr.slice());
              }}
            >
              Sort
            </button>
          </>
        ) : (
          <button
            className='btn btn-error btn-outline'
            onClick={() => {
              window.location.reload();
            }}
          >
            Stop
          </button>
        )}
      </div>

      <div className='flex w-[100vw] h-[720px] py-[50px] items-end justify-center transition-all ease-in'>
        {mainArr.map((x, i, arr) => {
          return (
            <div
              key={i}
              className={`arrEl px-auto ${
                arr.length < 140 && "border"
              } text-2xl transition-height ease-in`}
              style={{
                height: `${(x / arr.length) * 100}%`,
                backgroundColor: `${
                  numsBeingSwapped.length === 2 && numsBeingSwapped.includes(x)
                    ? "#411530"
                    : "#4bdcde9e"
                }`,
                transitionDuration: "0.3s",
              }}
            >
              {arr.length < 25 && x}
            </div>
          );
        })}
      </div>
      <p className='text-2xl p-1 text-center text-black font-serif'>Merge Sort</p>
    </section>
  );
};

export default MergeSort;

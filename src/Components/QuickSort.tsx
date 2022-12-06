import { useState } from "react";
import { algSpeed } from "../types";
import { shuffleArray } from "../utilities/ShuffleArray";
import AlgSpeed from "./AlgSpeed";

const QuickSort: React.FC = () => {
  const [mainArr, setMainArr] = useState<number[]>(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  const [algSpeed, setAlgSpeed] = useState<algSpeed>({ ms: 250, speed: "Normal" });
  const [showControls, setShowControls] = useState(true);
  const [numBeingChecked, setNumBeingChecked] = useState<number>(0);
  const [numsBeingSwapped, setNumsBeingSwapped] = useState<number[]>([]);
  const [curentLowestNum, setCurrentLowestNum] = useState<number>(0);

  async function partition(arr: number[], low: number, high: number) {
    let temp;
    let pivot = arr[high];
    setNumsBeingSwapped([pivot]);
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      setNumBeingChecked(arr[j]);
      if (arr[j] <= pivot) {
        i++;
        setNumsBeingSwapped([arr[i], arr[j]]);
        await delayMs(algSpeed.ms);
        await delayMs(algSpeed.ms);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    setNumsBeingSwapped([arr[i + 1], arr[high]]);
    await delayMs(algSpeed.ms);
    await delayMs(algSpeed.ms);
    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
  }

  async function qSort(arr: number[], low: number, high: number) {
    setShowControls(false);

    setMainArr(arr);
    if (low < high) {
      let pi = await partition(arr, low, high);
      setNumsBeingSwapped([]);
      await qSort(arr, low, pi - 1);
      await qSort(arr, pi + 1, high);
    }
    const isSorted = (arr: number[]) => arr.every((v, i, a) => !i || a[i - 1] <= v);
    if (isSorted(arr)) {
      setNumBeingChecked(0);
      setNumsBeingSwapped([]);
      setCurrentLowestNum(0);
      setShowControls(true);
    }
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
                qSort(mainArr.slice(), 0, mainArr.length - 1);
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
      <p className='text-2xl pl-2 pt-2 text-black font-Poppins font-semibold'>Quick Sort</p>
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
                  numBeingChecked === x
                    ? "#411530"
                    : numsBeingSwapped.length === 2 && numsBeingSwapped.includes(x)
                    ? "#146c0a"
                    : curentLowestNum === x
                    ? "#de4b4b"
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
    </section>
  );
};

export default QuickSort;

import { useState } from "react";
import { algSpeed } from "../types";
import { shuffleArray } from "../utilities/ShuffleArray";
import AlgSpeed from "./AlgSpeed";

const SelectionSort: React.FC = () => {
  const [mainArr, setMainArr] = useState<number[]>(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  const [algSpeed, setAlgSpeed] = useState<algSpeed>({ ms: 250, speed: "Normal" });
  const [showControls, setShowControls] = useState(true);

  const [numBeingChecked, setNumBeingChecked] = useState<number>(0);
  const [numsBeingSwapped, setNumsBeingSwapped] = useState<number[]>([]);
  const [curentLowestNum, setCurrentLowestNum] = useState<number>(0);

  const bubbleSort = async function () {
    setShowControls(false);
    let arrP = mainArr.slice();
    let lastSwapIndex = 0;
    for (let i = 0; i < arrP.length; i++) {
      let lowestNumIndex = -1000;
      setCurrentLowestNum(arrP[lastSwapIndex]);
      for (let j = lastSwapIndex; j < arrP.length; j++) {
        await delayMs(algSpeed.ms);
        setNumBeingChecked(arrP[j]);
        setNumsBeingSwapped([]);
        if (arrP[lowestNumIndex] > arrP[j] || lowestNumIndex === -1000) {
          lowestNumIndex = j;
          setCurrentLowestNum(arrP[j]);
        }
      }

      const set = [arrP[lowestNumIndex], arrP[lastSwapIndex]];
      setNumsBeingSwapped(set);

      let temp = arrP[lowestNumIndex];
      arrP[lowestNumIndex] = arrP[lastSwapIndex];
      arrP[lastSwapIndex] = temp;
      lastSwapIndex++;
      setMainArr(arrP);
    }
    setNumBeingChecked(0);
    setNumsBeingSwapped([]);
    setCurrentLowestNum(0);
    setShowControls(true);
  };

  async function delayMs(algSpeed: number) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(1);
      }, algSpeed);
    });
  }
  const updateAlgSpeedHandler = (algSpeed: algSpeed) => {
    console.log(algSpeed);
    setAlgSpeed(algSpeed);
  };
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
            <button className='btn btn-accent' onClick={bubbleSort}>
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
      <p className='text-2xl p-1 text-center text-black font-serif'>Selection Sort</p>
    </section>
  );
};

export default SelectionSort;

import { useState } from "react";
import { algSpeed } from "../types";
import { shuffleArray } from "../utilities/ShuffleArray";
import AlgSpeed from "./AlgSpeed";

const BubbleSort: React.FC = () => {
  const [mainArr, setMainArr] = useState<number[]>(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  const [algSpeed, setAlgSpeed] = useState<algSpeed>({ ms: 250, speed: "Normal" });
  const [showControls, setShowControls] = useState(true);

  const [numBeingChecked, setNumBeingChecked] = useState<number[]>([]);
  const [numsBeingSwapped, setNumsBeingSwapped] = useState<number[]>([]);
  const [indexesDone, setIndexesDone] = useState<number[]>([]);

  const bubbleSort = async function () {
    setShowControls(false);
    const arrP = mainArr.slice();
    for (let i = 0; i < arrP.length; i++) {
      let swapOperations = 0;

      for (let j = 0; j < arrP.length - i; j++) {
        setNumBeingChecked([arrP[j], arrP[j - 1]]);
        await delayMs(algSpeed.ms);
        if (arrP[j] < arrP[j - 1]) {
          setNumBeingChecked([]);
          setNumsBeingSwapped([arrP[j], arrP[j - 1]]);
          let temp = arrP[j];
          arrP[j] = arrP[j - 1];
          arrP[j - 1] = temp;
          await delayMs(algSpeed.ms);
          setNumsBeingSwapped([]);
          setMainArr(arrP);
          swapOperations++;
        }
      }
      setIndexesDone((prev) => [...prev, arrP.length - 1 - i]);
      if (swapOperations === 0) {
        delayMs(algSpeed.ms);
        const arr = Array.from(Array(arrP.length).keys());
        setIndexesDone(arr);
        break;
      }
    }
    setMainArr(arrP);
    setNumBeingChecked([]);
    setNumsBeingSwapped([]);

    await delayMs(2000);
    setIndexesDone([]);
    setShowControls(true);
    // setOperationOngoing(false)
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
                  numBeingChecked.includes(x)
                    ? "#411530"
                    : numsBeingSwapped.length === 2 && numsBeingSwapped.includes(x)
                    ? "#0b5402"
                    : indexesDone.includes(i)
                    ? "#4ee7eada"
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
      <p className='text-2xl p-1 text-center text-black font-serif'>Bubble Sort</p>
    </section>
  );
};

export default BubbleSort;

import { useState } from "react";
import { shuffleArray } from "../utilities/ShuffleArray";
import AlgSpeed, { algSpeed } from "./AlgSpeed";

const InsertionSort: React.FC = () => {
  const [mainArr, setMainArr] = useState<number[]>(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  const [algSpeed, setAlgSpeed] = useState<algSpeed>({ ms: 250, speed: "Normal" });
  const [showControls, setShowControls] = useState(true);

  const [numBeingChecked, setNumsBeingChecked] = useState<number[]>([]);
  const [numsBeingSwapped, setNumsBeingSwapped] = useState<number[]>([]);
  const [indexesDone, setIndexesDone] = useState<number[]>([]);

  const insertionSort = async function () {
    setShowControls(false);
    const arrP = mainArr.slice();
    const indexesDone = [0];
    for (let i = 1; i < arrP.length; i++) {
      let key = arrP[i];
      let j = i - 1;
      setMainArr(arrP);
      setNumsBeingChecked([key]);
      await delayMs(algSpeed.ms);
      while (j >= 0 && arrP[j] > key) {
        setNumsBeingChecked([]);
        setNumsBeingSwapped([arrP[j], arrP[j + 1]]);
        await delayMs(algSpeed.ms);
        const temp = arrP[j + 1];
        arrP[j + 1] = arrP[j];
        arrP[j] = temp;
        setMainArr(arrP);
        j = j - 1;
      }
      arrP[j + 1] = key;
      setMainArr(arrP);
      indexesDone.push(indexesDone.length);
      setIndexesDone(indexesDone);
      setShowControls(true);
    }

    setNumsBeingChecked([]);
    setNumsBeingSwapped([]);
    setIndexesDone([]);
    return arrP;
  };

  async function delayMs(algSpeed: number) {
    return new Promise((res) => {
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
            <button className='btn btn-accent' onClick={insertionSort}>
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
      <p className='text-2xl pl-2 pt-2 text-black font-Poppins font-semibold'>Insertion Sort</p>
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
                    ? "#0b5402"
                    : numBeingChecked.includes(x)
                    ? "#411530"
                    : indexesDone.includes(i)
                    ? "#d5ea4eda"
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

export default InsertionSort;

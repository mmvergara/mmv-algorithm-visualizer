import { useState, useEffect } from "react";
import { createArray } from "@/utils/helpers/sorting-helpers";
import { wait } from "@/utils/wait";
import Bars from "./Bars";
import useSortingSpeed from "@/hooks/useSortingSpeed";
import useRange from "@/hooks/useRange";

const MergeSortpage = () => {
  const [speed, speedUI] = useSortingSpeed();
  const [status, setStatus] = useState<string>("Merge");
  const [array, setArray] = useState<number[]>(createArray(10));
  const [array2, setArray2] = useState<number[]>([]);
  const [arrBeingMerged1, setArrBeingMerged1] = useState<number[]>([]);
  const [arrBeingMerged2, setArrBeingMerged2] = useState<number[]>([]);
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [arrayLength, arrayLengthUi] = useRange(10, 500, 10, "📊");

  const merge = async (arr1: number[], arr2: number[]): Promise<number[]> => {
    setStatus(`Merging`);
    setArrBeingMerged1([...arr1]);
    setArrBeingMerged2([...arr2]);
    await wait(1);

    const temp: number[] = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        temp.push(arr1[i]);
        i += 1;
      } else {
        temp.push(arr2[j]);
        j += 1;
      }
      setArray2([...temp]);
      await wait(speed / 2);
    }

    while (i < arr1.length) {
      temp.push(arr1[i]);
      i += 1;
      setArray2([...temp]);
      await wait(speed / 2);
    }

    while (j < arr2.length) {
      temp.push(arr2[j]);
      j += 1;
      setArray2([...temp]);
      await wait(speed / 2);
    }
    setArray2([]);
    setColors({});
    setArrBeingMerged1([]);
    setArrBeingMerged2([]);
    setArray((a) => {
      // within arr1 and arr2, find the range of values that were merged
      const arr = [...a];
      const start = arr.indexOf(arr1[0]);
      const end = arr.indexOf(arr2[arr2.length - 1]);
      // replace the values in that range with the merged values
      arr.splice(start, end - start + 1, ...temp);
      return arr;
    });
    setStatus(`Merged!`);
    await wait(speed);
    return temp;
  };

  const mergeSort = async (arr: number[]): Promise<number[]> => {
    // split
    if (arr.length <= 1) return arr;
    // Calculate the middle index
    const middleIndex = Math.floor(arr.length / 2);
    // Split the array into two parts
    const arr1 = arr.slice(0, middleIndex);
    const arr2 = arr.slice(middleIndex);
    return merge(await mergeSort(arr1), await mergeSort(arr2));
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
    await mergeSort(array);
    setStatus("Merge");
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
      <section className="flex h-[300px] items-end justify-center transition-all ease-in">
        {array2.map((x, i, arr) => {
          let color = "#a7c7e7";
          // if (sorted && sorted.has(i)) {
          //   color = "hsl(112, 49%, 65%)";
          // }
          const barHeight = 44;
          return (
            <div
              key={i}
              className={`arrEl px-auto ${
                array.length < 140 && "border"
              } text-2xl transition-height ease-in`}
              style={{
                width: `${30 / array.length}%`,
                height: `${(x / array.length) * barHeight}%`,
                backgroundColor: color,
                borderColor: color,
                transitionDuration: "0.3s",
              }}
            ></div>
          );
        })}
      </section>
      <section className="flex h-[400px] py-[10px]  items-end justify-center transition-all ease-in">
        {array.map((x, i, arr) => {
          let color = colors[x] ? colors[x] : "#a7c7e7";
          if (arrBeingMerged1.includes(x)) {
            color = "blue";
          }
          if (arrBeingMerged2.includes(x)) {
            color = "green";
          }
          return (
            <div
              key={i}
              className={`arrEl px-auto ${
                arr.length < 140 && "border"
              } text-2xl transition-height ease-in`}
              style={{
                height: `${(x / arr.length) * 80}%`,
                backgroundColor: color,
                borderColor: color,
                transitionDuration: "0.3s",
              }}
            >
              {arr.length < 25 && x}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default MergeSortpage;

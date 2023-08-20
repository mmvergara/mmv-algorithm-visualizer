const arr = [3, 4, 1, 2, 4, 5, 7, 1, 2, 4];

const merge = (arr1, arr2) => {
  const temp = [];
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
  }

  while (i < arr1.length) {
    temp.push(arr1[i]);
    i += 1;
  }

  while (j < arr2.length) {
    temp.push(arr2[j]);
    j += 1;
  }

  return temp;
};

const mergeSort = (arr) => {
  // split
  if (arr.length <= 1) return arr;
  // Calculate the middle index
  const middleIndex = Math.floor(arr.length / 2);
  // Split the array into two parts
  const arr1 = arr.slice(0, middleIndex);
  const arr2 = arr.slice(middleIndex);
  return merge(mergeSort(arr1), mergeSort(arr2));
};

console.log(mergeSort(arr));

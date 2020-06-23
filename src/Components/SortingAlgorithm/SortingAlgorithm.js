export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }

  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
export function quickSort(array){
  const animations = [];
  // if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length-1, animations)
  return animations
}

  function quickSortHelper(items, left, right, animation) {
      var index;
      if (items.length > 1) {
          console.log(animation)
          // animation.push([left, right, false])

          index = partition(items, left, right, animation); //index returned from partition
          if (left < index - 1) { //more elements on the left side of the pivot
              // animation.push([left, index-1, false])
              quickSortHelper(items, left, index - 1, animation);
          }
          if (index < right) { //more elements on the right side of the pivot
              // animation.push([index, right,false])
              quickSortHelper(items, index, right, animation);
          }
      }
      return items;
  }


  function partition(items, left, right, animation) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    let pivotIdx = Math.floor((right + left) / 2);
    while (i <= j) {
        while (items[i] < pivot) {
            animation.push([i,j,false,pivotIdx, items[i], items[j]])
            i++;
        }
        while (items[j] > pivot) {
            animation.push([i,j,false,pivotIdx, items[i], items[j]])
            j--;
        }
        if (i <= j) {
            animation.push([j,i, true, pivotIdx, items[j], items[i]])
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
  }

  function swap(input, indexA, indexB) {
    const temp = input[indexA]

    input[indexA] = input[indexB]
    input[indexB] = temp
  }

export function selectionSort(arr){
  let animation = [];
  helperselectionSort(arr, animation) 
  return animation
}

export function helperselectionSort(arr, animation) {

    for (var i = 0; i < arr.length; i++) {

        let min = i; //  storing the index of minimum element

        for (var j = i + 1; j < arr.length; j++) {
            animation.push([min,j, false, arr[min], arr[j]])
            if (arr[min] > arr[ j ]) {
                animation.push([min, j, false, arr[min], arr[j]])
                min = j; // updating the index of minimum element
            }
        }

        if (i !== min) {
            animation.push([min, i, true, arr[min],arr[i] ])
            let temp = arr[ i ];
            arr[ i ] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}


export function insertionSort(arr){
  let animation = [];

  HelperInsertionSort(arr, animation);
  return animation

}

function HelperInsertionSort(nums, animation) {
  for (let i = 1; i < nums.length; i++) {
    let j = i - 1
    let temp = nums[i]
    // animation.push([j, i, "false", nums[j], nums[i] ])
    while (j >= 0 && nums[j] > temp) {
      animation.push([j+1, j, "true", nums[j+1], nums[j]])
      nums[j + 1] = nums[j]
      j--
    }
    animation.push([j+1, i, "swap", nums[j+1], temp])
    nums[j+1] = temp
  }
  return nums
}

export function bubbleSort(arr){
  let animation = [];
  helperBubbleSort(arr, animation);
  return animation;
} 

  // function swaping(arr, first_Index, second_Index){
  //   var temp = arr[first_Index];
  //   arr[first_Index] = arr[second_Index];
  //   arr[second_Index] = temp;
  // }

  // function HelperbubbleSort(arr, animation){

  //   var len = arr.length,
  //       // i, j, stop;

  //   for (let i=0; i < len; i++){
  //       for (let j=0, stop=len-i; j < stop; j++){
  //           animation.push([j , j+1, false]);
  //           if (arr[j] > arr[j+1]){
  //               animation.push([j+1, j, true]);
  //               swaping(arr, j, j+1);
  //           }
  //       }
  //   }

  //   return arr;
  // }



// function helperBubbleSort(records, animation){
//   for (var i=0; i<records.length; i++){
//     for (var j=0; j<records.length; j++){
//         animation.push([i,j,false]);
//         if (records[i] > records[j]){
//             animation.push([j,i,true])
//             var temp = records[i];
//             records[i] = records[j];
//             records[j] = temp;
//         }   
//       }    
//   }
//   return records;
// }


function helperBubbleSort(arr, animation){
  let swapped;
  let len = arr.length;
  do {
    swapped = false;
    for (let i = 0; i < len-1; i++) {
      animation.push([i, i+1, false, arr[i],arr[i+1] ])
      if (arr[i] > arr[i + 1]) {
        animation.push([i, i+1, true, arr[i], arr[i+1]])
        let tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swapped = true;
      }
    }
    len--;
  } while (swapped);
  return arr;
};
  // function helperBubbleSort(arr, animation){
  //   for (let i = 0; i < arr.length; i++){
  //     for(let j = 0; j < arr.length-i-1; j++){
  //       animation.push([j, j+1, false])
  //       if(arr[j] > arr[j+1]){
  //         animation.push([j+1, j , true])
  //         swapping(arr, j, j+1)
  //       }
  //     }
  //   }
  //   return arr
  // }

  // function swapping(arr, IdxOne, IdxTwo){
  //   let temp = arr[IdxOne];
  //   arr[IdxOne] = arr[IdxTwo];
  //   arr[IdxTwo] = temp;
  // }






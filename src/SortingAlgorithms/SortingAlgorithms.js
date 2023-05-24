export const mergeSort = array => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

export const bubbleSort = array => {
    const animations = [];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            //pushing value two times one to compare color and other to return to normal color
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);
        }
    }
    return animations;
}

export const quickSortHelper = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    quickSort(array, 0, array.length - 1, animations);
    return animations;
}

function quickSort(array, low, high, animations) {
    if (low < high) {
        let pi = partition(array, low, high, animations);
        quickSort(array, low, pi - 1, animations);
        quickSort(array, pi + 1, high, animations);
    }
}

function partition(array, low, high, animations) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        animations.push([j, high,false]);
        animations.push([j, high,false]);
        if (array[j] < pivot) {
            i++;
            swap(array, i, j);
            animations.push([i, array[i] , true]);
            animations.push([j, array[j],true]);
        }
    }
    swap(array, i + 1, high);
    animations.push([i + 1, high,false]);
    animations.push([i + 1, high,false]);
    animations.push([i + 1, array[i + 1],true]);
    animations.push([high, array[high],true]);
    return i + 1;
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function mergeHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx)
        return;
    const middleIndex = Math.floor((endIdx + startIdx) / 2);
    mergeHelper(auxiliaryArray, startIdx, middleIndex, mainArray, animations);
    mergeHelper(auxiliaryArray, middleIndex + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIndex, endIdx, auxiliaryArray, animations);

}










function doMerge(mainArray, startIdx, middleIndex, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIndex + 1;

    while (i <= middleIndex && j <= endIdx) {

        //we are pushing the value, once to change color and once to revert back color
        animations.push([i, j]);
        animations.push([i, j]);

        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}
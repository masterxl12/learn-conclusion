function BinarySearch(arr, item) {
    let arrSort = new QuickSort(arr).quickSort();
    let low = 0;
    let high = arrSort.length - 1;
    let midIndex, element;
    while (low < high) {
        midIndex = Math.floor((low + high) / 2);
        element = arrSort[midIndex];
        if (item < element) {
            high = midIndex - 1;
        } else if (item > element) {
            low = midIndex + 1;
        } else {
            return midIndex;
        }
    }
    return -1;
}
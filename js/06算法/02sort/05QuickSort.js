function QuickSort(array) {
    this.arr = array;
}

QuickSort.prototype.quickSort = function () {
    this.recursion(0, this.arr.length - 1);
    return this.arr;
};

QuickSort.prototype.swap = function (left, right) {
    [this.arr[left], this.arr[right]] = [this.arr[right], this.arr[left]];
};

QuickSort.prototype.findPivot = function (left, right) {
    let center = Math.floor((left + right) / 2);

    if (this.arr [left] > this.arr[center]) {
        this.swap(left, center)
    }

    if (this.arr[left] > this.arr[right]) {
        this.swap(left, right)
    }

    if (this.arr[center] > this.arr[right]) {
        this.swap(center, right)
    }
    this.swap(center, right - 1);
    return this.arr[right - 1];
};

QuickSort.prototype.recursion = function (low, high) {
    if (low >= high) return;
    let pivot = this.findPivot(low, high);
    let i = low;
    let j = high - 1;
    while (i < j) {
        while (this.arr[++i] < pivot) {
        }
        while (this.arr[--j] > pivot) {
        }
        if (i < j) {
            this.swap(i, j)
        } else {
            break;
        }
    }
    this.swap(i, high - 1);
    this.recursion(low, i - 1);
    this.recursion(i + 1, high);
};

let testArr = [10, 2, 13, 72, 24, 80, 97, 3, 21, 59, 100];
let instance = new QuickSort(testArr);
console.log(instance.quickSort());

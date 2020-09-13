function QuickSort() {
    this.arr = [3, 2, 1];
}

QuickSort.prototype.swap = function (left, right) {
    [this.arr[left], this.arr[right]] = [this.arr[right], this.arr[left]];
};

QuickSort.prototype.getMedian = function (left, right) {
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
};

let quick = new QuickSort();
quick.getMedian(0, 2);
console.log(quick.arr);
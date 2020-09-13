/**
 * 选择排序
 * 思路:
 * 找到数据结构中的最小值,并将其放置在第一位，接着找到第̃二小的值并将其放置在第̃二位，以此类推。
 * @param array
 * @returns {*}
 * @constructor
 */
function SelectionSort(array) {
    if (Array.isArray(array)) {
        let minIndex;
        let len = array.length;
        for (let i = 0; i < len - 1; i++) {
            minIndex = i;
            for (let j = i + 1; j < len; j++) {
                minIndex = array[minIndex] > array[j] ? j : minIndex;
            }
            if (minIndex !== i) {
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
            }
        }
        return array;
    } else {
        throw new TypeError("数据类型不合法")
    }
}


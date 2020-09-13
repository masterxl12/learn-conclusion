/**
 * 插入排序
 * 思路: 核心思想 局部有序
 *
 *  1. 从第一个元素开始，该元素可以认为已经被排序
 *  2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
 *  3. 如果该元素大于新元素，将该元素移到下一位置
 *  4. 重复上一个步骤，直到找到已排序的元素小于或者等于新元素的位置
 *  5. 将新元素插入到该位置后，重复上面的步骤
 *
 * @param array
 * @returns {*}
 * @constructor
 */

function InsertSort(array) {
    if (Array.isArray(array)) {
        let length = array.length;
        // 1. 外层循环，从第一个位置开始获取数据，向前面局部有序插入数据
        for (let i = 1; i < length; i++) {
            let temp = array[i],
                j = i;
            // 2. 内层循环： 获取i位置的元素，和前面的数据依次比较
            while (j > 0 && array[j - 1] > temp) {
                array[j] = array[j - 1];
                j--;
            }
            // 3. 将j位置的元素，置为temp
            array[j] = temp;
        }

        return array;
    } else {
        throw new TypeError("数据类型不合法")
    }
}
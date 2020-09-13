/**
 * 希尔排序
 * 思路： 不断改变增量的插入排序(最后增量为1)
 * @param array
 * @returns {*}
 * @constructor
 */
function ShellSort(array) {
    if (Array.isArray(array)) {
        // 1. 获取数组的长度
        let length = array.length;
        // 2. 初始化的增量(gap  -> 增量的间隔)
        let gap = Math.floor(length / 2);
        // 3. 不断循环gap增量
        while (gap >= 1) {
            // 4. 以gap为间隔，进行分组，对分组进行插入排序
            for (let i = gap; i < length; i++) {
                let temp = array[i], j = i;
                while (array[j - gap] > temp && j >= gap) {
                    array[j] = array[j - gap];
                    j -= gap;
                }
                // 5. 将j位置的元素赋值为temp
                array[j] = temp;
            }
            // 6. 改变gap增量
            gap = Math.floor(gap / 2);
            // console.log(array);
        }
        // 7. 返回排序后的数组
        return array;
    } else {
        throw new TypeError("Invalid Invoked!")
    }
}

/**
 * 冒泡排序
 * 思想：ࣿ比较任何两个相邻的项，如果第一个比第二̃个大，则交̓换它们
 * @param array
 * @returns {*}
 * @constructor
 */
function BubbleSort(array) {
    if (Array.isArray(array)) {
        let len = array.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // let swap = array[j];
                    // array[j] = array[j + 1];
                    // array[j + 1] = swap;
                    // 使用ES6的对象增强写法
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
            console.log(`第${i + 1}次排序:`, array);
        }
        return array;
    } else {
        throw new TypeError('传入数据不是数组')
    }
}


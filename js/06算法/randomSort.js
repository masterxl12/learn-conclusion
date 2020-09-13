/**
 * 随机打乱一个数组
 * @param array
 * @returns {*}
 * @constructor
 */
function RandomSort(array) {
    if (Array.isArray(array)) {
        return array.sort(()=>Math.random() - .5);
    }else{
        throw new TypeError("Error Invoked!")
    }
}

// const arr = [...new Array(8)].map((_, index) => index + 1);
//
// console.log(RandomSort(arr));
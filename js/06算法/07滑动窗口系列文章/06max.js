// ! leetcode 239. 滑动窗口最大值
/**
 * @description
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
 * 你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
   返回滑动窗口中的最大值。

 * * example
 * * 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 * * 输出: [3,3,5,5,6,7] 
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    let left = 0,
        arrs = [],
        len = nums.length;

    function getMax(arr) {
        return arr.sort((a, b) => a - b)[arr.length - 1];
    };

    while (left <= len - k) {
        let _arr = nums.slice(left, left + k);
        arrs.push(getMax(_arr));
        left++;
    }

    // if (len !== k) {
    //     while (left <= len - k) {
    //         let _arr = nums.slice(left, left + k);
    //         arrs.push(getMax(_arr));
    //         left++;
    //     }
    // } else {
    //     arrs.push(getMax(nums))
    // }
    return arrs;
};



console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
console.log(maxSlidingWindow([9, 11], 2));
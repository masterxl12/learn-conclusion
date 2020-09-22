/***
 * 消失的数字
 * (1) 0与任何数字异或等于该数自身
 * (2) 对同一个值异或两次，那么结果等于它本身
 * 利用异或的特性，res = res ^ x ^ x。
 * 所以我们对res从0-nums.length进行异或，同时对nums数组中的值进行异或，
 * 出现重复的会消失，所以最后res的值是只出现一次的数字，也就是nums数组中缺失的那个数字。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    let res = 0;
    for (let i = 0; i < nums.length; i++) {
        res ^= i;
        res ^= nums[i];
    }
    res ^= nums.length;
    return res;
};
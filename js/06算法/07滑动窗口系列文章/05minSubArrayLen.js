// ! leetcode 209. 长度最小的子数组

/**
 * @description 给定一个含有 n 个正整数的数组和一个正整数 s ，
 * 找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。
 * 如果不存在符合条件的子数组，返回 0。
 * 
 * * 测试用例
 *  输入：s = 7, nums = [2,3,1,2,4,3]
    输出：2
    解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 * 
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
    const int_max = Number.MAX_SAFE_INTEGER;
    let i = 0, j = 0, sum = 0, ans = int_max,len = nums.length;
    while (j<len) {
        sum += nums[j];
        j++;
        while (sum >= s) {
            ans = Math.min(ans, j - i)
            sum -= nums[i];
            i++
        }
    }
    console.log(nums.slice(i - 1));
    return ans === int_max ? 0 : ans;;                                                                                         
};


minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);
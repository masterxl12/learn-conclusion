/**
 * @description 求三个数之和
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const result = [];
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] <= 0 && nums[i] !== nums[i - 1]) {
            let twoSum = 0 - nums[i];
            let left = i + 1;
            let right = nums.length - 1;

            while (left < right) {
                let ref = nums[left] + nums[right];
                if (ref === twoSum) {
                    let arr = [nums[i], nums[left], nums[right]];
                    result.push(arr);
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    right--;
                    left++;
                } else if (ref > twoSum) {
                    right--;
                } else if (ref < twoSum) {
                    left++;
                }
            }
        }
    }
    return result;
};

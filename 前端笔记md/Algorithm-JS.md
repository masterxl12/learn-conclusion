#### 1.1 base

##### 01 

问题描述：给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

思路：

```javascript
/**
 * @description 给定一个整数数组 nums 和一个目标值 target，
 * 请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum2 = (nums, target) => {
  let targetMap = new Map()
  for (let i = 0; i < nums.length; i++) {
    const key = target - nums[i]
    if (targetMap.has(key)) {
      return [targetMap.get(key), i]
    }
    targetMap.set(nums[i], i)
  }
}
let find = twoSum2([5, 2, 11, 15, 7, 6], 9);
console.log(find);
```

##### 03 无重复字符的最长子串

问题描述：

给定一个字符串，请找出其中不含有重复字符的 **最长子串** 的长度。

思路：使用一个`数组`来==维护滑动窗口==

遍历字符串，判断当前字符是否在滑动窗口数组中

- 如果不在，则`push`到滑动窗口中；

- 如果在，则删除滑动窗口数组里相同字符及相同字符前的字符，然后将当前字符 `push` 进数组
- 然后将 `max` 更新为当前最长子串的长度

```javascript
/**
 * @description 无重复字符的最长子串
 * @param {string} s 
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  let arr = [], max = 0;
  for (let char of s) {
    if (arr.includes(char)) {
      arr.splice(0, arr.indexOf(char) + 1);
    }
    arr.push(char);
    max = Math.max(arr.length, max);
  }
  return max;
}
let s = "abcdac";
console.log(lengthOfLongestSubstring(s));
```


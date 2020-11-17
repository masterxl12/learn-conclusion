// ! leetcode 3. 无重复字符的最长子串

/**
 * @description 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let left = 0;
    let right = 0;
    let res = 0;
    let window = new Map();
    while (right<s.length) {
        let char = s[right];
        right++;
        window.set(char, (window.get(char) || 0) + 1);
        while (window.get(char)>1) {
            let d = s[left];
            left++;
            window.set(d, window.get(d) - 1);
        }
        res = Math.max(res, right - left);
    }
    return res;
};
/**
 * @description 无重复字符的最长子串
 * @param {string} s
 * @return {number}
 * @resolve 使用滑动窗口解决
 * @add 打印出该子串
 */

var lengthOfLongestSubstring = function (s) {
    let left = 0,
        right = 0;
    let maxLen = 0;
    // let start = 0;  // 子串的起始位置
    let windows = new Map();
    while (right < s.length) {
        let char = s[right];
        windows.set(char, windows.has(char) ? windows.get(char) + 1 : 1);
        right++;
        while (windows.get(char) > 1) {
            let char2 = s[left];
            windows.set(char2, windows.get(char2) - 1);
            left++
        }
        // 记录起始位置
        // if (maxLen <= right - left) {
        //     maxLen = right - left;
        //     start = left;
        // }

        maxLen = Math.max(maxLen, right - left);
    }
    // console.log('childStr', s.substr(start, maxLen));
    return maxLen;
};
var number = lengthOfLongestSubstring("abcabcbb");
console.log('number', number);

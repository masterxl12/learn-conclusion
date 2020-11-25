// ! 159 至多包含两个不同字符的最长子串

/*
例 1:
输入: “eceba”
输出: 3
解释: t 是 “ece”，长度为3。

例 2:
输入: “ccaabbb”
输出: 5
解释: t 是 “aabbb”，长度为5。
*/

let lengthOfLongestSubstringTwoDistinct = function (s) {

    let left = 0,
        right = 0,              // * right指向的是窗口外的下一个字符
        count = 0,              // * 不同字符个数
        maxLen = 0;
    let window = new Map();
    while (right < s.length) {
        let char = s[right];
        right++;
        if (!window.has(char)) { 
            count++;            // * 出现新字符
        }
        window.set(char, (window.get(char) || 0) + 1);
        while (count > 2) {                    // * 当窗口内不同字符个数 > 2
            let d = s[left];
            left++;                            // * 缩减窗口
            window.set(d, window.get(d) - 1);  // * 计数减1
            if (window.get(d) === 0) {
                count--;                       // * 字符计数减为0
            }
        }
        maxLen = Math.max(right - left, maxLen);
    }
    return maxLen;
}

console.log(lengthOfLongestSubstringTwoDistinct('ccaabbbmdmsmmmm'));
console.log(lengthOfLongestSubstringTwoDistinct('eceba'));
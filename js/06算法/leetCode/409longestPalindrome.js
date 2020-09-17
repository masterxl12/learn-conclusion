/**
 * @description 最长回文子串
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
    let len = s.length;
    let charMap = new Map();
    let result = 0;
    for (let i = 0; i < len; i++) {
        let char = s[i];
        charMap.set(char, charMap.has(char) ? charMap.get(char) + 1 : 1);
    }
    for (let value of charMap.values()) {
        result += value - value % 2;
    }
    return result === len ? len : result + 1;
};
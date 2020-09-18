/**
 * @description 最长回文串
 * 给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
 * 在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
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
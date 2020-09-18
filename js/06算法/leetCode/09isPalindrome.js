/**
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let s = '' + x;
    let len = s.length;
    let flag = true;
    for (let i = 0; i < len / 2; i++) {
        if (s[i] !== s[len - 1 - i]) {
            flag = false;
            break;
        }
    }
    return flag;
};

// 使用数学解法 逆序后的数和之前的数对比
var isPalindrome2 = function (x) {
    if (x < 0) return false;
    let temp = x;
    let cur = 0;
    while (temp !== 0) {
        cur = cur * 10 + temp % 10;
        temp = Math.floor(temp / 10);
    }
    return cur == x;
};

console.log(isPalindrome2(121));
console.log(isPalindrome2(1221));
console.log(isPalindrome2(123));
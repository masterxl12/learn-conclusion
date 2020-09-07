/**
 * 判断是否是完美数
 * @description 一个数的所有真约数之和(自身除外)等于其自身
 * @param {} number 
 */
function isPerfectNumber(number) {
    if (typeof number === 'number') {
        let count = 1;
        let total = parseInt(Math.sqrt(number));
        for (let i = 2; i <= total; i++) {
            if (number % i === 0) {
                count += (i + number / i)
            }
        }
        return count === number ? true : false
    } else {
        throw new TypeError("输入类型不合法!")
    }
}

console.log(isPerfectNumber(6));
console.log(isPerfectNumber(16));
console.log(isPerfectNumber("num"));
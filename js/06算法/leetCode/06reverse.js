/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let ref = Math.pow(2, 31)
    let leftBound = -ref;
    let rightBound = ref - 1;
    let result = 0;

    function numberReverse(num) {
        let temp = num;
        let sum = 0;
        while (temp !== 0) {
            sum = sum * 10 + temp % 10;
            temp = Math.floor(temp / 10);
        }
        return sum;
    }
    if (x > 0) {
        result = numberReverse(x);
    }
    if (x < 0) {
        result = -numberReverse(-x);
    }
    return result = result < leftBound || result > rightBound ? 0 : result
};
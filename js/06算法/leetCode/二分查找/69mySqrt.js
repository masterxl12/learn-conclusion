/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    let left = 0;
    let right = x;
    let mid = 0;
    while (left < right) {
        mid = (left + right) / 2 + 1;
        if (mid > x / mid) {
            right = mid;
        } else {
            left = mid;
        }
    }
    return Math.floor(mid);
};
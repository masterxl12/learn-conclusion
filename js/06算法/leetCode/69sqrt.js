function sqrt(num) {
    let left = 0;
    let right = num;
    let mid = 0;
    while (Math.abs(left - right) > 0.1) {
        mid = (left + right) / 2;
        if (mid > num / mid) {
            right = mid;
        } else if (mid < num / mid) {
            left = mid;
        }
    }
    return mid;
}
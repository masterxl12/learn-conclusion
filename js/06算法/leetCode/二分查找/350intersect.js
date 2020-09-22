/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
    let aMap = new Map();
    let bMap = new Map();
    let res = [];

    for (let i in nums1) {
        let number = nums1[i];
        aMap.set(number, aMap.has(number) ? aMap.get(number) + 1 : 1);
    }

    for (let i in nums2) {
        let number = nums2[i];
        bMap.set(number, bMap.has(number) ? bMap.get(number) + 1 : 1);
    }

    for (let key of aMap.keys()) {
        if (bMap.has(key)) {
            let min = Math.min(aMap.get(key), bMap.get(key));
            res = res.concat(min > 1 ? new Array(min).fill(key) : key)
        }
    }

    return res;
};
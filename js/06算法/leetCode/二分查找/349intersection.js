/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    if (Array.isArray(nums1) && Array.isArray(nums2)) {
        let set = new Set(nums2);
        return [...new set(nums1)].filter(item => set.has(item))
    }
}
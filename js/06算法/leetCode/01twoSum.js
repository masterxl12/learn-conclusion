/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    /**
     let map = new Map();
     for(let i in nums){
        map.set(nums[i],i)
    }
     for(let i in nums){
        let curr = nums[i];
        let diff = target - curr;
        if(map.has(diff)){
            if(map.get(diff) !== i){
                return [i,map.get(diff)]
            }
        }
    }
     */
    let map = new Map();
    for (let i in nums) {
        let diff = target - nums[i];
        if (!map.has(diff)) {
            map.set(nums[i], i)
        } else {
            return [map.get(diff), i]
        }
    }
    return false;
};
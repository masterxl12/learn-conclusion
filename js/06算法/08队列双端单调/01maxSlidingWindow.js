// ! leetcode 239. 滑动窗口最大值

/**
 * 
 * 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 * 输出: [3,3,5,5,6,7] 
 * 滑动窗口的位置                最大值
---------------               -----
 [1  3  -1] -3  5  3  6  7      3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// 定义一个单调递增数列
class MonotonicQueue{
    constructor() {
        this.items = [];
    }
    isEmpty() { 
        return this.items.length === 0;
    }
    addRear(element) { 
        // 可以想象，加入数字的大小代表人的体重，新加入的大的数字把前面体重不足的都压扁了，
        // 直到遇到更大的量级才停住
        while (!this.isEmpty() && this.items[this.items.length - 1] < element) { 
            this.items.pop();            
        }
        this.items.push(element);
    }
    getMax() { 
        return this.items[0];
    }
    removeFront(element) { 
        // 想删除的队头元素 n 可能已经被「压扁」了，可能已经不存在了，所以这时候就不用删除了
        if (element === this.items[0]) { 
            this.items.shift()
        }
    }
}

let maxSlidingWindow = function(nums, k) {
    let queue = new MonotonicQueue(),
        res = [];
    if (k === 1) {
        return nums;
    }

    for (let i = 0; i < nums.length; i++) {
        if (i < k - 1) {
            //先填满窗口的前 k - 1
            queue.addRear(nums[i]); 
        } else {
            // 窗口向前滑动，加入新数字
            queue.addRear(nums[i]); 
            // 记录当前窗口的最大值
            res.push(queue.getMax());
            // 移出旧数字
            queue.removeFront(nums[i - k + 1]);
        }
    }
    return res;
};

console.log(maxSlidingWindow([5, 4, 6, 9, 2, 6], 3));
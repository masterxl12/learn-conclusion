/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// ! 面试题 02.02. 返回倒数第 k 个节点

/**
 * @description 返回倒数第k个节点
 * 
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 * 
 * @resolve  使用快慢指针， 快指针领先慢指针k 步，当快指针走到尾部时，慢指针即为所求
 */
var kthToLast = function (head, k) {
    let left = head,
        right = head;
    while (k > 0) {
        right = right.next;
        k--;
    }

    while (right) {
        left = left.next;
        right = right.next;
    }

    return left.val;
};


var kthToLast2 = function (head, k) {

    let stack = [];
    let length = 0;
    while (head) {
        stack.push(head.val);
        length++;
        head = head.next;
    }

    // while (k > 0) {
    //     stack.pop();
    //     k--;
    // }
    return stack[length - k];
};
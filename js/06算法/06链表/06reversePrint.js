

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// ! 剑指 Offer 06 从尾到头打印链表

// ! 原地反转链表
// * 

/**
 * @description
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseList = function (head) {

    let temp, prev = null, curr = head;
    while (curr) {
        temp = curr.next;
        curr.next = prev;
        prev = curr;


        
        curr = temp
    }

    let arr = [];
    while (prev) {
        arr.push(prev.val);
        prev = prev.next;
    }

    // let arr = [];
    // while (node) {
    //     arr.unshift(node.val);
    //     node = node.next;
    // }
    // return arr;
};
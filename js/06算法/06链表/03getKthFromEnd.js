/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// ! 剑指 Offer 22. 链表中倒数第k个节点

/**
 * @description
 * 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，
 * 本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，
 * 从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。
 * 
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {

    let slow = head;
    let quick = head;

    while (k > 0) { 
        quick = quick.next;
        k--;
    }

    while (quick) { 
        quick = quick.next;
        slow = slow.next;
    }

    return slow.val;
};
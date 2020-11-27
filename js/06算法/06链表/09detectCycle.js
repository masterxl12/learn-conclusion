// ! LeetCode 142. 环形链表 II
// ! 使用快慢指针

/*
给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let detectCycle = function (head) {
    let slow = head,
        fast = head;

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast == slow) break;
    }

    // * fast 遇到空指针说明没有环
    if (fast == null || fast.next == null) {
        return null;
    }

    // * 当快慢指针相遇时，让其中任一个指针指向头节点，
    // * 然后让它俩以相同速度前进，再次相遇时所在的节点位置就是环开始的位置
    fast = head;
    while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    }

    return slow;
};
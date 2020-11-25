// ! leetcode 141. 环形链表
// ! 使用快慢指针 经典解法就是用两个指针，一个跑得快，一个跑得慢。
// ! 如果不含有环，跑得快的那个指针最终会遇到 null，说明链表不含环；如果含有环，
// ! 快指针最终会超慢指针一圈，和慢指针相遇，说明链表含有环。

/*
给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。
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
 * @return {boolean}
 */
function hasCircle(head) {
    let slow = head,
        fast = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
}
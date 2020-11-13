/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// ! 剑指 Offer 18. 删除链表的节点

/**
 * 
 * @description 
 * 给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
    返回删除后的链表的头节点。
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
let deleteNode = function (head, val) {
    let pre = new ListNode(0); // 定义哨兵节点
    pre.next = head;

    let node = pre;
    while (node.next) {
        if (node.next.val === val) {
            node.next = node.next.next;
            break;
        }
        node = node.next;
    }

    return pre.next;
};
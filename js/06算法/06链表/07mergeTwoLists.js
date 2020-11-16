/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// ! 剑指 Offer 25. 合并两个排序的链表
 
/**
 * @description 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let head = new ListNode(0);

    let curr = head;

    while (l1 && l2) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next
        } else { 
            curr.next = l2;
            l2 = l2.next
        }
        curr = curr.next
    }

    if (!l1) { 
        curr.next = l2
    }

    if (!l2) { 
        curr.next = l1
    }

    return head.next;
};
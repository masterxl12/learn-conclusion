/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// ! 剑指 Offer 24. 反转链表

// ! 原地反转链表
// * 利用3个变量在循环过程中记录最后3种信息
// * curr 游标，一直往后循环(保证原始链表一直向后走)，最后会为null
// * prev 记录前一个节点
// * oldNext，变更方向时，需要先用oldNext记住改变前的next节点，否则无法向后循环

/**
 * @description
 * 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseList = function (head) {
    let curr = head, prev = null, temp;
    while (curr) {
        temp = curr.next;   // 修改前先记住下一个节点(保证原始链表一直向后走)
        curr.next = prev;   // 改变指向，第一个节点prev是null
        prev = curr;        // 记录前一个节点，供下次循环使用
        curr = temp;        // curr通过temp指向下一节点
    }
    return prev;
};
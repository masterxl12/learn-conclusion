/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function (n, m) {
    if (n < 1 || m < 1) return -1;
    const head = {
        val: 0
    };
    let current = head;
    for (let i = 1; i < n; i++) {
        current.next = {
            val: i
        };
        current = current.next;
    }
    current.next = head; // 当前current 为 尾部节点
    // current = current.next; // 纠正为起始节点
    while (current.next !== current) {
        for (let i = 0; i < m - 1; i++) {
            current = current.next;
        }
        current.next = current.next.next;
    }
    return current.val;
};

// console.log(lastRemaining(5, 3));
console.log(lastRemaining(10, 17));
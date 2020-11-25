const {
    Queue
} = require('./00queue')

// ! 使用队列解决约瑟夫环问题(击鼓传花问题)
function lastElementExisted(n, m) {
    if (n < 1 || m < 1) return -1;
    const queue = new Queue();
    for (let i = 1; i <= n; i++) {
        queue.addToLast(i)
    }

    while (queue.size() > 1) {
        for (let i = 0; i < m - 1; i++) { 
            queue.addToLast(queue.removeAtHead());
        }
        queue.removeAtHead()
    }
    return queue.items[0]
}

console.log(lastElementExisted(5, 3));
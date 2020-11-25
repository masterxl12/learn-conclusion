class Queue{
    constructor() { 
        this.items = [];
    }

    // 尾部添加
    addToLast(element) { 
        this.items.push(element)
    }

    // 头部删除
    removeAtHead() { 
        return this.items.shift();
    }

    size() { 
        return this.items.length
    }
}

const queue = new Queue();
queue.addToLast(23);
queue.addToLast(231);
queue.addToLast(223);

module.exports = {
    Queue
}

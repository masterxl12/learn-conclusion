// ! 双端队列
/**
 * 使用数组模拟双端队列的实现 
 * 包括从首尾两端插入和删除元素，队列是否为空、长度、清空方法
 */
function Dequeue() {
    this.items = [];
    this.addFront = function (element) { 
        this.items.unshift(element)
    }
    this.removeFront = function () { 
        this.items.shift()
    }

    this.addRear = function (element) {
        this.items.push(element)
    }

    this.removeRear = function () {
        this.items.pop()
    }

    this.isEmpty = function () {
        return this.items.length === 0;
    }

    this.size = function () { 
        return this.items.length;
    }

    this.clear = function () { 
        this.items = [];
    }
}

const dequeue = new Dequeue();
dequeue.addFront(2);
dequeue.addFront(12);
dequeue.addFront(20);
dequeue.addFront(8);
dequeue.removeRear();
dequeue.addRear(10);

console.log(dequeue.items);



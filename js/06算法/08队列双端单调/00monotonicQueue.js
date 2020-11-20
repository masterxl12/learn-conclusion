class MonotonicQueue{
    constructor() {
        this.items = [];
    }

    isEmpty() { 
        return this.items.length === 0;
    }

    addRear(element) { 
        while (!this.isEmpty() && this.items[this.items.length - 1] < element) { 
            this.items.pop();            
        }
        this.items.push(element);
    }

    getMax() { 
        return this.items[0];
    }

    removeFront(element) { 
        if (element === this.items[0]) { 
            this.items.shift()
        }
    }

    print() { 
        return this.items.join(" ");
    }
}

// const queue = new MonotonicQueue();
// queue.addRear(5);
// queue.addRear(4);
// queue.addRear(6);
// queue.print();
// queue.addRear(1);
// queue.addRear(4);
// console.log(queue.getMax());
// queue.print();

module.exports = {
    MonotonicQueue:MonotonicQueue
}



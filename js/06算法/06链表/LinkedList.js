let Node = function (element) {
    this.element = element;
    this.next = null;
}

function LinkedList() {
    this.head = null;
    this.length = 0;
}

LinkedList.prototype.append = function (element) {
    let newNode = new Node(element);
    let current;
    if (!this.head) {
        this.head = newNode;
    } else {
        current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    this.length++;
}

let linkList = new LinkedList();
linkList.append(23);
linkList.append(203);
linkList.append(1);
linkList.append(123);
linkList.append(235);
linkList.append(3);
linkList.append(56);

/**
 * 获取链表的中间节点
 * @param {*} listNode 
 */
let getMidNode = function (listNode) {
    let slow = listNode.head;
    let fast = listNode.head;
    let prev;
    while (fast.next && fast.next.next) {
        prev = slow;
        fast = fast.next.next;
        slow = slow.next;
    }
    return {
        prev,
        slow
    };
}

/**
 * 删除链表中的中间节点
 * @param {*} listNode 
 */
let removeNode = function (listNode) {
    const {
        prev,
        slow
    } = getMidNode(listNode);
    prev.next = slow.next;
    listNode.length--;

    return listNode.length;
}

console.log(getMidNode(linkList).prev.element);

console.log("长度: ", removeNode(linkList), "中间值: ", getMidNode(linkList).slow.element);
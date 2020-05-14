

#### 3.链表

数组的缺点：从数组的起点或中间插入或移除项的成本很高，因为需要移动元素

##### 3.1 链表概念及优缺点

链表：链表存储有序的元素集合，但不同于数组，链表中的元素在内存中==并不是连续放置的==。

每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200507220605725.png" alt="image-20200507220605725" style="zoom:50%;" /> 

链表优点：添加/删除元素

添加或移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意

链表缺点：访问元素

访问链表中间的一个元素，需要从起点（表头）开始迭代列表直到找到所需的元素。

##### 3.2 链表(LinkedList)的实现

###### 3.2.1 实现步骤

- 定义一个Node辅助类
  - 包含一个element属性，即要添加到列表的值
  - 一个next属性，即指向列表中下一个节点项的指针。

- 需要存储第一个节点的引用。为此，可以把这个引用存储在一个称为head的变量中

- 实现的方法

| 方法名                   | 方法描述                                                     |
| ------------------------ | ------------------------------------------------------------ |
| append(element)          | 向列表尾部添加一个新的项。                                   |
| insert(position,element) | 向列表的特定位置插入一个新的项                               |
| remove(element)          | 从列表中移除一项                                             |
| indexOf(element)         | 返回元素在列表中的索引。如果列表中没有该元素则返回-1         |
| removeAt(position)       | 从列表的特定位置移除一项。                                   |
| isEmpty()                | 如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。 |
| size()                   | 返回链表包含的元素个数。与数组的length属性类似               |
| toString()               | 由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值。 |

##### 3.3 双向链表

双向链表：链接是双向的，==一个链向下一个元素，另一个链向前一个元素==

![image-20200508094302745](/Users/masterxl/Library/Application Support/typora-user-images/image-20200508094302745.png)

单向链表的缺点：

在单向链表中，如果迭代列表时错过了要找的元素，就需要回到列表起点，重新开始迭代。

双向链表两种迭代列表的方法：从头到尾，或者反过来。也可以访问一个特定节点的下一个或前一个元素.

![image-20200508223148670](/Users/masterxl/Library/Application Support/typora-user-images/image-20200508223148670.png)

方法实现：

```javascript
function MyDoublyLinkedList() {
  // 内部辅助类，节点类
  let Node = function (element) {
    this.element = element;
    this.prev = null;
    this.next = null;
  }
  this.length = 0;
  this.head = null;
  this.tail = null;
  // 常见的操作
  // 1. append(element)  向链表尾部添加新元素
  MyDoublyLinkedList.prototype.append = function (element) {
    let node = new Node(element);
    let current = this.head;
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      current = this.tail;
      current.next = node;
      node.prev = current;
      this.tail = node;
    }
    this.length += 1;
  }

  // 2. toString()方法,默认正序输出
  MyDoublyLinkedList.prototype.toString = function () {
    return this.backwardString();
  }

  // 3. forwardString()方法,向前遍历链表(反序)
  MyDoublyLinkedList.prototype.forwardString = function () {
    let current = this.tail;
    let result = "";
    while (current) {
      result += current.element + " ";
      current = current.prev;
    }
    return result;
  }
  // 4. backwardString()方法，向后遍历链表(正序)
  MyDoublyLinkedList.prototype.backwardString = function () {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.element + " ";
      current = current.next;
    }
    return result;
  }
  // 5. insert(position,element) 在任意位置插入新元素
  MyDoublyLinkedList.prototype.insert = function (position, element) {
    let newNode = new Node(element);
    if (position < 0 || position > this.length) return false;
    if (this.length == 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let current = this.head;
      if (position === 0) {
        current.prev = newNode;
        newNode.next = current;
        this.head = newNode;
      } else if (position == this.length) {
        current = this.tail;
        current.next = newNode;
        newNode.prev = current;
        this.tail = newNode;
      } else {
        let index = 0,
          previous = null;
        while (index < position) {
          previous = current;
          current = current.next;
          index++;;
        }
        current.prev = newNode;
        newNode.next = current;
        newNode.prev = previous;
        previous.next = newNode;
      }
    }
    this.length += 1;
    return true;
  }
  // 6. get(index)方法,获取某一位置元素
  MyDoublyLinkedList.prototype.get = function (position) {
    if (position < 0 || position >= this.length) return null;
    let index = 0;
    let current = null;
    if (position <= this.length / 2) {
      current = this.head;
      while (index < position) {
        current = current.next;
        index++;
      }
    } else {
      current = this.tail;
      while (index < this.length - position - 1) {
        current = current.prev;
        index++;
      }
    }
    return current.element;
  }
  // 7. idnexOf(data) 返回元素的索引
  MyDoublyLinkedList.prototype.indexOf = function (data) {
    let index = 0,
      current = this.head;
    while (current) {
      if (current.element === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }
  // 8. update(index,data) 更新指定位置上的元素
  MyDoublyLinkedList.prototype.update = function (position, newData) {
    if (position < 0 || position >= this.length) return false;
    let index, current;
    if (position < this.length / 2) {
      index = 0;
      current = this.head;
      while (index < position) {
        current = current.next;
        index += 1;
      }
    } else {
      index = this.length - 1;
      current = this.tail;
      while (position < index) {
        current = current.prev;
        index -= 1;
      }
    }
    current.element = newData;
    return true;
  }
  // 9. removeAt(position) 删除指定位置处的元素
  MyDoublyLinkedList.prototype.removeAt = function (position) {
    if (position < 0 || position >= this.length) return false;
    let current = this.head;
    if (this.length === 1) {  // 判断是否只有一个节点
      this.head = null;
      this.tail = null;
    } else {
      if (position === 0) {  // 判断删除第一个节点
        current.next.prev = null;
        this.head = current.next;
      } else if (position === this.length - 1) { // 判断删除最后一个节点
        current = this.tail;
        current.prev.next = null;
        this.tail = current.prev;
      } else {
        let index = 0;
        while (index++ < position) {
          current = current.next;
        }
        current.next.prev = current.prev;
        current.prev.next = current.next;
      }
    }
    this.length -= 1;
    return current.element; // 返回删除的数据
  }
  // 10. remove(element) 从列表中移除一项
  MyDoublyLinkedList.prototype.remove = function (data) {
    let index = this.indexOf(data);
    if (index) {
      return this.removeAt(index);
    };
  }
  // 11. isEmpty() 判断是否为空
  MyDoublyLinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  }
  // 12. size()方法
  MyDoublyLinkedList.prototype.size = function () {
    return this.length;
  }

  // 13. 获取链表第一个元素
  MyDoublyLinkedList.prototype.getHead = function () {
    // return this.get(0);
    return this.head.element;
  }
  // 14. 获取链表最后一个元素
  MyDoublyLinkedList.prototype.getTail = function () {
    // return this.get(this.length - 1);
    return this.tail.element;
  }
}


const list = new MyDoublyLinkedList();
list.append("abc");
list.append("cba");
list.append("nba");
list.append("pba");
list.append("mba");
list.append("qba");
list.append("dba");
console.log(list.toString());
console.log(list.backwardString());
console.log(list.forwardString());

list.insert(0, "mba");
list.insert(4, "pba");
list.insert(1, "wba");
console.log(list.toString());
console.log("=====================");
console.log(list.get(5));
console.log("----------------------");
console.log(list.indexOf('wba'));
console.log(list.indexOf('aaa'));
console.log("**********update*************");
console.log(list.update(1, "mmm"));
console.log(list.backwardString());
console.log(list.update(100, 100));
console.log("*************removeAt***************");

console.log(list.removeAt(1));
console.log(list.removeAt(2));
console.log(list.backwardString());
console.log("*************remove***************");
console.log(list.remove("pba"));
console.log(list.backwardString());

console.log("------------------isEmpty----------------");
console.log(list.isEmpty());
console.log("------------------size-------------------");
console.log(list.size());
console.log("------------------getHead----------------");
console.log(list.getHead());
console.log("------------------getTail----------------");
console.log(list.getTail());
```


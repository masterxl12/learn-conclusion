

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

#### 4 . 集合

##### 4.1 集合的特点

集合：一组无序的、不能重复的元素

可以理解为特殊的数组：

- 里面的元素没有顺序，也不能重复.
- ==没有顺序==则意味着==不能通过下标值进行访问==，==不能重复==意味着==相同的对象在集合中只会存在一份==。

集合的实现方式：使用Hash(散列表进行封装)

##### 4.2 集合的属性和方法

常用方法：

| 方法            | 说明                                               |
| --------------- | -------------------------------------------------- |
| `add(value)`    | 向集合添加一个新的项。                             |
| `remove(value)` | 从集合移除一个值。                                 |
| `has(value)`    | 如果值在集合中，返回true，否则返回false。          |
| `clear()`       | 移除集合中的所有项。                               |
| `size()`        | 返回集合所包含元素的数量。与数组的length属性类似。 |
| `values()`      | 返回一个包含集合中所有值的数组。                   |

```javascript
// add(value)：向集合添加一个新的项。
// remove(value)：从集合移除一个值。
// has(value)：如果值在集合中，返回true，否则返回false。
// clear()：移除集合中的所有项。
// size()：返回集合所包含元素的数量。与数组的length属性类似。
// values()：返回一个包含集合中所有值的数组。
function MySet() {
  this.items = {};
  //  1. has(value)：如果值在集合中，返回true，否则返回false。
  MySet.prototype.has = function (value) {
    // hasOwnProperty 判断对象是否包含特定的自身属性
    return this.items.hasOwnProperty(value);
  }
  // 2. add(value)：向集合添加一个新的项
  MySet.prototype.add = function (value) {
    if (this.has(value)) {
      return false;
    }
    this.items[value] = value;
    return true;
  }

  // 3.remove(value)：从集合移除一个值。
  MySet.prototype.remove = function (value) {
    if (!this.has(value)) {
      return false;
    }
    delete this.items[value];
    return true
  }

  // 4. clear()：移除集合中的所有项。
  MySet.prototype.clear = function () {
    this.items = {};
  }
  // 5. size()：返回集合所包含元素的数量。与数组的length属性类似。
  MySet.prototype.size = function () {
    return Object.keys(this.items).length;
  }
  // 6. values()：返回一个包含集合中所有值的数组。
  MySet.prototype.values = function () {
    return Object.keys(this.items);
  }
}

const set = new MySet();
set.add('cba');
set.add('nba');
set.add('mba');
set.add('pba');

console.log(set.values());
console.log(set.size());
console.log(set.has("mba"));
console.log(set.clear());
console.log(set.size());
// 打印输出
[ 'cba', 'nba', 'mba', 'pba' ]
4
true
undefined
0
```

##### 4.3 集合间操作

并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合



交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合

差集：A、B两个集合，x（元素）存在于A中，且x不存在于B中

子集：A、B两个集合，集合A中的每一个x（元素），也需要存在于B中

#### 5. 散列表(Hash)

​	==散列算法==的作用是尽可能快地在数据结构中找到一个值。如果使用==散列函数==，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后==返回值在表中的地址==。

##### 5.1 散列函数：

​	给定一个key参数，我们就能根据组成key的==每个字符的ASCII码值的和==得到一个数字。

- 遍历key(行{2})并将从ASCII表中查到 的每个字符对应的ASCII值加到hash变量中(String类中的charCodeAt 方法)。
- 根据指定的hash表的长度，一般是质数，

###### 5.1.1 判断质数方法

不需要整个区间判断，只需要判断`(2~Math.sqrt(number))`之间的数能否被number整除即可

```javascript
function isPrime(number) {
    let num = parseInt(Math.sqrt(number));
    for (let i = 2; i <= num; i++) {
        if (number % i === 0) {
            return false
        }
    }
    return true;
}
```

###### 5.1.2 给定指定number，获取最近的素数

```javascript
function getPrime(number) {
    while (!isPrime(number)) { // 不是质数
        number++
    }
    return number;
}
```

###### 5.1.3 hash函数

- 根据组成key的每个字符的ASCII码值的==和==得到一个数字hashcode。
- 由计算出的hashcode和指定的hash表的长度(一般是质数)得到index(mod(取余数))

```javascript
// 
    hashHandler(key,limit) {
        // 1. 定义hashCode变量
        let hashCode = 0;
        // 2. 霍纳算法，计算hashCode值
        for (let strKey in str) {
            hashCode = 37 * hashCode + str.charCodeAt(strKey);
        }
        // 3. 取余操作
        let index = hashCode % limit;
        return index;
    }
```

##### 5.2 hash表的实现

###### 5.2.1 基于链表的实现

在hash表的每一个位置创建一个链表，并将元素存储在里面

每一项是链表，如图所示:

![image-20200531105121184](/Users/masterxl/Library/Application Support/typora-user-images/image-20200531105121184.png)

###### 5.2.2 hash表的常见操作

| 方法           | 描述                                   |
| -------------- | -------------------------------------- |
| put(key,value) | 向散列表增加一个新的项(也能更新散列表) |
| remove(key)    | 根据键值从散列表中移除值               |
| get(key)       | 返回根据键值检索到的特定的值           |

put方法:

Hash表新增/修改元素的过程：

- 根据key获取索引值
  - 将数据插入到对应的位置
- 根据索引值取出对应位置的bucket(链表)
  - 判断桶是否存在，如果存在，调用链表插入元素的方法
  - 如果不存在，在该索引处新建链表
- 判断是新增还是修改
  - 如果已经有值，就修改值
  - 如果没有，执行后续的新增操作
- 新增操作

###### 5.2.3 创建链表类LinkedList，并导出

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    // 1. append(data) 添加元素
    append(data) {
        let current;
        let newNode = new Node(data);
        // 1.1 链表长度为0
        if (this.length === 0) {
            this.head = newNode;
        } else {
            // 1.2 链表长度不为0
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length += 1;
    }

    // 2. 插入元素 insert(position,data)
    insert(position, data) {
        let index = 0;
        let newNode = new Node(data);
        let current = this.head;
        // 1. 越界判断
        if (position < 0 || position > this.length) return false;
        // 2.1 头部插入元素
        if (position === 0) {
            newNode.next = current;
            this.head = newNode;
        } else { // 2.2 中间或者尾部插入元素
            let previous;
            while (index < position) {
                previous = current;
                current = current.next;
                index++;
            }
            newNode.next = current;
            previous.next = newNode;
        }
        this.length += 1;
        return true;
    }

    // 3. indexOf(data)方法 返回元素的位置
    indexOf(data) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    // 4. removeAt(position) 在链表指定位置移除元素
    removeAt(position) {
        let index = 0;
        let current = this.head;
        let previous = null;
        if (position >= 0 && position <= this.length - 1) {
            if (position === 0) {
                this.head = current.next;
            } else {
                while (index < position) {
                    previous = current;
                    current = current.next;
                    index++
                }
                previous.next = current.next;
            }
            this.length--;
            return current.data;
        }
        return false;
    }

    // 5. remove(data), 删除指定列表中指定元素
    remove(data) {
        let number = this.indexOf(data);
        return this.removeAt(number);
    }

    // 6. 把LinkedList对象转换成一个字符串
    toString() {
        let current = this.head;
        let string = "";
        while (current) {
            string += current.data + (current.next ? ' ' : '');
            current = current.next;
        }
        return string;
    }

    // 7. getHead(),返回头部元素
    getHead() {
        return this.head;
    }

    // 8. isEmpty(),是否为空
    isEmpty() {
        return this.length === 0 ? true : false;
    }

    // 9. size,返回链表的长度
    size() {
        return this.length;
    }
}

// 将类导出
exports.LinkedList = LinkedList;

```

###### 5.2.4 创建hashTable，并导入链表类

```javascript
// 将类导入
const ABC = require('./04LinkedList');

// 定义一个辅助类
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.toString = function () {
            return "[" + this.key + "->" + this.value + "]"
        }
    }
}

class HashTable {
    constructor(count, limit) {
        this.storage = [];  // 定义数组
        this.count = count; // 当前表中的数据量
        this.limit = limit; // 数组的长度
    }

    /**
     * 定义哈希函数
     * @param str
     * @param size
     * @returns {number}
     */
    hashHandler(str) {
        // 1. 定义hashCode变量
        let hashCode = 0;
        // 2. 霍纳算法，计算hashCode值
        for (let strKey in str) {
            hashCode = 37 * hashCode + str.charCodeAt(strKey);
        }
        // 3. 取余操作
        let index = hashCode % 37;
        return index;
    }

    /**
     * 插入和修改操作
     * @param key
     * @param value
     */
    put(key, value) {
        // 1. 根据key获取对应的index
        let index = this.hashHandler(key);
        // 2. 验证要加入新元素的位置是否已经被占据
        let bucket = this.storage[index];
        if (bucket === undefined) {
            // 2.1 表明hash表不存在该bucket
            this.storage[index] = new ABC.LinkedList();
        }
        // 2.2 表明hash表存在该bucket,往对应的链表中append元素
        let pair = new ValuePair(key, value);
        this.storage[index].append(pair);
        this.count += 1;
    }

    /**
     * 用来获取特定值的get方法
     * @param key
     */
    get(key) {
        let index = this.hashHandler(key);
        if (this.storage[index] !== undefined) {
            //遍历链表来寻找键/值
            // 1.1 获取链表表头的引用
            let current = this.storage[index].getHead();
            while (current) {
                // 1.2 如果key 值相同，就返回Node的值(行{7});
                if (current.data.key === key) {
                    return current.data.value;
                }
                // 1.3 如果不相同，就继续遍历链表，访问下一个节点
                current = current.next;
            }
            // 1.4 没有找到返回undefined
            return undefined;
        }
    }

    remove(key) {
        let index = this.hashHandler(key);
        let linkedList = this.storage[index];
        if (linkedList !== undefined) {
            let current = linkedList.getHead();
            while (current) {
                if (current.data.key === key) {
                    // 调用链表删除元素的方法
                    linkedList.remove(current.data);
                    // 进行一步额外的验证:如果链表为空
                    if (linkedList.isEmpty()) {
                        linkedList = undefined;
                    }
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    }
}

const hash = new HashTable(0, 1031);
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');

console.log(hash.get("Tyrion"));
console.log(hash.storage);
console.log("++++++++++++++++");
console.log(hash.remove("Jonathan"));
console.log("==============");
console.log(hash.storage);

```

###### 5.2.5 哈希表的扩容

![image-20200527235422512](/Users/masterxl/Library/Application Support/typora-user-images/image-20200527235422512.png)

5.2.6 hash表解决冲突的方法

- 分离链接法(拉链法)
- 线性探查
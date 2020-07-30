

#### 1.手动实现new方法(ES5)

new 操作符创建对象执行的过程：

- 创建一个空对象
- 将该对象链接到原型（执行`[[Prototype]]`（也就是`__proto__`））
- 生成的新对象会绑定到函数调用的this（通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。）
- 将新对象返回

```js
function Create(){
  // 1. 创建空对象
  let obj = new Object();
  // 1.1. 获取构造函数(因为构造函数是第一个参数，arguments里面的其余的参数就是构造函数的参数)
  let Construtor = [].shift.call(arguments);
  // 1.2 获取构造函数的参数
  let params = arguments;
  // 2. 链接到原型
  obj.__proto__ = Construtor.prototype;
  // 3. 绑定this
 	const result =  Construtor.apply(obj,params);
  // 4. 返回新对象(如果返回值是一个对象就返回该对象，否则返回构造函数的一个实例对象)
  return typeof result === "object" ? result : obj;
}
```

举栗子

```js
function Person(name) {
    this.name = name;
}

let person1 = new Person("kobe");
console.log(person1); //Person { name: 'kobe' }

let person2 = Create(Person, "jordan");
console.log(person2); // Person { name: 'jordan' }
```

#### 2.手动实现Object.create() (ES5)

功能：==Create方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`==

​		也即生成一个实例，这个实例的原型具体由传进来的proto指定，但它的构造函数F会被隐藏。

实质：应用new会设置__proto__链接的原理

语法：Object.create(proto[, propertiesObject])

实现：

```js
// 应用new会设置__proto__链接的原理
if(typeof Object.create !== "function"){
    Object.create = function(proto){
        // 1. 创建一个隐藏函数
        function F(){};
        // 2. 函数的原型设置为参数传进来的原型
        F.prototype = proto;
        // 3. 返回一个F函数的实例，即此实例的__proto__指向为参数proto
        return new F()
    }
}
```

##### 2.1 应用 使用Object.create实现类式继承

```js
// 父类
function Person(name, sex) {
    this.name = name;
    this.sex = sex;
}
Person.prototype.getInfo = function () {
    console.log('getInfo: [name:' + this.name + ', sex:' + this.sex + ']');
}
// 子类
function Student(name, sex, age) {
    Person.call(this, name, sex);
    this.age = age;
}
// 子类续承父类 原型链拼接
Student.prototype = Object.create(Person.prototype);
// ===================相当于执行======================
// Student.prototype = new Person();
// Student.prototype.__proto__ === Person.prototype
// 构造函数弯了，纠正
Student.prototype.constructor = Student;
Student.prototype.getInfo = function () {
    console.log('getInfo: [name:' + this.name + ', sex:' + this.sex + ', age:' + this.age + '].');
}
var s = new Student('kobe', 'femal', 40);
console.log(s);
s.getInfo();

console.log(Student.prototype.__proto__ === Person.prototype);
```

[outPut]

```js
Student { name: 'kobe', sex: 'femal', age: 40 }
getInfo: [name:coco, sex:femal, age:40].
true
```

#### 3. Object.setPropertyOf(ES6)

功能：设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象

语法：`Object.setPrototypeOf(obj, prototype)`

实现：

```js
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj; 
}
```

举例：

```js
// 父类
function Person(name, sex) {
    this.name = name;
    this.sex = sex;
}
// 子类
function Student(name, sex, age) {
    Person.call(this, name, sex);
    this.age = age;
}
// 1. 子类续承父类 原型链拼接
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

console.log(Student.prototype.__proto__ === Person.prototype);  			// true

function Professional(major){
    this.major = major;
}

// 2. 重新设置Student的prototype
Object.setPrototypeOf(Student.prototype,Professional.prototype);

console.log(Student.prototype.__proto__ === Person.prototype);  			// false
console.log(Student.prototype.__proto__ === Professional.prototype);  // true
```

##### 3.1 **Object.getPrototypeOf()**

**Object.getPrototypeOf()**` 方法返回指定对象的原型（内部`[[Prototype]]`属性的值）。

#### 4.构造函数、原型对象和实例之间的关系(ES5)

##### 4.1 ES5的继承

```js
function Animal() { }
// 构造器
Animal.prototype.constructor === Animal;					// true
Animal.__proto__ === Function.prototype;					// true
Function.prototype.__proto__ === Object.prototype;// true
Object.prototype.__proto__ === null;							// true

// 实例
let dog = new Animal();
dog.__proto__ === Animal.prototype;								// true
Animal.prototype.__proto__ === Object.prototype;	// true
Object.prototype.__proto__ === null;							// true
```

<img src="https://user-gold-cdn.xitu.io/2019/2/18/169014cf74620047?imageslim" alt="img" style="zoom:67%;" />

##### 4.2 ES6的继承

- 使用extends关键字，

- 在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有`super`方法才能调用父类实例。
- super关键字
  - 既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。
  - 第一种情况，`super`作为函数调用时，代表父类的构造函数。
    - ES6 要求，子类的构造函数必须执行一次`super`函数。
  - 第二种情况，`super`作为对象时，
    - 在普通方法中，指向父类的原型对象；
    - 在静态方法中，指向父类。

##### 4.3 类的 prototype 属性和__proto__属性

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

实质：

```js
class A {
}

class B extends A {
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// 也即：B.prototype.__proto__ = A.prototype

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);
// 也即：B.__proto__ = A
```

举例：

```js
// ES6
class Parent{
    constructor(name){
        this.name = name;
    }
    static sayHello(){
        console.log('hello');
    }
    sayName(){
        console.log('my name is ' + this.name);
        return this.name;
    }
}
class Child extends Parent{
    constructor(name, age){
        super(name);
        this.age = age;
    }
    sayAge(){
        console.log('my age is ' + this.age);
        return this.age;
    }
}
let parent = new Parent('Parent');
let child = new Child('Child', 18);
console.log('parent: ', parent); // parent:  Parent {name: "Parent"}
Parent.sayHello(); // hello
parent.sayName(); // my name is Parent
console.log('child: ', child); // child:  Child {name: "Child", age: 18}
Child.sayHello(); // hello
child.sayName(); // my name is Child
child.sayAge(); // my age is 18
```

1.把子类构造函数(`Child`)的原型(`__proto__`)指向了父类构造函数(`Parent`)，

2.把子类实例`child`的原型对象(`Child.prototype`) 的原型(`__proto__`)指向了父类`parent`的原型对象(`Parent.prototype`)。

两条原型链

```js
// 构造器原型链
console.log(Child.__proto__ === Parent);
console.log(Parent.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null);

// 实例原型链
console.log(child.__proto__ === Child.prototype);
console.log(Child.prototype.__proto__ === Parent.prototype);
console.log(Parent.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null);
// 输出
// 均为 true
```

<img src="https://user-gold-cdn.xitu.io/2019/2/17/168fb9a3828f9cb4?imageslim" alt="img" style="zoom:67%;" />

#### 5. 检测对象类型

##### 5.1 typeof 

​	检测基本数据类型

```javascript
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof 123);
console.log(typeof 'abc');
console.log(typeof [1, 2, 3]);
console.log(typeof {});
console.log(typeof function(){});

// undefined
// object
// number
// string
// object
// object
// function
```

缺点: 对于object类型(如数组 ，对象)无法检测出

##### 5.2 instanceof

- instanceof操作符会返回一个Boolean值，==指出对象是否是特定类的一个实例==
- 用法一：<font color=red>obj instanceof Object 检测Object.prototype是否存在于参数obj的原型链上。</font>
- 用法二：<font color=red>继承中判断实例是否属于它的父类</font>
  ==Student和Person都在stu的原型链中==

```javascript
function Person() { };
let person = new Person();

console.log(person instanceof Person);  // true

function Student() { };
Student.prototype = new Person();

let stu = new Student();
console.log(stu instanceof Person);     // true
console.log(stu instanceof Person);     // true
```

##### 5.3 Object.prototype.toString.call()

​	检测对象类型

object.prototype.toString可以精准判断变量类型

```js
// return "[object classType]"
console.log(Object.prototype.toString.call(undefined));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(123));
console.log(Object.prototype.toString.call('abc'));
console.log(Object.prototype.toString.call([1, 2, 3]));
console.log(Object.prototype.toString.call({}));
console.log(Object.prototype.toString.call(function () { }));
console.log(Object.prototype.toString.call(Math));

console.log(Object.prototype.toString.call(Array));
console.log(Object.prototype.toString.call(Object));

// [object Undefined]
// [object Null]
// [object Number]
// [object String]
// [object Array]
// [object Object]
// [object Function]
// [object Math]
// [object Function]
// [object Function]
```

#### 6.call/apply/bind实现

[参考链接1](https://blog.csdn.net/u010377383/article/details/80646415)

[参考链接2](https://blog.csdn.net/wexin_37276427/article/details/83049980)

call方法实现

```js
function add(c, d) {
  return this.a + this.b + c + d;
}

const obj = { a: 1, b: 2 };

console.error(add.call(obj, 3, 4)); // 10

```

等价于

```js
const o = {
  a: 1,
  b: 2,
  add: function(c, d) {
    return this.a + this.b + c + d
  }
};
```

```js
// 1. 将函数设为对象的属性
 o.fn = bar
// 2. 执行该函数
 o.fn()
// 3. 删除该函数
 delete o.fn
```

```javascript
/**
 * call方法 call(this,arg1,arg2,arg3)
 */
Function.prototype.fakeCall = function (context) {
  context = context || window;
  let args = [...arguments].slice(1);
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
}
console.log(add.fakeCall(obj, 3, 4));
console.log(add.call(obj, 3, 4));
```

apply方法

apply和call区别在于apply第二个参数是==Array==，而call是将一个个传入

```js
/**
 * apply方法 apply(this,[arg1,arg2,arg3])
 */
Function.prototype.fakeApply = function (context) {
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}
function add(c, d) {
  return this.a + this.b + c + d;
}
const obj = {
  a: 1,
  b: 2
}

console.log("*********************")
console.log(add.fakeApply(obj, [3, 4]));
console.log(add.apply(obj, [3, 4]));
```

bind方法实现

```js
/*
bind() 方法会创建一个新函数。
当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
之后的一序列参数将会在传递的实参前传入作为它的参数。
*/
Function.prototype.fakeBind = function (context) {
  if (Object.prototype.toString.call(this) !== '[object Function]') {
    throw new TypeError("Invalid Invoked")
  }
  let args = [...arguments].slice(1);
  let self = this;
  return function F(...newArgs) {
    if (this instanceof F) {
      return new self(...args, ...newArgs);
    } else {
      return self.apply(context, args.concat(newArgs))
    }
  }
}

function parent(sex) {
  console.log(sex);
  console.log(this.name);

}
let Son = {
  name: 'zhangsan'
}
let son = parent.fakeBind(Son, '男');
son();
```

#### 7. instanceof实现

**`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
// instanceof 用于检测构造函数的prototype属性是否存在于某个实例对象的原型链上
function fakeInstanceOf(left, right) {
  let proto = right.prototype;
  left = left.__proto__;
  while (true) {
    if (left === null) return false;
    if (left === proto) return true;
    left = left.__proto__;
  }
}

class People {
  constructor(name) {
    this.name = name;
  }
}
const p1 = new People("zs");
console.log(fakeInstanceOf(p1, People))
console.log(fakeInstanceOf(p1, Object))
```

##### 7.1 Object.getPropertyOf()

该方法返回指定对象的原型对象(内部[[Property]])属性的值。

```js
function instaceOf(left, right) {
    let proto = Object.getPrototypeOf(left);
    while (true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

function Person() {
};
let p1 = new Person();
console.log(instaceOf(p1, Person)); // true
console.log(instaceOf(p1, Object)); // true
console.log(instaceOf(p1, Array));  // false
```

#### 8.防抖与节流函数

**函数节流（throttle）**与 **函数防抖（debounce）**都是为了限制函数的执行频次，以优化函数触发频率过高带来的性能损耗。

**1、函数防抖(debounce)**

- 实现方式：每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法
- 缺点：如果事件在规定的时间间隔内被不断的触发，则调用方法会被不断的延迟

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200716224427543.png" alt="image-20200716224427543" style="zoom: 50%;" />

防抖函数的核心思路如下：

当触发一个函数时，并不会立即执行这个函数，而是会延迟（通过定时器来延迟函数的执行）

- 如果在延迟时间内，有重新触发函数，那么取消上一次的函数执行（取消定时器）；

- 如果在延迟时间内，没有重新触发函数，那么这个函数就正常执行（执行传入的函数）；

版本一：原始版

```js
    function debounce(fn, delay) {
        let timer = null;
        return function () {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn();
            }, delay);
        }
    }
```

版本二、优化参数和this

```js
    function debounce(fn, delay) {
        let timer = null;
       	return function () {
            if (timer) clearTimeout(timer);
            let _this = this;
            let args = [...arguments];
            timer = setTimeout(() => {
                fn.apply(_this, args);
            }, delay);
        }

    }
```

版本三 优化取消功能

有时候，在等待执行的过程中，可能需要取消之前的操作：

- 比如用户进行了搜索，但是还没有来得及发送搜索的情况下，退出了界面；
- 当用户退出时，之前的操作就可以取消掉；

```js
    function debounce(fn, delay) {
        let timer = null;
        let handleFn = function () {
            if (timer) clearTimeout(timer);
            let _this = this;
            let args = [...arguments];
            timer = setTimeout(() => {
                fn.apply(_this, args);
            }, delay);
        }
        // 取消处理
        handleFn.cancel = function () {
            if (timer) clearTimeout(timer)
        };
        return handleFn;

    }
```

版本四、优化返回值

```js
    function _debounce(fn, delay, option) {
        let result = option.result || null;
        let timer = null;
        let handleFn = function () {
            if (timer) clearTimeout(timer);
            let _this = this;
            let args = [...arguments];
            timer = setTimeout(() => {
                // fn.apply(_this, args);
                callFn(_this, args)
            }, delay);
        };

        function callFn(context, arguments) {
            let res = fn.apply(context, arguments);
            // console.log(arguments);
            if (result) {
                result(res);
            }
        }

        // 取消处理
        handleFn.cancel = function () {
            if (timer) clearTimeout(timer)
        };
        return handleFn;
    }
```

完整版

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<input type="text" class="search"/>
<br>
<button class="cancel-btn">取消</button>
<script>
    // 版本4 回调函数版
    function _debounce(fn, delay, option) {
        let result = option.result || null;
        let timer = null;
        let handleFn = function () {
            if (timer) clearTimeout(timer);
            let _this = this;
            let args = [...arguments];
            timer = setTimeout(() => {
                // fn.apply(_this, args);
                callFn(_this, args)
            }, delay);
        };

        function callFn(context, arguments) {
            let res = fn.apply(context, arguments);
            // console.log(arguments);
            if (result) {
                result(res);
            }
        }

        // 取消处理
        handleFn.cancel = function () {
            if (timer) clearTimeout(timer)
        };
        return handleFn;
    }

    // 绑定oninput
    // 在用户输入时触发，它是在元素值发生变化时立即触发；实时触发

    // 1.获取输入框
    let search = document.querySelector(".search");

    // 2.监听输入内容,发送ajax请求
    // 2.1.定义一个监听函数
    let counter = 0;
    function searchChange(e) {
        counter++;
        console.log("发送" + counter + "网络请求");
        return 123 + parseInt(e.target.value);
    }

    // 对searchChange处理
    let option = {
        result(data) {
            console.log("=====");
            console.log(data);
        }
    };
    let _searchChange = _debounce(searchChange, 1000, option);

    // 绑定oninput
    search.oninput = _searchChange;

    // 3.取消事件
    let cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.onclick = function (event) {
        _searchChange.cancel();
    }

</script>

</body>
</html>
```

**2、函数节流(throttle)**

- 实现方式：每次触发事件时，如果当前有等待执行的延时函数，则直接return

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200716224541494.png" alt="image-20200716224541494" style="zoom:50%;" />

```js
function throttle(fn, delay) {
    let flag = true;
  	// 1、通过闭包保存一个标记
    return function () {
    // 2.1 在函数开头判断标记是否为true，不为true则return
        if (!flag) return;
      // 2.2 立即设置为false
        flag = false;
      // 3.0 将外部传入的函数的执行放在setTimeout中
        setTimeout(() => {
        //3.1 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
        //3.2 当定时器没有执行的时候标记永远是false，在开头被return掉
            fn.apply(this, arguments);
            flag = true;
        }, delay)
    }
}
```

**3、二者区别**：

- 函数节流不管事件触发有多频繁，都会保证==在规定时间内一定会执行一次真正的事件处理函数==

- 而函数防抖==只是在最后一次事件后才触发一次函数==。
-  比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。

#### 9.函数柯里化

[参考链接](https://blog.csdn.net/shunfa888/article/details/80013170)

核心思想: 柯里化是一种将==使用多个参数==的**一个函数**转换成==一系列使用一个参数==的函数的技术。

关键点：柯里化后的函数在**<u>传入参数未达到柯里化前的个数时候我们不能返回值</u>**，<u>**应该返回函数让它继续执行**</u>

```js
let curry = function (fn, ...args) {
    let all = args || [];
    let len = fn.length;
    return function (...rest) {
        let _args = all.concat();
        _args.push(...rest);
        if (_args.length < len) {
            return curry.call(this, fn, ..._args);
        } else {
            return fn.apply(this, _args);
        }
    }
}

let test = curry((a, b, c, d) => console.log(a + b + c + d));
test(1)(2)(3)(4);
test(1,2)(3)(4);
test(1,2,3)(4);
test(1,2,3,4);
// 10
// 10
// 10
// 10
```

#### 10.对象深拷贝

```js
function deepClone(origin, target) {
    target = target || {};
    for (let prop in origin) {
        debugger;
        if (origin.hasOwnProperty(prop)) {
            if (typeof origin[prop] === 'object') {
                if (Object.prototype.toString.call(origin[prop]) === '[object Array]') {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                }
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}

var a = {
    name: "xl",
    age: 12,
    school: ['sh', 'bj'],
    face: {
        aa: "handsome",
        bb: ['surprise', 'amazing']
    }
};

let b  = deepClone(a)
console.log(b);
```

#### 11.Promise

- Promise新建之后立即执行。`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行。
- 立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是==晚于本轮循环的同步任务==。
- `reject()`方法的作用，等同于抛出错误。

- 如果调用`resolve`函数和`reject`函数时带有参数，那么它们的参数会被传递给回调函数
  - `reject`函数的参数通常是`Error`对象的实例，表示抛出的错误；
  - `resolve`函数的参数除了正常的值以外，还可能是另一个 Promise 实例

```js
const p1 = new Promise((resolve, reject) => {
    // ...
})

const p2 = new Promise((resolve, reject) => {
    resolve(p1)
})
```

> 注意，这时`p1`的状态就会传递给`p2`，也就是说，`p1`的状态决定了`p2`的状态。
>
> 如果`p1`的状态是`pending`，那么`p2`的回调函数就会等待`p1`的状态改变；
>
> 如果`p1`的状态已经是`resolved`或者`rejected`，那么`p2`的回调函数	将会立刻执行

##### 11.1 Promise.prototype.then

- Promise 实例具有`then`方法，也就是说，`then`方法是定义在原型对象
- 作用：==为 Promise 实例添加状态改变时的回调函数==
  - 第一个参数是`resolved`状态的回调函数，
  - 第二个参数（可选）是`rejected`状态的回调函数。

- 返回值：一个新的Promise实例(注意，不是原来那个`Promise`实例)，因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。
- 一般来说，不要在`then()`方法里面定义 Reject 状态的回调函数（即`then`的第二个参数），总是使用`catch`方法。

##### 11.2 promise.all

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

- `Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例;

  如果不是，就会先调用`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。

- `Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

  - 只有`p1`、`p2`、`p3`的状态<u>都变成`fulfilled`，`p`的状态才会变成`fulfilled`</u>，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
  - 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，<u>此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。</u>

##### 11.3 promise.race()

```js
const p = Promise.race([p1, p2, p3]);
```

​		上面代码中，只要`p1`、`p2`、`p3`之中<u>有一个实例率先改变状态</u>，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

​		`Promise.race()`方法的参数与`Promise.all()`方法一样，==如果不是 Promise 实例==，就会先调 `Promise.resolve()`方法，将参数转为 Promise 实例，再进一步处理。

##### 11.4 promise.allSettled()

​	有时候，==我们不关心异步操作的结果，只关心这些操作有没有结束==。这时，`Promise.allSettled()`方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。`Promise.all()`方法无法做到这一点。

##### 11.5 promise.resolve()

作用：将现有对象转为 Promise 对象

`Promise.resolve`方法的参数分成四种情况。

(1)**参数是一个 Promise 实例**

如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

(2)**参数是一个`thenable`对象**

`thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

`Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

(3)**参数不是具有`then`方法的对象，或根本就不是对象**

如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`

```js
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
```

(4)不带任何参数

`Promise.resolve()`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve()`方法。

需要注意的是，立即`resolve()`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

```js
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');
```

#### 12.数组flat实现

[参考l链接](https://juejin.im/post/5dff18a4e51d455804256d31#heading-8)

实现思路：

1.遍历数组  

- forEach
- map
- Reduce
- for in
- for of

2.判断当前元素是否是数组

- Array.isArray() `Array.isArray(arr)` 

```js
let arr = [1,2,3];
console.log(Array.isArray(arr)) // true
```

- Instanceof  `arr instanceof Array`

```js
let arr = [1,2,3];
console.log(arr instanceof Array) // true
```

- Object.prototype.toString.call(arr) === `'[object Array]'`

```js
let arr = [1,2,3];
console.log(Object.prototype.toString.call(arr) === '[object Array]'); //true
```

- constructor   

  - 实例对象的构造函数属性执行的是构造函数

  `arr.constructor === Array`   

```js
let arr = [1,2,3];
console.log(arr.constructor === Array); //true
```

3.数组展开一层

【测试数组】

```js
const arr = [1, 2, 3, 4, ['a', 'b', 'c', ['A', 'B', 'C', ['one', 'two', 'three']]], 5, "string", {name: "弹铁蛋同学"}];

```

##### 12.1 concat + Array.isArray + recursive

```js
function arrFlat(arr) {
    let arrResult = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            arrResult = arrResult.concat(arguments.callee(item));
            // arrResult = arrResult.concat(...arguments.callee(item))
        } else {
            arrResult.push(item)
        }
    });
    return arrResult;
}
```

##### 12.2 用 reduce + concat + Array.isArray + recursive

```js
const flat2 = (arr) => {
    return arr.reduce((prev, current) => {
        return prev.concat(Array.isArray(current) ? flat2(current) : current);
    }, [])
};
```

##### 12.3 无递归数组扁平化，使用堆栈结构

```js
function flat3(arr) {
    const result = [];
    const stack = [].concat(arr);  // 将数组元素拷贝至栈，直接赋值会改变原数组
    //如果栈不为空，则循环遍历
    while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next); //如果是数组再次入栈，并且展开了一层
        } else {
            result.unshift(next); //如果不是数组就将其取出来放入结果数组中
        }
    }
    return result;
}
```

##### 12.4 reduce + Array.isArray + concat + recursive

```js
function flatDeep(arr, num = 1) {
    return num > 0 ? arr.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? flatDeep(curr, num - 1) : curr), []) : arr.slice();
}
```

##### 12.5 正则表达式 + JSON.parse/JSON.stringify()

```js
function flatten(arr) {
    let arrTostr = JSON.stringify(arr).replace(/\[|\]/g, '');
    arrTostr = `[${arrTostr}]`;
    return JSON.parse(arrTostr);
}
```

#### 13.数组去重的实现

#### 14. Promise手写

##### 14.1 预备知识

###### 14.1.1 区别函数对象和实例对象

函数对象: 	将函数作为对象使用时，简称为**函数对象**
实例对象:	 new 函数产生的对象，简称为**实例对象**	

###### 14.1.2 两种类型的回调函数

同步回调

1. 理解：立即执行，完全执行完才结束，不会放入到回调队列中
2. 例子：数组遍历相关的回调函数 /Promise 的excutor函数

```js
const arr = [1,3,5];
arr.forEach(item => console.log(item));
console.log("forEach() 后执行")
```

异步回调

1. 理解：会放入回调队列，所有同步执行完后才可能执行。
2. 例子：ajax请求、定时器、promise.then()、nextTick()等

```js
setTimeOut(()=>{
  console.log("timeout callBack()")
},0);
console.log('setTimeOut()之后');
```

###### 14.1.3 常见的内置错误

`ReferenceError`  引用变量不存在

`TypeError`			变量或参数不属于有效类型

`SyntaxError`		语法错误

`RanageError` 		数值变量或参数超出其有效范围

#### 14.2 promise解决的问题

(1) 指定回调函数的方式更加灵活

旧版：==必须在启动异步任务前指定==(启动异步任务前指定回调函数)

promise： 启动异步任务 — 返回promise对象 — 给promise对象绑定回调函数(甚至可以在异步任务结束后指定)

```js
const p = new Promise((resolve,reject)=>{  // excutor 同步回调
  //...逻辑代码
  setTimeout(()=>{
    resolve(123)
  },2000)
})
// 在启动任务后，结果处理返回前指定回调函数
p.then(onFulfilled,onRejected)   

setTimeout(()=>{
  // 在启动任务后，且在任务完成之后指定回调函数
  p.then(onFulfilled,onRejected)
},3000)
```

(2) 支持链式调用，可以解决回调地狱问题。

回调地狱: 

- 多个异步操作串联执行的 
- 后一个异常操作以前一个异步操作的结果为前提
- 每个回调异常都会处理一遍

缺点：代码水平向右扩展，不便阅读维护

#### 14.3 promise几个关键问题

##### 14.3.1 如何改变promise状态？

(1) resolve(value): 如果当前是pending就会变为resolved

(2) reject(reason): 如果当前是pending就会变为rejectd

(3) **抛出异常：如果当前是pending就会变为rejected**

```js
const p = new Promise(((resolve, reject) => {
    throw new Error('出错了...');
}));

p.then(value => {
    console.log(value);
}, reason => {
    console.log('reason', reason)
});
// reason Error: 出错了...
```

##### 14.3.2 一个promise指定多个成功/失败回调函数，都会调用吗？

==当promise**改变为对应状态时**都会调用==

```js
const p1 = new Promise(((resolve, reject) => {
    throw 3;
}));

p1.then(value => {
    console.log(value);
}, reason => {
    console.log('reason1', reason);
});
console.log('=======');
p1.then(value => {
    console.log(value);
}, reason => {
    console.log('reason2', reason);
})

// reason1 3
// reason2 3
```

14.3.3 改变promise状态和指定回调函数谁先谁后？

(1) 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再指定回调

- 常规操作 先指定回调函数 后改变状态

```js
// 常规操作 先指定回调函数 后改变状态
new Promise(((resolve, reject) => {
    setTimeout(() => {
        resolve(1);  // 后改变状态(同时指定数据)，异步执行回调函数
    }, 1000)
})).then(                 // 先指定回调函数  保存当前指定的回调函数
    value => {
    },
    reason => {
        console.log('reason1', reason);
    });
```

- 先改状态  后指定回调函数

实现方式一  在执行器 中直接调用resolve()/reject()

```js
new Promise(((resolve, reject) => {
    resolve(1); // 先改变状态(同时指定数据)
})).then(            // 后指定回调函数 异步执行回调函数
    value => {
    },
    reason => {
        console.log('reason2', reason);
    }
);
```

实现方式二  延迟更长时间才调用then()

```js
const p2 = new Promise(((resolve, reject) => {
    setTimeout(() => {
        resolve(1); // 先改变状态(同时指定数据)
    }, 1000);
}));

setTimeout(() => {
    p2.then(value => {   // 后指定回调函数 异步执行回调函数
        console.log(value);
    }, reason => {
        console.log('reason2', reason);
    })
}, 1100);

```

(2) 如何先改变状态再指定回调？

- 在执行器 中直接调用resolve()/reject()
- 延迟更长时间才调用then()

(3) 什么时候才能得到数据？

- 如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
- 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

##### 14.3.4 promise.then() 返回的新promise的结果状态由什么决定？

(1)	简单表达：由then()指定的回调函数执行的结果决定

(2)	详细表达：

​		a. 如果抛出异常，新promise变为rejected，reason为抛出的异常

​		b. 如果返回的是非promise的任意值，新promise变为resolved，value为返回的值，默认值为undefined

```js
new Promise(((resolve, reject) => {
    resolve(1);
})).then(value => {
    console.log('onFulfilled()1:', value);
    // throw 1;
    // return 2;
    return Promise.resolve(3); // Promise.resolve() Promise函数对象有resolve()方法
}, reason => {
    console.log('onRejected()1:', reason);
}).then(value => {
    console.log('onFulfilled()2:', value);
}, reason => {
    console.log('onRejected()2:', reason);
});

// onFulfilled()1: 1
// onFulfilled()2: 3
```

​		c. 如果返回的是另一个promise，此promise的结果就会成为新promise的结果


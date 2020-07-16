

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

功能：Create方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

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

instanceof 用于检测构造函数的prototype属性是否存在于某个实例对象的原型链上

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


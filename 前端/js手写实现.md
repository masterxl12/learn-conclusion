

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



#### 
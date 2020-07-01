### 	1.工厂模式

​		[参考链接](https://juejin.im/post/5b69c699e51d45348a301ef4#heading-1)

​	    工厂模式是用来创建对象的一种最常用的设计模式。我们==不暴露创建对象的具体逻辑==，而是==将逻辑封装在一个函数中==，那么这个函数就可以被视为一个工厂。工厂模式根据抽象程度的不同可以分为：`简单工厂`，`工厂方法`和`抽象工厂`。

#### 1.1 简单工厂模式

`简单工厂模式`又叫`静态工厂模式`，由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象。

```markdown
在实际的项目中，我们常常需要根据用户的权限来渲染不同的页面，高级权限的用户所拥有的页面有些是无法被低级权限的用户所查看。所以我们可以在不同权限等级用户的构造函数中，保存该用户能够看到的页面。在根据权限实例化用户。使用ES6重写简单工厂模式时，我们不再使用构造函数创建对象，而是使用class的新语法，并使用static关键字将简单工厂封装到User类的静态方法中
```

```javascript
class User {
  constructor(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }
  // 静态方法 直接在User类上调用(User.classMethod())，而不是在User类的实例上调用
  static getInstance(role) {
    switch (role) {
      case "superAdmin":
        return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] })
        break;
      case 'admin':
        return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
        break;
      case 'user':
        return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}
//调用
let superAdmin = User.getInstance('superAdmin');
let admin = User.getInstance('admin');
let normalUser = User.getInstance('user');
```

> `User`就是一个简单工厂，在该函数中有3个实例中分别对应不同的权限的用户。当我们调用工厂函数时，只需要传递`superAdmin`, `admin`, `user`这三个可选参数中的一个获取对应的实例对象。
>
> 简单工厂的优点在于，你只需要一个正确的参数，就可以获取到你所需要的对象，而无需知道其创建的具体细节。但是在函数内包含了所有对象的创建逻辑（构造函数）和判断逻辑的代码，每增加新的构造函数还需要修改判断逻辑代码。当我们的对象不是上面的3个而是30个或更多时，这个函数会成为一个庞大的超级函数，便得难以维护。**所以，简单工厂只能作用于创建的对象数量较少，对象的创建逻辑不复杂时使用**。

#### 1.2. 工厂方法模式

> 工厂方法模式的本意是将**实际创建对象的工作推迟到子类**中，这样核心类就变成了抽象类。但是在JavaScript中很难像传统面向对象那样去实现创建抽象类。所以在JavaScript中我们只需要参考它的核心思想即可。我们可以将工厂方法看作是一个实例化对象的工厂类
>
> <font color=red>虽然ES6也没有实现`abstract`，但是我们可以使用`new.target`来模拟出抽象类。`new.target`指向直接被`new`执行的构造函数，我们对`new.target`进行判断，如果指向了该类则抛出错误来使得该类成为抽象类。</font>
>
> **在简单工厂模式中，我们每添加一个构造函数需要修改两处代码。**现在我们使用工厂方法模式改造上面的代码，刚才提到，工厂方法我们只把它看作是一个实例化对象的工厂，它只做实例化对象这一件事情！

```javascript
class User {
  constructor(name = '', viewPage = []) {
    if (new.target === User) {
      throw new Error('抽象类不能实例化!')
    }
    this.name = this.name;
    this.viewPage = viewPage;
  }
}

class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage)
  }
  create(role) {
    switch (role) {
      case "superAdmin":
        return new UserFactory('超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理']);
        break;
      case "admin":
        return new UserFactory('超级管理员', ['首页', '通讯录', '发现页', '应用数据']);
        break;
      case "user":
        return new UserFactory('超级管理员', ['首页', '通讯录', '发现页']);
        break;
      default:
        break;
    }
  }
}

let user = new User('xl', ["home"]); // 报错， 核心类不能被实例化
let userFactory = new UserFactory();
let superAdmin = userFactory.create('superAdmin');
let admin = userFactory.create('admin');
let user = userFactory.create('user');
```

#### 1.3. 抽象工厂模式

> ==简单工厂模式和工厂方法模式都是直接生成实例==，但是抽象工厂模式不同，抽象工厂模式并不直接生成实例， 而是==用于`对产品类簇`的创建==。
>
> 上面例子中的`superAdmin`，`admin`，`user`三种用户角色，其中user可能是使用不同的社交媒体账户进行注册的，例如：`wechat，qq，weibo`。那么这三类社交媒体账户就是对应的类簇。
>
> <font color=red>在抽象工厂中，类簇一般用父类定义，并在父类中定义一些抽象方法，再通过抽象工厂让子类继承父类。所以，**抽象工厂其实是实现子类继承父类的方法**。</font>
>
> 上面提到的抽象方法是指声明但不能使用的方法。在其他传统面向对象的语言中常用`abstract`进行声明，但是在JavaScript中，`abstract`是属于保留字，但是我们可以通过在类的方法中抛出错误来模拟抽象类。

```javascript
function getAbstractUserFactory(type) {
  switch (type) {
    case 'wechat':
      return UserOfWechat; // WechatUserClass extends UserOfWechat
      break;
    case 'qq':
      return UserOfQq;  // QqUserClass extends UserOfQq
      break;
    case 'weibo':
      return UserOfWeibo; // WeiboUserClass extends UserOfWeibo
      break;
    default:
      throw new Error('参数错误, 可选参数:superAdmin、admin、user')
  }
}

let WechatUserClass = getAbstractUserFactory('wechat');
let QqUserClass = getAbstractUserFactory('qq');
let WeiboUserClass = getAbstractUserFactory('weibo');

let wechatUser = new WechatUserClass('微信小李');
let qqUser = new QqUserClass('QQ小李');
let weiboUser = new WeiboUserClass('微博小李');
```

#### 1.4 工厂模式总结

- 上面说到的三种工厂模式和单例模式一样，都是属于创建型的设计模式。
- `简单工厂模式`又叫静态工厂方法，==用来创建某一种产品对象的实例，用来创建单一对象==；
- `工厂方法模式`是==将创建实例推迟到子类中进行==；
- `抽象工厂模式`是==对类的工厂抽象用来创建产品类簇，不负责创建某一类产品的实例==。
- 在实际的业务中，需要根据实际的业务复杂度来选择合适的模式。对于非大型的前端应用来说，灵活使用简单工厂其实就能解决大部分问题。

### 2.单例模式

==一个类只有一个实例(创建实例的过程只执行一次)，并提供一个访问它的全局访问点==

*无论怎么new，只返回一份实例*

ES5版(构造函数的方法，闭包，立即执行函数)

```javascript

  let Resource = function (name) {
    this.name = name;
    this.instance = null;
  }
  // 构造函数的方法，实例不可调用，相当于es6中类的static方法
  Resource.getInstance = function (name) {
    // 如果不存在实例 则new一个
    if (!this.instance) {
      this.instance = new Resource(name);
    }
   // 返回实例对象
    return this.instance;
  }
  let r1 = Resource.getInstance('kobe');
  let r2 = Resource.getInstance('jordan');
  // 指向的是唯一实例化的对象
  console.log(r1 === r2); // true
```

ES6版

```javascript
class Singleton {
  constructor() {
    this.state = "hide";
    this.totalCount = 1000;
  }
  show() {
    this.state = 'show';
    this.totalCount += 100;
    console.log("登录框显示成功!")
  }
  hide() {
    this.state = 'hide';
    this.totalCount -= 100;
    console.log("登录框隐藏成功!")
  }

  // 静态方法
  static getInstance() {
    // 如果不是第一次new(instance肯定是存在的)
    if (!this.instance) {
      // 创建单例对象
      this.instance = new Singleton()
    }
    // 返回单例对象
    return this.instance
  }
}

let obj1 = Singleton.getInstance(); // 类调用静态方法
obj1.show()

let obj2 = Singleton.getInstance(); // 类调用静态方法
obj2.hide()
obj2.hide()

console.log(obj1.totalCount, obj2.totalCount) // 900 900
console.log(obj1 === obj2) // true
```

【应用举例】

应用单例提供全局访问点—==实现变量统一访问控制==

```html
<div>
  <div>采购余额:<span id="bonus">100</span>元</div>
  <div class="page a">
    部门A:
    <input type="number" name="name" />
    <button class="add">+</button>
    <button class="sub">-</button>
  </div>
  <div class="page b">
    部门B:
    <input type="number" name="name" />
    <button class="add">+</button>
    <button class="sub">-</button>
  </div>
</div>

<script>
  init();
  let bonus = document.getElementById("bonus");
  function init() {
    let a = new District('.page.a');
    let b = new District('.page.b');
  }

  function renderBonus() {
    let single = new Singleton();
    bonus.innerText = single.bonus;
  }

  function District(selector) {
    this.el = document.querySelector(selector);
    this.elInput = this.el.querySelector('input');
    this.elAdd = this.el.querySelector(".add");
    this.elSub = this.el.querySelector(".sub");

    let single = new Singleton();
    let that = this;

    this.elAdd.addEventListener('click', function () {
      single.add(that.elInput.value);
      that.elInput.value = "";
      renderBonus();
    });

    this.elSub.addEventListener('click', function () {
      single.sub(that.elInput.value);
      that.elInput.value = "";
      renderBonus();
    });
  }
  // 单例构造函数
  function Singleton() {
    if (Singleton.instance) {
      return Singleton.instance;
    } else {
      this.bonus = 100;
      Singleton.instance = this;
    }
  }

  Singleton.prototype.add = function (num) {
    this.change(num);
  }
  Singleton.prototype.sub = function (num) {
    this.change(-num);
  }
  Singleton.prototype.change = function (num) {
    if (!num) return;
    this.bonus += parseFloat(num);
  }
  var aa = new Singleton();;
  var bb = new Singleton();
  console.log(aa === bb)

</script>
```

场景例子

- 定义命名空间和实现分支型方法
- 登录框
- vuex 和 redux中的store

### 3.适配器模式

​		将一个类(对象)的接口(方法或者属性)转化成另外一个接口，以满足用户需求，使类(对象)之间接口不兼容问题通过适配器得以解决。

[参考链接1](https://segmentfault.com/a/1190000015482452)

[参考链接2](https://juejin.im/post/5ba1e579f265da0aa74f1ffa)

应用场景：

#### 3.1 异类框架/库适配

参考链接1——2.1

#### 3.2 参数适配

```javascript
const config = {
  name: "潇湘夜雨",
  pattern: "adapter",
  title: "设计模式",
  major: "frontEnd",
  salary: 20000,
  sayName: function () {
    console.log(this.name);
  }
}

class Adapter {
  constructor(param) {
    this.userInfo = {};
    for (let i in config) {
      this.userInfo[i] = param[i] || config[i];
    }
  }
  printUser() {
    console.log(this.userInfo);
  }
}

let adapterOne = new Adapter({
  salary: 30000,
  major: "Java"
});
adapterOne.printUser()
```

#### 3.3 数据适配

==通常对后端返回的数据格式适配，处理符合规则的数据格式进行展示==

如网页中有一个使用Echarts折线图对网站每周的`uv`，通常后端返回的数据格式如下所示：

```json
[
  {
    "day": "周一",
    "uv": 6300
  },
  {
    "day": "周二",
    "uv": 7100
  },  {
    "day": "周三",
    "uv": 4300
  },  {
    "day": "周四",
    "uv": 3300
  },  {
    "day": "周五",
    "uv": 8300
  },  {
    "day": "周六",
    "uv": 9300
  }, {
    "day": "周日",
    "uv": 11300
  }
]
```

Echarts需要的x轴的数据格式和坐标点的==数据格式==:

```js
["周二", "周二", "周三"， "周四"， "周五"， "周六"， "周日"] //x轴的数据

[6300, 7100, 4300, 3300, 8300, 9300, 11300] //坐标点的数据
```

使用适配器处理，返回符合规则的格式

```javascript
//x轴适配器
function echartXAxisAdapter(res) {
  return res.map(item => item.day);
}

//坐标点适配器
function echartDataAdapter(res) {
  return res.map(item => item.uv);
}
```

【总结】

- 适配器模式可以让任何两个没有关联的类一起运行。
- 适配器模式提高了类的复用。

- 适配器模式本质上是一个亡羊补牢的模式，它解决的是现存的两个接口之间不兼容的问题，
- 作为开发者，不应该在软件的初期开发阶段就使用该模式；
- 如果在设计之初我们就能够统筹的规划好接口的一致性，那么适配器就应该尽量减少使用。

### 4.装饰者模式

> 在保持现有函数及其内部代码实现不变的前提下，将新功能函数分离开来，然后将其通过与现有函数包装起来一起执行。

因此其特征主要有两点：

- 为对象添加新功能；
- 不改变其原有的结构和功能，即原有功能还继续会用，且场景不会改变。

#### 4.1 传统面向对象语言的实现方式

【思想】

- 提供一个装饰器类，要维护目标对象的一个引用，同时要实现目标类的所有接口。

- 调用方法时，先执行目标对象原有的方法，再执行自行添加的特性。

```javascript
// 传统版
var Plane = function () { };
Plane.prototype.fire = function () {
  console.log('发射普通子弹')
}

// 增加两个装饰类，导弹类和原子弹类
// 导弹类
var MissileDecorator = function (plane) {
  // 1. 维护目标对象的一个引用
  this.plane = plane;
}
MissileDecorator.prototype.fire = function () {
  // 2.1先执行目标对象原有的方法
  this.plane.fire();
  // 2.2再执行自行添加的特性
  console.log('发射导弹')
}

var plane = new Plane();
plane.fire();
var plane = new MissileDecorator(plane);
plane.fire();
```

```js
output:
// 发射普通子弹
// 发射普通子弹
// 发射导弹
```

改进版

> 当接口比较多，装饰器也比较多时，可以独立抽取一个装饰器父类，实现目标类的所有接口，再创建真正的装饰器来继承这个父类。

```js
var Plane = function () { };
Plane.prototype.fire = function () {
  console.log('发射普通子弹')
}
/**多一个飞行方法 */
Plane.prototype.fly = function () {
  console.log('空中巡航飞行');
}
/**实现所有接口的装饰器父类 */
var PlaneDecorator = function (plane) {
  this.plane = plane;
}
PlaneDecorator.prototype = {
  fire() {
    console.log('发射普通子弹')
  },
  fly() {
    console.log('空中巡航飞行');
  }
}
/**真正的装饰器 */
function Decorator(plane) {
  PlaneDecorator.call(this, plane);
}
Decorator.prototype = new PlaneDecorator();
Decorator.prototype.fire = function () {
  this.plane.fire();
  console.log("自动锁定开火...")
}

var plane = new Plane();
plane = new Decorator(plane);
plane.fire();
```

```js
output:
// 发射普通子弹
// 自动锁定开火...
```

#### 4.2 升级版装饰器模式

[参考链接1](https://www.jb51.net/article/179208.htm)

[参考链接2](https://segmentfault.com/a/1190000013664124)

升级版装饰器模式，通过为js的Function构造函数添加实例方法before和after来实现。

- Function.prototype.before和Function.prototype.after==接收一个函数作为参数==，这个函数就是新添加的函数，它装载了新添加的功能代码。

- 接下来==把当前的this保存起来==，这个this指向原函数(Function是js中所有函数的构造器，所以js中的函数都是Function的实例，Function.prototype中的this就指向该实例函数)

- 然后返回一个'代理'函数，这个代理函数只是结构上像'代理'而已，并不承担代理的职责(比如控制对象的访问)。它的工作就是把请求分别转发给新添加的函数和原函数，且负责保证它们的执行顺序，让新添加的函数在原函数之前执行(前置装饰 Function.prototype.before; 后置装饰 Function.prototype.after)，从而实现动态装饰的效果。

```js
// 新函数在原函数之前执行
Function.prototype.before = function (beforeFn) {
  // 1. 保存原函数的引用
  var self = this;
  return function () {
    // 闭包函数this指向window
    // 2.先执行新函数，且保证this不会被劫持，
    // 新函数接受的参数也会原封不动的传入原函数，
    beforeFn.apply(this, arguments);
    // 3.再执行原函数并返回原函数的执行结果，并保证this不被劫持
    return self.apply(this, arguments);
  }
}
// 新函数在原函数之后执行
Function.prototype.after = function (afterFn) {
  // 1. 保存原函数的引用
  var self = this;
  return function () {
    // 2. 返回包含了原函数和新函数的‘代理'函数

    // 先执行原函数并返回原函数的执行结果，并保证this不被劫持，
    // 原函数执行的结果会赋值给ret变量，交由'代理'函数最后return
    var ret = self.apply(this, arguments);
    // 再执行新函数，且保证this不会被劫持，新函数接受的参数也会原封不动的传入原函数 
    afterFn.apply(this, arguments);
    return ret;
  }
}

//定义原函数
var print = function(){
  console.log('打印原函数执行结果');
 }
  
 print = print.before(function(){
  console.log('打印前置装饰函数的执行结果');
 })
  
 print = print.after(function(){
  console.log('打印后置装饰函数的执行结果');
 })
 print();
```

```js
[outPut]
//打印前置装饰函数的执行结果
//打印原函数执行结果
//打印后置装饰函数的执行结果
```

【升级版改进版】

> 上例中的AOP装饰器是通过在Function.prototype上添加before和after方法实现的，但有时这种==直接污染函数原型的方法并不好==，可以做些变通，==把原函数和新函数都作为参数传入before和after方法中==

```js
var before = function (fn, beforeFn) {
  return function () {
    beforeFn.apply(this, arguments);
    return fn.apply(this.arguments);
  }
}
var after = function (fn, afterFn) {
  return function () {
    var ret = fn.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}

var print = function () {
  console.log('打印原函数执行结果');
}

print = before(print, function () {
  console.log('打印前置装饰函数的执行结果');
})

print = after(print, function () {
  console.log('打印后置装饰函数的执行结果');
})

print();
```

```js
outPut
// 打印前置装饰函数的执行结果
// 打印原函数执行结果
// 打印后置装饰函数的执行结果
```

#### 4.3 ES7的实现方式

ES7提供了一种类似的Java注解的语法糖`decorator`，来实现装饰者模式。使用起来非常简洁：

#### 4.4 应用场景

- **ES7 装饰器**

  Decorator 是 ES7 的一个新语法，正如其“装饰器”的叫法所表达的，他可以对一些对象进行装饰包装然后返回一个被包装过的对象，可以装饰的对象包括：**类，属性，方法**等。

- **mixins**

```js
function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype,...list); //给target的添加上一个或多个属性或方法
    }
}


const Foo = {
    foo(){
        console.log("foo");
    }
};

@mixins(Foo) //给MyClass 这个类添加了Foo的所有属性和方法
class MyClass {
    
}

let obj = new MyClass();
obj.foo();//控制台输出


```

- **第三方开源lib**
- **提供常用的装饰器**

### 5. 代理模式

[参考链接](https://blog.csdn.net/qq_35585701/article/details/79938315)

代理模式为一个对象提供一个代用品或者占位符，以便控制对它的访问。

代理模式的好处：对外部提供统一的接口方法，而代理类在接口中实现对真实类的附加操作行为，从而可以在不影响外部调用情况下，进行系统扩展。

#### 5.1 应用场景

- **1.保护代理**

  保护代理主要用于控制不同权限的对象对本体对象的访问权限。比如很多人想访问本体A，如果有代理B存在的话，B会首先剔除不满足A的访问条件的访问者，符合条件的才能访问。

【举例】

```js
参考链接中案例
```

- **2.HTML元 素事件代理**

  通过给父元素绑定事件，获取子元素的内容，以进行下一步操作。

```html
<ul id="#ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>

<script>
  let oUl = document.querySelector('ul');
  oUl.addEventListener("click", event => console.log(event.target))
</script>
```

- **3.缓存代理**

缓存代理可以为开销大的一些运算结果提供暂时性的存储，如果再次传进相同的参数是，直接返回结果，避免大量重复计算。

```javascript
/**创建缓存代理工厂 */
//将缓存代理与工厂模式相结合，创建多种运算的缓存代理
let mult = function () {
  let a = 1;
  for (let i = 0; i < arguments.length; i++) {
    a = a * arguments[i];
  }
  return a;
}
let plus = function () {
  let a = 0;
  for (let i = 0; i < arguments.length; i++) {
    a = a + arguments[i];
  }
  return a;
}

let cache = {}; //参数缓存列表
//高阶函数:将函数作为参数或者返回值的函数
let proxyFactory = function (fn) {
  return function () {
    let args;
    if (typeof fn === "function") {
      if (fn.name === 'mult') {
        args = Array.prototype.join.call(arguments, '*');
      } else {
        args = Array.prototype.join.call(arguments, '+');
      }
    }
    if (args in cache) {
      return cache[args];
    }
    //  key:  '1*2*3*4'
    //  value: 函数求值
    cache[args] = fn.apply(this, arguments);
    console.log(cache);
    return cache[args];
  }
}

//测试
let proxyMult = proxyFactory(mult),
  proxyPlus = proxyFactory(plus);

console.log(proxyMult(1, 2, 3, 4));
console.log(proxyMult(1, 2, 3, 4));
console.log(proxyPlus(1, 2, 3, 4));
console.log(proxyPlus(5, 6, 7, 8));
```

[outPut]

```js
{ '1*2*3*4': 24 }
24
24
{ '1*2*3*4': 24, '1+2+3+4': 10 }
10
{ '1*2*3*4': 24, '1+2+3+4': 10, '5+6+7+8': 26 }
26
```

- **4.虚拟代理**

虚拟代理是将调用本体方法的请求进行管理，等到本体适合执行时，再执行。

作用：==将开销很大的对象，延迟到真正需要它的时候再执行==。

比如：利用虚拟代理实现图片预加载功能：

```js
/**在图片预加载中实现虚拟代理 */
var myImage = (function(){
    var imageNode = document.createElement('img');
    document.body.appendChild(imageNode);
 
    return {
        setSrc: function(src){
            imageNode.src = src;
        }
    }
})()
 
//代理类
var proxyImage = (function(){
    var img = new Image();
    img.onload = function(){
        myImage.setSrc(this.src);
    }
 
    return {
        setSrc: function(src){
            myImage.setSrc('本地的图片地址');
            img.src = src; //缓存完毕之后会触发img的onload事件
        }
    }
})()
```

#### 5.2 与装饰者模式的区别

装饰者模式实现上和代理模式类似

- 装饰者模式： 扩展功能，原有功能不变且可直接使用
- 代理模式： 显示原有功能，但是经过限制之后的

### 6.外观模式

> 为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得子系统接口的访问更容易。

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200628162912108.png" alt="image-20200628162912108" style="zoom:33%;" />

#### 6.1 使用场景

1. 在设计初期，应该要有意识地将不同的两个层分离，比如经典的三层结构，在数据访问层和业务逻辑层、业务逻辑层和表示层之间建立外观Facade。
2. 在开发阶段，子系统往往因为不断的重构演化而变得越来越复杂，增加外观Facade可以提供一个简单的接口，减少他们之间的依赖。
3. 在维护一个遗留的大型系统时，可能这个系统已经很难维护了，这时候使用外观`Facade`也是非常合适的，为系统开发一个外观`Facade`类，为设计粗糙和高度复杂的遗留代码提供比较清晰的接口，让新系统和`Facade`对象交互，`Facade`与遗留代码交互所有的复杂工作。

```js
// 比如对document对象添加click事件的时候：
function addEventToDom(dom, type, fn) {
  if (dom.addEventListener) {
    // 支持DOM2级事件处理方法的浏览器
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    // 不支持DOM2级但支持attachEvent
    dom.attachEvent('on' + type, fn);
  } else {
    // 都不支持的浏览器
    dom[on + 'type'] = fn;
  }
}
```

### 7.观察者模式

[参考l链接1](https://segmentfault.com/a/1190000018706349)

[参考l链接2](https://www.cnblogs.com/leaf930814/p/9014200.html)

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200629123244925.png" alt="image-20200629123244925" style="zoom: 50%;" />

**观察者模式：观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。**

```js
// 观察者模式
// 观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，
// 所有依赖于它的对象都将得到通知，并自动更新。观察者模式属于行为型模式，
// 行为型模式关注的是对象之间的通讯，观察者模式就是观察者和被观察者之间的通讯。
function Hunter(name, level) {
  this.name = name;
  this.level = level;
  this.list = [];  // 存放订阅者
}
// 订阅功能
Hunter.prototype.subscribe = function (target, fn) {
  console.log(this.level + '猎人' + this.name + '订阅了' + target.name)
  // target 订阅的目标对象
  target.list.push(fn);
}
// 发布功能
Hunter.prototype.publish = function (money) {
  console.log(this.level + '猎人' + this.name + '寻求帮助');
  this.list.map(itemFn => { // 每一项fn
    itemFn(money);
  })
}
// 定义猎人
let hunterMing = new Hunter('明', '知府');
let hunterLiang = new Hunter('亮', '衙役');
let hunterFei = new Hunter('飞', '富商');
let hunterPeter = new Hunter('皮特', '贫农');

// 观察者订阅任务
// 猎人们(观察者)关联他们感兴趣的猎人(目标对象)，
// 如Peter，当Peter有困难时，会自动通知给他们（观察者）

hunterMing.subscribe(hunterPeter, function (money) {
  console.log('明表示: ' + (money > 500 ? '' : '不') + '给与帮助');
})

hunterLiang.subscribe(hunterPeter, function (money) {
  console.log('亮表示: 给与帮助');
})

hunterFei.subscribe(hunterPeter, function (money) {
  console.log('飞表示: 给与帮助');
})

// 发布者发布任务
hunterPeter.publish(300)
```

### 8.发布/订阅模式

**发布订阅模式：订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到==调度中心==（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是==该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码==。**

```js
//定义一家猎人工会
//主要功能包括任务发布大厅(topics)，以及订阅任务(subscribe)，发布任务(publish)
let HunterUnion = {
  type: 'hunt',
  topics: Object.create(null),      // 任务发布大厅(topics)
  subscribe: function (topic, fn) { // 以及订阅任务(subscribe)
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(fn);
  },
  publish: function (topic, money) { // 发布任务(publish)
    if (!this.topics[topic]) return;
    this.topics[topic].map(itemFn => itemFn(money));
  }
}

//定义一个猎人类
//包括姓名，级别
function Hunter(name, level) {
  this.name = name
  this.level = level
}
//猎人可在猎人工会发布订阅任务
Hunter.prototype.subscribe = function (topic, fn) {
  console.log(`${this.level}猎人${this.name}订阅了狩猎${topic}的任务...`)
  HunterUnion.subscribe(topic, fn);
}
Hunter.prototype.publish = function (topic, money) {
  console.log(`${this.level}猎人${this.name}发不了狩猎${topic}的任务...`)
  HunterUnion.publish(topic, money);
}
//猎人工会走来了几个猎人
let hunterMing = new Hunter('小明', '黄金')
let hunterJin = new Hunter('小金', '白银')
let hunterZhang = new Hunter('小张', '黄金')
let hunterPeter = new Hunter('Peter', '青铜')

//小明，小金，小张分别订阅了狩猎tiger的任务
hunterMing.subscribe('tiger', function (money) {
  console.log('小明表示：' + (money > 200 ? '' : '不') + '接取任务')
})
hunterJin.subscribe('tiger', function (money) {
  console.log('小金表示：接取任务')
})
hunterZhang.subscribe('tiger', function (money) {
  console.log('小张表示：接取任务')
})
//Peter订阅了狩猎sheep的任务
hunterPeter.subscribe('sheep', function (money) {
  console.log('Peter表示：接取任务')
})

//Peter发布了狩猎tiger的任务
hunterPeter.publish('tiger', 198)

console.log(HunterUnion.topics)
//猎人们发布(发布者)或订阅(观察者/订阅者)任务都是通过猎人工会(调度中心)关联起来的，他们没有直接的交流。

```

[outPut]输出

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200629125705971.png" alt="image-20200629125705971" style="zoom: 50%;" />

观察者模式与发布/订阅模式的区别:

​    1、在观察者模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录。然而，在发布订阅模式中，==发布者和订阅者不知道对方的存在==。==它们只有通过消息代理进行通信==。

​    2、==在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反==。 观察者模式由具体目标调度，每个被订阅的目标里面都需要有对观察者的处理，这种处理方式比较直接粗暴，但是会造成代码的冗余。

​	3、而发布订阅模式中统一由调度中心进行处理，订阅者和发布者互不干扰，消除了发布者和订阅者之间的依赖。这样一方面实现了解耦，还有就是可以实现更细粒度的一些控制。比如发布者发布了很多消息，但是不想所有的订阅者都接收到，就可以在调度中心做一些处理，类似于权限控制之类的。还可以做一些节流操作。

​	4、==观察者模式大多数时候是同步的==，比如当事件触发，Subject就会去调用观察者的方法。==而发布-订阅模式大多数时候是异步的==（使用消息队列）。

### 9.状态模式

[参考l链接](https://segmentfault.com/a/1190000012506631)

#### 9.1 概述

==状态模式:对象行为是基于状态改变的。==

当一个对象的内部状态发生改变时，会导致其行为的改变，这看起来像是改变对象。

**解决的问题**

主要解决的是当控制一个对象状态转换的条件表达式过于复杂时的情况。

把状态的判断逻辑转移到表示不同的一系列类当中，可以把复杂的逻辑判断简单化。

【举例】

```js
const superMarry = (function () {
  // 1. 内部状态私有变量
  let currentState = {};
  // 2. 动作与状态方法映射
  let states = {
    jump() {
      console.log('jump跳跃');
    },
    move() {
      console.log('move移动');
    },
    shoot() {
      console.log('shoot射击');
    },
    squat() {
      console.log('suqat蹲下')
    }
  };
  // 3. 定义动作控制类
  const Action = {
    // 3.1 更改当前动作 有可能是组合动作
    changeState(...action) {
      // 3.2 重置内部状态
      currentState = {};
      // 内部状态中添加动作
      action.map(item => currentState[item] = true);
      // 返回动作控制类
      return this;
    },
    // 3.3 执行动作
    doAction() {
      // 3.4 遍历内部状态保留的动作
      console.log("******执行动作start*********")
      for (let actionItem in currentState) {
        states[actionItem] && states[actionItem]()
      }
      console.log("******执行动作end*********");
      return this;
    }
  }
  // 4. 返回接口方法 change doAction
  return {
    change: Action.changeState,
    goes: Action.doAction
  }
})();
superMarry
  .change('jump', 'shoot')
  .goes()
  .goes()
  .change('move')
  .goes()
```

**状态模式的最终目的:==简化分支判断流程==。将每个分支转化为一种状态独立出来，方便每种状态的管理又不至于每次执行时遍历所有分支。在程序中到底产出哪种行为结果，决定于选择哪种状态，而选择何种状态又是在程序运行时决定的。**

#### 9.2 应用场景: 

**状态模式的使用场景也特别明确，有如下两点：**

一个对象的行为取决于它的状态，并且它必须在运行时刻根据状态改变它的行为。

一个操作中含有大量的分支语句，而且这些分支语句依赖于该对象的状态。状态通常为一个或多个枚举常量的表示。

`Promise`

### 10.策略模式

[参考链接1](https://www.jianshu.com/p/a66144647634)

[参考链接2](https://juejin.im/post/5b90bb20e51d450e5519c2c7#heading-4)

策略模式的目的：**将算法的使用和算法的实现分离开来**。

策略模式指的是定义一系列的算法，把它们一个个封装起来，将不变的部分和变化的部分隔开，实际就是将算法的使用和实现分离出来。

一个基于策略模式的程序至少由2部分组成。

第一部分:	是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。

第二部分:	环境类Context，该Context接收客户端的请求，随后把请求委托给某一个策略类。

```js
// 建立一个年终绩效考核策略 
const obj = {
  perfect: function (salary) {
    return salary * 4;
  },
  better: function (salary) {
    return salary * 3;
  },
  good: function (salary) {
    return salary * 2;
  },
  hard: function (salary) {
    return salary / 2;
  }
};

let calculateBonus = function (level, salary) {
  return obj[level](salary);
}

console.log(calculateBonus('better', 16000)) // 48000;
```



应用场景:  表单验证

表单检验是非常常见的功能。因为涉及到大量的验证规则，使用策略模式会非常便利。


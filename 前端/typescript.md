安装TypeScript

```js
npm install -g typescript
```

执行编译z

```js
tsc hello.ts
```

Vscode 将ts代码转换成js代码

第一步：

```javascript
tsc --init 生成 tsconfig.json 改 “outDir”:"./js"
```

第二步

```javascript
终端--> 运行任务 -->  监视tsconfig.json
```



ES6的继承机制：

​		实质是将父类实例对象的属性和方法，加到`this`上面（==**所以必须先调用`super`方法**==），然后再用子类的构造函数修改`this`。

​		【注】在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有`super`方法才能调用父类实例。

<font color="red">`Object.getPrototypeOf`方法可以用来从子类上获取父类。</font>

因此，可以使用这个方法判断，一个类是否继承了另一个类。



super关键字

- 如果`super`作为对象，用在静态方法之中，这时`super`将指向父类，而不是父类的原型对象。

`super`在静态方法之中指向父类，在普通方法之中指向父类的原型对象。



非空断言操作符`!`

​		在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是非 null 和非undefined 类型。**具体而言，`x!` 将从 x 值域中排除 `null` 和 `undefined` 。**



#### 1. 方法的重载

##### 1.1 ts中定义方法传参

```js
// 1. ts中定义方法传参
function getInfo(name: String, age: number): String {
  return `${name}:${age}`;
}

console.log(getInfo('zs', 20));
```

##### 1.2 方法的可选参数

```js
// 2. 方法的可选参数[注：可选参数配置在参数的最后]
function getDetailInfo(name: String, age?: number): String {
  if (age) {
    return `${name}:${age}`;
  } else {
    return `${name}---"年龄保密"`;
  }
}
console.log(getDetailInfo("wangwu", 25));
```

[注：可选参数配置在参数的最后]

##### 1.3 剩余参数

```js
// 3. 剩余参数,使用数组接收参数，不确定接收参数的类型可以使用any[]
function add(...result: any[]): number {
  return result.reduce((current, item) => current + item, 0);
}

console.log(add(1, 2, 3, 4, 5));
```

##### 1.4 方法重载

1.4.1 方法重载是指在同一个类中方法同名，参数不同，调用时根据实参的形式，选择与他匹配的方法执行操作的一种技术。

①  参数的类型不同；
②  参数的个数不同；
③  参数的个数相同时他们的先后顺序不同；

1.4.2. 是否构成重载的条件：

◆ 在同一个类中；
◆ 方法名相同；
◆ 参数列表不同；

1.4.3.方法重载是多态的一种实现方式；

在JS中本身不支持重载的，而在TS中使用可以"变通"的支持重载：

1.先申明所有方法重载的定义，不包含方法的实现；

2.再声明一个参数为any类型的重载方法；

3.实现any类型的方法并通过参数类型（和返回类型）不同来实现重载

```js
// 4. 函数重载
// 4.1 先申明所有方法重载的定义，不包含方法的实现；
function sum(a: number, b: number): number;
function sum(a: String, b: String): String;
function sum(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === "number") {
    return a + b;
  } else if (typeof a === 'string' && typeof b === "string") {
    return a + "----" + b;
  }
}
console.log(sum(1, 2));
console.log(sum("a", "b"));


```


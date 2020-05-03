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



#### 1. TS中的方法

##### 1.1 ts中定义方法传参

​	需要指定参数类型和返回值类型

```js
// 1. ts中定义方法传参
function getInfo(name: String, age: number): String {
  return `${name}:${age}`;
}

console.log(getInfo('zs', 20));
```

##### 1.2 方法的可选参数

在参数后面使用`?`符号修饰 ，指定该参数是可选参数

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

1.4.3. 方法重载是多态的一种实现方式；

在JS中本身不支持重载的，而在TS中使用可以"变通"的支持重载：

1.先申明所有方法重载的定义，不包含方法的实现；

2.再声明一个参数为any类型的重载方法；

3.实现any类型的方法并通过参数类型（和返回类型）不同来实现重载

```js
// 4.  函数重载
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

#### 2.TS的类与继承

#### 3.访问修饰符

类中定义的属性和方法如果不加修饰符 默认就是公有(public)

| 访问修饰符  | 当前类内部 | 子类 | 当前类外部 |
| ----------- | ---------- | ---- | ---------- |
| `public`    | ✅          | ✅    | ✅          |
| `protected` | ✅          | ✅    | ❎          |
| `private`   | ✅          | ❎    | ❎          |



```typescript
class Student {
  public name: String;
  constructor(name: String) {
    this.name = name;
  }
  getName(): String {
    return this.name;
  }
  setName(name: String): void {
    this.name = name;
  }
  protected study(): void {
    console.log(`${this.name}---well done!`)
  }

  private gender(): void {
    console.log("female");
  }
}

class MiddleStudent extends Student {
  private age: number;
  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }
  // 子类重写 父类方法
  study(): void {
  // 子类访问父类的protectd方法，编译通过
    super.study();
  // 子类访问父类的private方法,  编译不通过
  // super.gender(); 编译出错
    console.log(`${this.name}---good job!`)
  }
  sayAge(): void {
    console.log(`my age:${this.age}`);
  }
}

const s1 = new Student("wade");
console.log(s1.getName());
s1.setName("curry");
console.log(s1.getName());

const child2 = new MiddleStudent("kobe", 40);
console.log(child2.study());
console.log(child2.sayAge());

```

#### 4.多态/抽象类/抽象方法	

*多态 ，一种事物的不同表现形态。*

多态: 父类定义一个方法不去实现，让继承它的子类去实现 每一个子类有不同的表现

多态属于继承

抽象类：用abstract关键字声明的类

- 其他类继承的基类，不能直接实例化 
- 抽象类的子类必须实现抽象类中的抽象方法

抽象方法：抽象类中使用abstract关键字修饰的方法

- abstract抽象方法只能放在抽象类中

- 抽象类中的抽象方法不包含具体实现且必须在派生类中实现
- 抽象类和抽象方法用来定义标准

#### 5.接口

接口：行为和动作的规范，对批量方法进行约束

##### 5.1 属性接口

- 对批量方法传入参数进行约束
- 传入对象的约束(一般为json格式)
- **==如果单独定义对象传参，则该对象必须包含interface中定义的属性==**

```typescript
interface FullName {
  firstName: string;
  lastName: string
}

function printName(name: FullName): void {
  console.log(name.firstName + ":" + name.lastName);
}

printName({ firstName: "Michale", lastName: "Jordan" });

function printInfo(info: FullName): void {
  console.log(info.firstName + "-" + info.lastName);
}
const obj = {
  firstName: "Kobe",
  lastName: "Brown",
  age: 40,
  major: "NBA Player"
}

printInfo(obj)  // 传入的参数必须包含firstName，lastName
```

- 接口的可选属性

  案例：使用原生js封装ajax

```typescript
interface Config {
  type: string;
  url: string;
  data?: string;
  dataType: string
}

// 原生js封装ajax
function ajax(config: Config) {
  let xhr = new XMLHttpRequest();
  xhr.open(config.type, config.url, true);
  xhr.send(config.data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("success");
      if (config.dataType == "json") {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(xhr.responseText);
      }
    }
  }
}

ajax(
  {
    type: "get",
    url: "http://a.itying.com/api/productlist",
    data: "name=zs",
    dataType: 'json'
  }
)	
```

##### 5.2 函数类型接口

- 功能：对方法传入的参数以及返回值进行约束   批量约束
- 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

语法：

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

​	这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，==并将一个同类型的函数赋值给这个变量。==

```typescript
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

- 对于函数类型的类型检查来说，==函数的参数名不需要与接口里定义的名字相匹配==，只需要参数对应的位置与接口定义的参数类型一致即可。
- 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 ==如果你不想指定类型，TypeScript的类型系统会推断出参数类型==

```typescript
// 定义一个加密的函数类型接口
interface encrypt {
  (username: string, password: string): string;
}

const md5: encrypt = function (user: string, pass: string): string {
  return user + ":" + pass;
}

console.log(md5("admin", "admin123"));
```

##### 5.3 可索引接口

- 不常用

##### 5.4 类类型接口

 对类的约束，和抽象类有些类似

```typescript
// 定义接口
interface Animal {
  name: string;
  eat(): void;
}
// 类实现接口，并且定义接口中的属性，实现接口中的方法
class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(): void {
    console.log(this.name + "喜欢啃骨头");
  }
}
const littleDog = new Dog("虎子");
littleDog.eat();

class Cat implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(): void {
    console.log(this.name + "喜欢吹鱼");
  }
}

const littleCat = new Cat("小花");
littleCat.eat()
```

##### 5.5 接口扩展(接口的继承)

- 接口可以多继承，类是单继承
- 类中实现的接口，需要定义接口中的属性、实现接口中的方法

```typescript
interface Personal {
  eat(): void;
}
interface Engineer extends Personal { // 接口继承
  work(): void
}
class Programmer {
  major: string;
  name: string;
  constructor(name: string, major: string) {
    this.major = major;
    this.name = name;
  }
  codeing(): string {
    return this.name + "的职业是:" + this.major;
  }
}

class Web extends Programmer implements Engineer { // 子类继承父类并实现接口
  constructor(name: string, major: string) {
    super(name, major);
  }
  eat(): void {
    console.log(this.name + "吃水果");
  }
  work(): void {
    console.log(this.name + "喜欢codeing");
  }
}

const frontEnd = new Web("zs", 'junior web development');
console.log(frontEnd.codeing());
frontEnd.eat();
frontEnd.work();
```

#### 6. TS中的as/?/!

##### 6.1 as关键字 - 类型断言

功能：通过类型断言可以告知编译器具体的数据类型（开发者清楚地知道一个实体具有比它现有类型更确切的类型。）

使用类型断言有两种方式：

- 尖括号语法

```typescript
let someValue:any = "this is a string";
let strLength:number = (<string>someValue).length;
```

- 使用as关键字描述

```typescript
let someValue:any = "this is a string";
let strLength:number = (someValue as string).length;
```

【注】当在TypeScript里使用JSX时，只有 `as`语法断言是被允许的。

##### 6.2 ?用于属性定义

功能：表示可选参数，

- 用于接口时

```typescript
interface SquareConfig {
  color?: string; // 表示可选参数
  width?: number; // 表示可选参数
}
function createSquare(config: SquareConfig): { color: string, area: number } {
  let newSquare = { color: "red", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
```

- 用于方法时,可选参数放在参数的最后

```typescript
function getFullName(firstName: string, lastName?: string): void {
  if (lastName) {
    console.log(firstName + ":" + lastName);
  } else {
    console.log(firstName);
  }
}

getFullName("kobe")
```

##### 6.3 !非空断言操作法

! 表示非`null`和非`undefined`的类型断言

```typescript
interface Entity {
  name: string
}

function validateEntity(e?: Entity) {
  // let s = e.name;  // 如果直接使用let s = e.name;，编译器会抛出e可能不存在的错误，
  // 但是使用非空断言，则表示e肯定是存在的，从而不会产生编译问题。
  let s2 = e!.name;
}
```

#### 7. 范型T

功能：解决类、接口、方法的复用性，以及对不特定数据类型的支持

要求：返回值的类型与传入参数的类型相同

##### 7.1 范型函数

```typescript
// 范型函数
// 定义函数时：在函数名后使用范型变量"T"声明，且数/返回值使用范型变量"T"声明
function getData<T>(value: T): T {
  return value;
}
// 使用范型函数，调用时需指定范型类型
console.log(getData<number>(23));
```

##### 7.2 范型类

```typescript
// 范型类
// 定义类时，在类名后使用范型变量"T"声明
class GetMin<T>{
  public list: T[] = [];
  public add(value: T): void {
    this.list.push(value);
  }
  getMinValue(): T {
    let minValue = this.list[0];
    this.list.map(item => {
      minValue = minValue >= item ? item : minValue;
    })
    return minValue;
  }
}
// 使用范型类，在实例化时指定范型类型
const minList = new GetMin<number>();
minList.add(23);
minList.add(123);
minList.add(13);
minList.add(323);
minList.add(83);
console.log(minList.getMinValue());
```

##### 7.3 范型接口

(1) 使用含有泛型的接口来==定义函数的形状==

(2) 把泛型参数==提前到接口名上==，此时在使用泛型接口的时候，需要定义泛型的类型

```typescript
// 第一种定义范型类型方式
interface ConfigFn {
  <T>(value1: T, value2: T): T
}
const configFn: ConfigFn = <T>(var1: T, var2: T): T => var1;

// 函数调用该时指定具体的范型类型
configFn<string>("abc", "d");
// 第二种定义范型类型方式
interface MyInterface<T> {
  (value: T): T
}
let myFn: MyInterface<string>;
myFn = (value: string): string => value;
myFn('abc');
```

##### 7.4 类作为参数的范型类

把类作为参数传入到范型类（约束数据传入的类型)

- 去除重复代码

- 对不特定类型进行数据校验

![image-20200503105559080](/Users/masterxl/Library/Application Support/typora-user-images/image-20200503105559080.png)

```typescript
interface DBI<T> {
  add(info: T): boolean;
  update(info: T, id: number): boolean;
  delete(id: number): boolean;
  get(id: number): any[];
}

class MySqlDb<T> implements DBI<T> {
  add(info: T): boolean {
    console.log(info);
    return true;
  }
  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  }
  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }
  get(id: number): any[] {
    throw new Error("Method not implemented.");
  }

}

class MongoDb<T> implements DBI<T>{
  add(info: T): boolean {
    throw new Error("Method not implemented.");
  }
  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  }
  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }
  get(id: number): any[] {
    throw new Error("Method not implemented.");
  }

}

// 操作用户表，定义一个用户类和数据库映射
class User {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
// 类作为参数约束数据传入的类型
const mysqlDb = new MySqlDb<User>();
const user = new User("zs", "admin123");
// 模拟向数据库添加数据
mysqlDb.add(user);
```

 

![image-20200503113843921](/Users/masterxl/Library/Application Support/typora-user-images/image-20200503113843921.png)

```typescript

```


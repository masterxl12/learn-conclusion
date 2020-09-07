### 1 Reflect

**Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法 . 



`Reflect`不是一个函数对象，因此它是不可构造的。 

与大多数全局对象不同`Reflect`并非一个构造函数，所以不能通过[new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)对其进行调用，或者将`Reflect`对象作为一个函数来调用 .

```js
const vm = {
    msg: 'frontDevelop',
    color: "white",
    showMsg() {
        console.log(this.color)
    }
}

Reflect.ownKeys(vm);
// ["msg", "color", "showMsg", "gender"]
Reflect.has(vm,'msg');
// true
Reflect.set(vm,'gender','female');
// true
Reflect.ownKeys(vm);
// ["msg", "color", "showMsg", "gender"]
```


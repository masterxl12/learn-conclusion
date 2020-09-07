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
console.log(add.fakeCall(obj, 3, 4));
console.log(add.call(obj, 3, 4));
console.log("*********************")
console.log(add.fakeApply(obj, [3, 4]));
console.log(add.apply(obj, [3, 4]));

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

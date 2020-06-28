/*******************传统版*************************/
/*
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
*/
/*******************传统版改进*************************/
/*
var Plane = function () { };
Plane.prototype.fire = function () {
  console.log('发射普通子弹')
}
// 多一个飞行方法
Plane.prototype.fly = function () {
  console.log('空中巡航飞行');
}
// 实现所有接口的装饰器父类
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
//真正的装饰器
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
*/

/*****通过为js的Function构造函数添加实例方法before和after来实现********/
/*
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
var print = function () {
  console.log('打印原函数执行结果');
}

print = print.before(function () {
  console.log('打印前置装饰函数的执行结果');
})

print = print.after(function () {
  console.log('打印后置装饰函数的执行结果');
})
print();
*/
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
/*
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





*/

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
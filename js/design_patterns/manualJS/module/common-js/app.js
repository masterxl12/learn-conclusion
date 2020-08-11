// 将其他模块汇集到主模块
const uniq = require('uniq');

let module1 = require('./modules/module1');
let module2 = require('./modules/module2');
let module3 = require('./modules/module3');

module1.foo();
module2();
module3.foo();
module3.bar();

let arr = [1,2,3,2,3,4,5,1,3];
let result = uniq(arr);
console.log(result);
// common-js 应用在浏览器端
const uniq = require('uniq');

let module1 = require('./module1');
let module2 = require('./module2');
let module3 = require('./module3');

module1.foo();
module2();
module3.foo();
module3.bar();

let arr = [1, 2, 3, 2, 3, 4, 5, 1, 3];
let result = uniq(arr);
console.log(result);

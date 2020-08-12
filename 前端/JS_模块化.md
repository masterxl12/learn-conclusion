#### 1 CommonJS

##### 1.1 实现

​	服务器端： Node.js

​	浏览器端：Browserify.js

##### 1.2 基本语法(服务器端)

###### 1.2.1 暴露模块

- module.exports

```js
module.exports = {
    msg:"message",
    showMsg(){
        console.log("module",this.msg);
    }
}
```

- exports

```js
exports.foo = function(){
    console.log('module','foo()');
}
exports.name = 'Kobe'
```

【注意】

==不能直接将exports变量指向一个值==，因为这样==等于切断==了exports与module.exports的联系。

```js
exports = function(){ }; // 代码错误
```

###### 1.2.2 导入模块

```js
const moduleName = require("模块名/模块相对路径")
```

举例

```js
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
```

##### 1.3 module.exports与exports的区别

- **exports只是module.exports的全局引用** 
- Node为每个模块提供一个exports变量，指向module.exports。等同于

```js
let exports = module.exports;
```

- 不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。 

##### 1.4 运行在浏览器端

package.json

```json
{
  "name": "commonjs-browserify",
  "version": "1.0.0",
  "dependencies": {
    "browserify": "^16.5.2",
    "g": "^2.0.1"
  },
  "devDependencies": {
    "uniq": "^1.0.1"
  }
}

```

commonjs-browserify/src/app.js文件

```js
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
```

commonjs-browserify/dist/bundle.js

执行命令 将主文件==打包输出==到指定文件目录下

```js
browseify app.js -o dist/bundle.js
```

commonjs-browserify/index.html

==在index.html文件中引入打包的文件== 可以在浏览器端显示引入的模块

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<!--<script src="./src/app.js"></script>-->
<script src="./dist/bundle.js"></script>
</body>
</html>
```



#### 2 AMD

![1597232307025](C:\Users\ADMINI~1\AppData\Local\Temp\1597232307025.png)

专门用于浏览器端，模块的加载是异步的。依赖于`require.js`

##### 2.1 基本语法

###### 2.1.1 定义暴露模块

- 定义没有依赖的模块

```js
define(function(){
    return 模块
})
```

- 定义有依赖的模块

```js
define(['module1','module2'],function(m1,m2){
    return 模块
})
```



###### 2.1.2 引入使用模块

一般在主模块引入使用

```js
requier(['module1','module2'],function(){
    
})
```





#### 3 CMD    



#### 4 ES6

https://github.com/zxfjd3g/170816_modular








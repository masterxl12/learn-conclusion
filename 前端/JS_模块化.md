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

在浏览器端模块化开发的规范 	

专门用于浏览器端，模块的加载是异步的。依赖于`require.js`

AMD异步加载模块。它的模块支持对象 函数 构造器 字符串 JSON等各种类型的模块。 

##### 2.1 基本语法

```js
define(id?: String, dependencies?: String[], factory: Function|Object);
```

`id` 是模块的名字，它是可选的参数。

`dependencies` 指定了所要依赖的模块列表，它是一个数组，也是可选的参数，每个依赖的模块的输出将作为参数一次传入 `factory` 中。如果没有指定 `dependencies`，那么它的默认值是 `["require", "exports", "module"]`。

```js
define(function(require, exports, module) {}）
```



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

==通过数组引入依赖，回调函数通过形参传入依赖==

```js
require(['module1','module2'],function(m1,m2){
    
})
```

##### 2.2 AMD 使用

###### 2.2.1 NoAMD 

模块之间耦合度高

/modules/dataService.js

```js
// 定义没有依赖的模块
(function (window) {
    let name = 'kobe';

    function getName() {
        return name;
    }
    window.dataService = {getName};
})(window)
```

/modules/alter.js

```js
// 定义有依赖的模块
(function(window,dataService){
    let msg = 'this is module based on dependency';
    function showMsg(){
        console.log(msg,dataService.getName());
    }
    window.alter = {showMsg};
})(window,dataService)
```

/app.js   `主模块，不需要向外暴露` 

```js
(function(alter){
    alter.showMsg();
})(alter)

```

/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 不能按需加载 必须提前加载所有的依赖  -->
    <script src="./modules/dataService.js"></script>
    <script src="./modules/alter.js"></script>
    <script src="./app.js"></script>
</body>
</html>
```



###### 2.2.2 使用AMD规范

js/main.js

```js
(function () {
    
    requirejs.config({
        baseUrl:'js/', // 基本路径 出发点在根目录下
        paths: {  // 配置路径
            dataService:'modules/dataService',
            alerter:'modules/alerter',
            jquery:'libs/jquery-1.10.1'  // jquery 内置支持amd规范
        } 
    })


    requirejs(['alerter'],function(alerter){
        alerter.showMsg();
    })
})()
```

js/modules/dataService.js

```js
// 定义没有依赖的模块
define(function(){
    let name = 'dataService.js';
    function getName(){
        return name;
    }

    // 暴露模块 return module
    return {getName}
})
```

js/modules/alerter.js

```js
// 定义有依赖的模块
define(['dataService','jquery'], function (dataService,$) {
    let msg = 'alerter.js';

    function showMsg() {
        console.log(msg, dataService.getName());
        $('body').css('background','deeppink');
    }
    // 暴露模块
    return {
        showMsg
    }
})
```

libs/require.js libs/jquery-1.10.1.js

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!--引入requirejs，并引入主文件 -->
    <script data-main="./js/main.js" src="./js/libs/require.js"></script>

</body>
</html>
```

##### 2.3 AMD规范的优缺点

**优点：**

适合在浏览器环境中异步加载模块。可以并行加载多个模块。

 **缺点：**

提高了开发成本，并且不能按需加载，而是必须提前加载所有的依赖。



#### 3 CMD    

专门用于浏览器端，模块的加载是异步的。模块使用时才加载

##### 3.1 基本语法

```js
	定义暴露模块: 
        define(function(require, module, exports){
          通过require()引入依赖模块
          通过module.exports/exports来暴露模块
          exports.xxx = value
        })
```

使用模块

```js
使用模块:
		seajs.use(['模块1', '模块2'])
```

###### 3.1.1 定义没有依赖的模块

js/modules/module1.js

```js
define(function (require,exports,module) {
    let data = 'module1';
    function foo(){
        console.log(data);
    }

    module.exports = {foo};
})
```

###### 3.1.2 定义有依赖的模块

js/modules/module2.js 

```js
define(function(require,exports,module){
    let data = 'module2';
    function bar(){
        console.log(data);
    }

    module.exports = bar;
})

```

js/modules/module3.js 

```js
define(function(require,exports,module){
    let data = 'module3';
    function fun(){
        console.log(data);
    }

    exports.vm = {fun}
})
```

js/modules/module4.js 

```js
define(function(require,exports,module){
    let msg = 'module4';
    // 同步引入
    let module2 = require('./module2');

    module2();
    // 异步引入
    require.async(['./module3.js'],function (module3) {
        module3.vm.fun()
     })

     function fun2(){
         console.log(msg);
     }

     exports.fun2 = fun2;
})
```

js/modules/main.js

汇入主模块

```js
define(function(require,exports,module){
    let module1 = require('./module1');
    module1.foo();
    let module4 = require('./module4');
    module4.fun2();
});
```

3.1.3 浏览器端使用

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./js/libs/sea.js"></script>
    <script>
        seajs.use('./js/modules/main.js');
    </script>
    
</body>
</html>
```

#### 4 ES6

https://github.com/zxfjd3g/170816_modular

```js
npm install babel-cli browserify -g
npm install babel-preset-es2015 -S -D 
// preset 预设 将es6转换成es5的所有插件打包
```

.babelrc    // babel 配置文件 

`rc`  run controll 运行时控制文件



##### 4.1 常规导入/导出

```js
// 导出文件 modules/module1.js
export function foo(){
    console.log('module1---foo()');
}

export function bar(){
    console.log('module1---bar()');
}

export let name = 'kobe';

// 导出文件   实质：使用对象结构
import {foo,bar} from './module1';
import {obj,fun} from './module2'

foo();
bar();
obj.showMsg();
fun();

```

##### 4.2 默认导入导出  

```js
// 一个js文件 export default 只能使用一次
export default function func(){
    console.log('123');
}
```

##### 4.3 编译

```js
// 使用Babel将ES6编译为ES5代码 -> export/import 转require
babel js/src -d js/lib
// 使用Browserify编辑js 将require 转为浏览器可以识别的js文件
browserify js/lib/app.js -o js/lib/bundle.js
```



浏览器使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./src/bundle.js"></script>
</body>
</html>
```




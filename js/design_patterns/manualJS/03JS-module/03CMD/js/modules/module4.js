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
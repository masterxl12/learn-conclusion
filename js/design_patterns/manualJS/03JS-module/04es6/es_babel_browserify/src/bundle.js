(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _module = require('./module1');

var _module2 = require('./module2');

(0, _module.foo)();
(0, _module.bar)();
_module2.obj.showMsg();
(0, _module2.fun)();
},{"./module1":2,"./module2":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.foo = foo;
exports.bar = bar;
function foo() {
    console.log('module1---foo()');
}

function bar() {
    console.log('module1---bar()');
}

var name = exports.name = 'kobe';
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fun = fun;
var obj = exports.obj = {
    msg: 'this is es6 module',
    showMsg: function showMsg() {
        console.log(this.msg);
    }
};

function fun() {
    console.log('module2***fun()');
}
},{}]},{},[1]);

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
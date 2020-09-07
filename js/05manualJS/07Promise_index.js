class MyPromise {
    constructor(exector) {
        // 1. 参数校验
        if (typeof exector !== 'function') {
            throw new TypeError(`Promise resolver ${exector} is not a function`)
        }

        this.initValue();
        this.initBind();
        try {
            exector(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
     }

    // 初始化值
    initValue() {
        this.value = null;           // 终值
        this.reason = null;          // 拒因
        this.state = MyPromise.PENDING;      // 状态  等待态（Pending）执行态（Fulfilled）拒绝态（Rejected）
    }

    // 绑定this (为当前实例对象)
    initBind() {
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }

    resolve(value) {
        // debugger;
        // console.log(this)
        // 成功后的一系列操作(状态的改变，成功回调的执行)
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.FULFILLED;
            this.value = value;
        }
    }

    reject(reason) {
        // 失败后的一系列操作(状态的改变，失败回调的执行)
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.REJECTED;
            this.reason = reason;
        }
    }

    // 一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因。
    // promise 的 then 方法接受两个参数：
    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = function (value) {
                return value
            }
        }
        if (typeof onRejected !== 'function') {
            onRejected = function (reason) {
                throw reason
            }
        }

        if (this.state === MyPromise.FULFILLED) {
            onFulfilled(this.value); // 参数为终值
        }

        if (this.state === MyPromise.REJECTED) {
            onRejected(this.reason);
        }

    }
}

MyPromise.PENDING = "pending";
MyPromise.FULFILLED = "fulfilled"
MyPromise.REJECTED = "rejected"

module.exports = MyPromise
/**
 * 自定义Promise函数模块
 */
(function (window) {
  /**
   * Promise构造函数
   * excutor 执行器函数(同步执行)
   * @param {*} excutor 
   */
  function Promise(executor) {
    let self = this;
    self.status = 'pending'; // 指定状态
    self.data = undefined;   // 存储结果数据的属性
    // 缓存异步回调函数队列
    self.callbacks = [];     // 每个元素的结构 {onFulfilled(){},onRejected(){}}
    function resolve(value) {
      // 如果当前状态不是pending，直接返回
      if (self.status !== 'pending') return;
      // 状态改为resolved
      self.status = 'resolved';
      // 保存value数据
      self.data = value;
      // 如果有待执行的callback函数，立即异步执行回调函数onFulfilled
      if (self.callbacks.length) {
        setTimeout(() => { // 放入队列中执行所有成功的回调
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onFulfilled(value)
          });
        });
      }

    }

    function reject(reason) {
      if (self.status !== 'pending') return;
      // 状态改为resolved
      self.status = 'rejected';
      // 保存value数据
      self.data = reason;
      // 如果有待执行的callback函数，立即异步执行回调函数onRejected
      if (self.callbacks.length) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          });
        });
      }
    }

    // 立即同步执行excutor
    try {
      executor(resolve, reject)
    } catch (error) {
      // 如果执行器抛出异常，promise对象状态变为rejected
      reject(error)
    }
  }

  /**
   * Promise原型对象的方法(实例对象使用) -> then(onFulfilled,onRejected)
   * 指定成功和失败的回调函数
   * 返回一个新的Promise对象
   */
  Promise.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    self.callbacks.push({
      onFulfilled,
      onRejected
    })

  }

  /**
   * Promise原型对象的方法(实例对象使用) -> catch(onRejected)
   * 指定失败的回调函数
   * 返回一个新的Promise对象
   */
  Promise.prototype.catch = function (onRejected) {

  }

  /**
   * Promise函数对象的方法 resolve
   * 返回一个指定结果的成功的promsie
   */
  Promise.resolve = function (value) {

  }

  /**
   * Promise函数对象的方法 reject
   * 返回一个指定reason的失败的promsie
   */
  Promise.reject = function (reason) {

  }

  /**
   * Promise函数对象的all方法
   * 返回一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就失败
   * 
   */
  Promise.all = function (promises) {

  }


  /**
   * Promise函数对象的race方法 
   * 返回一个promise，其结果由第一个完成的promise决定
   * 
   */
  Promise.race = function (promises) {

  }


  // 向外暴露Promise函数
  window.MyPromise = Promise
})(window);
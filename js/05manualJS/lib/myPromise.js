(function (window) {
  const PENDING = 'pending';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';

  function Promise(excutor) {
    // 将当前promise对象保存起来
    let self = this;
    self.status = PENDING;
    self.data = '';
    self.callbacks = [];

    function resolve(value) {
      if (self.status !== PENDING) return;
      self.status = RESOLVED;
      self.data = value;
      // 先指定异步回调并保存 在改变状态后 执行异步回调中的代码
      // self.callbacks -> [{onFulfilled(),onRejected()},{onFulfilled(),onRejected()}...]
      if (self.callbacks.length) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => { // element -> {onFulfilled(),onRejected()}
            callbacksObj.onFulfilled(value);
          });
        });
      }
    }

    function reject(reason) {
      if (self.status !== PENDING) return;
      self.status = REJECTED;
      self.data = reason;
      if (self.callbacks.length) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason);
          });
        });
      }
    }

    try {
      excutor(resolve, reject)
    } catch (error) { // 如果执行器抛出异常 直接改变promise状态
      reject(error)
    }
  }

  //实例对象调用
  /**
   * 原型对象的then()
   * 指定成功和失败的回调函数
   * 返回一个新的promise对象
   * 返回promise的结果由onResolved/onRejected执行结果决定
   * 
   * then函数中完成的内容：
   * （1）返回一个新的promise
   * （2）处理回调函数（有可能存，有可能调用）
   * （3）回调函数的结果，将影响到返回新的promise状态
   * （4）指定回调函数的默认值(回调函数没有定义的情形下)
   */
  Promise.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    // 如果回调函数不为function 需要指定回调函数的默认值 
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    };
    // 执行回调函数后，将返回一个新的promsie
    /**
     * 
     * 1. 抛出异常
     * 2. 返回的是一个promsie对象
     * 3. 返回一个非promise对象
     */

    // 1 返回一个新的promise对象
    return new Promise((resolve, reject) => {
      /**
       * 执行指定的回调函数
       * 根据执行的结果改变return的promise的状态/数据
       */
      function handle(callback) {
        /*
                返回promise的结果由onResolved/onRejected执行结果决定
                针对的是onFulfilled(self.data)结果
                1. 抛出异常，返回promise的结果为失败，reason为异常
                2. 返回的是promise，返回的promise的结果就是这个结果
                3. 返回的非promise，返回promise为成功，value就是返回值
        */
        try {
          const result = callback(self.data);
          if (result instanceof Promise) { // 2. 返回的是promise，返回的promise的结果就是这个结果
            // result.then(
            //     value => resolve(value),
            //     reason => reject(reason)
            // )
            result.then(resolve, reject);
          } else { // 3. 返回的非promise，返回promise为成功，value就是返回值
            resolve(result)
          }
        } catch (error) { // 1. 抛出异常，返回promise的结果为失败，reason为异常
          reject(error)
        }
      }
      // 1.1 当前promise状态是resolved
      if (self.status === RESOLVED) {
        // 立即异步执行成功的回调函数
        setTimeout(() => {
          handle(onFulfilled);
        });
      } else if (self.status === REJECTED) { // 1.2 当前promise状态是rejected
        // 立即执行失败的回调函数
        setTimeout(() => {
          handle(onRejected);
        });
      } else { // 1.3 当前promise状态是pending
        // 将成功和失败的回调函数保存callbacks容器中缓存起来
        self.callbacks.push({
          // 根据执行结果 改变返回的promise状态
          onFulfilled(value) {
            handle(onFulfilled)
          },
          onRejected(reason) {
            handle(onRejected)
          }
        })
      }
    })
  }

  // 实例对象调用
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  }

  // 函数对象调用
  /**
   * 返回一个解析过的Promise对象
   * 参数：
   * 1. 如果参数是一个promise实例对象，Promise.resolve将不做任何修改，原封不动的返回这个Promise对象
   * 2. 参数是原始值，后者是不具有then方法的对象，则Promise.resolve方法返回一个包装后的promise对象
   */
  Promise.resolve = function (value) {
    // 返回一个成功或者失败的promise对象
    return new Promise((resolve, reject) => {
      // value是promise
      if (value instanceof Promise) { // 根据value的结果作为当前promise的结果
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  // 函数对象调用
  /**
   * 方法返回一个带有拒因的promise对象
   * 参数：表示被拒绝的原因
   */
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }

  // 函数对象调用
  /**
   * 返回一个promise 只有当所有的promise都成功时成功，否则只要有一个失败就失败
   */
  Promise.all = function (promises) {
    const pAll = new Array(promises.length);
    let resolvedCount = 0; // 定义一个计数器，判断resolve的promsie数量
    return new Promise((resolve, reject) => {
      promises.forEach((pItem, index) => {
        // 将不是promise的对象包装为Promise对象
        Promise.resolve(pItem).then(
          value => {
            resolvedCount++;
            pAll[index] = value;
            if (resolvedCount === promises.length) {
              resolve(pAll);
            }
          },
          // 只要有个失败 return的promise就失败
          reason => reject(reason))
      })
    })

  }

  // 函数对象调用
  /**
   * 返回一个promise 一旦迭代器中的某个promise解决或拒绝，返回的promise就会拒绝或拒绝
   */
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      // 一旦有成功，将return变为成功，一旦有失败， 状态即为失败
      // 将不是promise的对象包装为Promise对象
      promises.forEach(currentPromise => {
        Promise.resolve(currentPromise).then(resolve, reject)
      })
    })
  }

  // 自定义函数

  /**
   * 返回一个promise对象，在指定的时间后才确定结果
   */

  Promise.resolveDelay = function (value, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }, time)
    })
  }


  Promise.rejectDelay = function (reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(reason), time)
    })
  }

  window.MyPromise = Promise;
})(window)
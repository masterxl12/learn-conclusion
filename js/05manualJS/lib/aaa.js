Promise.prototype.then = function (onFulfilled, onRejected) {
  const self = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  };
  return new Promise((resolve, reject) => {
    function handle(callback) {
      try {
        const result = callback(self.data);
        if (result instanceof Promise) { // 2. 返回的是promise，返回的promise的结果就是这个结果
          result.then(resolve, reject);
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (self.status === RESOLVED) {
      setTimeout(() => {
        handle(onFulfilled);
      });
    } else if (self.status === REJECTED) { // 1.2 当前promise状态是rejected
      setTimeout(() => {
        handle(onRejected);
      });
    } else {
      self.callbacks.push({
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
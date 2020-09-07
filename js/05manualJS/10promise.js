new Promise(((resolve, reject) => {
    setTimeout(() => {
        console.log("执行任务1(异步)")
        resolve(1);
    }, 1000)
})).then(value => {
    console.log('任务1的结果:', value);
    // 同步操作  直接return
    console.log('执行任务2(同步)');
    return 2;
}).then(value => {
    console.log('任务2的结果:', value);
    // 异步操作  return 一个新的promise
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            // 执行新的异步操作
            console.log('执行任务3(异步)');
            resolve(3)
        }, 1000)
    }))
}).then(value => {
    console.log('任务3的结果:', value);
});


new Promise((resolve, reject) => {
    // resolve(1);
    reject(1);
})
    .then(value => {
            console.log('value1', value);
            return 2
        },
        reason => {
            throw reason;  // 抛出错误
        })
    .then(
        value => {
            console.log('value2', value)
        },
        reason => {
            return Promise.reject(reason) // 返回失败的promise
        })
    .catch(reason => {
        console.log('reason1', reason);
    });

new Promise((resolve, reject) => {
    // resolve(1);
    reject(1);
})
    .then(value => {
            console.log('value1', value);
            return 2
        },
        reason => {
            throw reason;  // 抛出错误
        })
    .then(
        value => {
            console.log('value2', value)
        },
        reason => {
            return Promise.reject(reason) // 返回失败的promise
        })
    .catch(reason => {
        console.log('reason1', reason);
    })
    .then(value => {
        // 返回一个  pending状态的promise  中断promise链
        return new Promise(
            () => {
            }
        )
    })
    .then(value => {
            console.log('value', value)
        }
    );
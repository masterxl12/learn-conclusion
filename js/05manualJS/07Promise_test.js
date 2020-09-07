const MyPromise = require('./07Promise_index');
new MyPromise((resolve, reject) => {
    console.log('start');
    throw new Error('it is wrong!')
    resolve(1)
}).then(res => {
    console.log(res);
}, reason => {
    console.log('reason', reason)
})

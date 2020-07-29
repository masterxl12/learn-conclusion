// const p = new Promise(((resolve, reject) => {
//     throw new Error('出错了...');
// }));
//
// p.then(value => {
//     console.log(value);
// }, reason => {
//     console.log('reason', reason)
// });
//
// const p1 = new Promise(((resolve, reject) => {
//     throw 3;
// }));
//
// p1.then(value => {
//     console.log(value);
// }, reason => {
//     console.log('reason1', reason);
// });
// console.log('=======');
// p1.then(value => {
//     console.log(value);
// }, reason => {
//     console.log('reason2', reason);
// })
//
// // 常规操作 先指定回调函数 后改变状态
// new Promise(((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);  // 后改变状态(同时指定数据)，异步执行回调函数
//     }, 1000)
// })).then(                 // 先指定回调函数  保存当前指定的回调函数
//     value => {
//     },
//     reason => {
//         console.log('reason1', reason);
//     });
// // 先改状态  后指定回调函数
// // 实现1
// new Promise(((resolve, reject) => {
//     resolve(1); // 先改变状态(同时指定数据)
// })).then(            // 后指定回调函数 异步执行回调函数
//     value => {
//     },
//     reason => {
//         console.log('reason2', reason);
//     }
// );
// // 实现2
// const p2 = new Promise(((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1); // 先改变状态(同时指定数据)
//     }, 1000);
// }));
//
// setTimeout(() => {
//     p2.then(value => {   // 后指定回调函数 异步执行回调函数
//         console.log(value);
//     }, reason => {
//         console.log('reason2', reason);
//     })
// }, 1100);


new Promise(((resolve, reject) => {
    resolve(1);
})).then(value => {
    console.log('onFulfilled()1:', value);
    // throw 1;
    // return 2;
    return Promise.resolve(3); // Promise.resolve() Promise函数对象有resolve()方法
}, reason => {
    console.log('onRejected()1:', reason);
}).then(value => {
    console.log('onFulfilled()2:', value);
}, reason => {
    console.log('onRejected()2:', reason);
});

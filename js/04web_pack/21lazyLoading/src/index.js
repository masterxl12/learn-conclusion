console.log('index.js 被加载~~~');

function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6));

document.getElementById('btn').onclick = function () {
    import(/* webpackChunkName:'test',webpackPrefetch */'./test')
        .then(({mul, add}) => {
            // eslint-disable-next-line
            console.log(mul(2, 5))
        })
        .catch(reason => console.log(reason))
}
  

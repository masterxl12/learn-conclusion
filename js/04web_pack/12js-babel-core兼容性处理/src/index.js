const add = (x, y) => x + y;

const p = new Promise(((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000)
}));

p.then(value => {
    console.log(value);
});

console.log(add(2, 3));


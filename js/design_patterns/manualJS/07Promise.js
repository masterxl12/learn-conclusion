const p1 = new Promise((resolve, reject) => {
    // ...
})

const p2 = new Promise((resolve, reject) => {
    resolve(p1)
})


fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
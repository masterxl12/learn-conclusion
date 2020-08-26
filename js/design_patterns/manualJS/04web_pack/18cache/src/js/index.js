import '../css/index.css';

function sum(...args) {
  return args.reduce((prev, curr) => prev + curr, 0);
}

// eslint-disable-next-line
console.log(sum(1,2, 3,4));

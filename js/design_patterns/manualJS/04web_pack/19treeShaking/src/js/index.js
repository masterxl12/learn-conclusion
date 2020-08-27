import '../css/index.css';
import { mul } from './print';

function sum(...args) {
  return args.reduce((prev, curr) => prev + curr, 0);
}

// eslint-disable-next-line
console.log(sum(1,2, 3,4));
// eslint-disable-next-line
console.log(mul(2,5));

function isPrime(number) {
  let upBound = Math.ceil(Math.sqrt(number));
  for (let i = 2; i <= upBound; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

let arr = [];
for (let i = 2; i <= 100; i++) {
  if (isPrime(i)) {
    arr.push(i);
  }
}
console.log(arr);
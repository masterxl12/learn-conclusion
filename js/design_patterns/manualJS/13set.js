let setA = new Set([1,2,3]);
let setB = new Set([2,3,4]);
// console.log(Object.prototype.toString.call([...setA]));
let diffA = new Set([...setA].filter(x => !setB.has(x)));
let diffB = new Set([...setB].filter(x => !setA.has(x)));

console.log(diffA, diffB);
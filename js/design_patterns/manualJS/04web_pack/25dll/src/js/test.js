let arrHandler = function (args) {
	return args.reduce((prev, curr) => prev + curr, 0);
}

function once(fn) {
	let called = false;
	// let args = [...arguments].slice(1);
	if (typeof fn === 'function') {
		return function () {
			if (!called) {
				called = true;
				let args = [...arguments];
				return fn.call(this, args)
			}
		}
	}
}
let num1 = once(arrHandler);
console.log(num1(1, 2, 3, 4));
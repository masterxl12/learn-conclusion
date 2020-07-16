let curry = function (fn, ...args) {
    let all = args || [];
    let len = fn.length;
    return function (...rest) {
        let _args = all.concat();
        _args.push(...rest);
        if (_args.length < len) {
            return curry.call(this, fn, ..._args);
        } else {
            return fn.apply(this, _args);
        }
    }
}

let test = curry((a, b, c, d) => console.log(a + b + c + d));
test(1)(2)(3)(4);
test(1,2)(3)(4);
test(1,2,3)(4);
test(1,2,3,4);

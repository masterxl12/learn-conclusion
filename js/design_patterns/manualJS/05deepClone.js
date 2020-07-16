function deepClone(origin, target) {
    target = target || {};
    for (let prop in origin) {
        debugger;
        if (origin.hasOwnProperty(prop)) {
            if (typeof origin[prop] === 'object') {
                if (Object.prototype.toString.call(origin[prop]) === '[object Array]') {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                }
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}

var a = {
    name: "xl",
    age: 12,
    school: ['sh', 'bj'],
    face: {
        aa: "handsome",
        bb: ['surprise', 'amazing']
    }
};

let b  = deepClone(a)
console.log(b);
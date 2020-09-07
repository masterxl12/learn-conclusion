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

let b = deepClone(a)
console.log(b);

function Person(name) {
    this.name = name;
}

const p1 = new Person('kobe');
console.log(Object.getPrototypeOf(p1));
console.log(Person.prototype);
console.log(Object.getPrototypeOf(Person));
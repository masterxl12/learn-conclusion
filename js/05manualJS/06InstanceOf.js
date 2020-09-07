function instaceOf(left, right) {
    let proto = Object.getPrototypeOf(left);
    while (true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

function Person() {
};
let p1 = new Person();
console.log(instaceOf(p1, Person)); // true
console.log(instaceOf(p1, Object)); // true
console.log(instaceOf(p1, Array));  // false

const person = {
    isHuman: false,
    printIntroduction: function() {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
};

const me = Object.create(person);

console.log(Object.getPrototypeOf(me));
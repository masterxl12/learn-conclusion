// 接收者类  
class Receiver {
  execute() {
    console.log("库存管理员接单-执行请求...准备出库")
  }
}
//命令对象
class Command {
  constructor(receiver) {
    this.receiver = receiver;
  }
  execute() {
    console.log("接收订单-给库存管理员发单")
    this.receiver.execute();
  }
}
//触发者/客户端/调用者
class Invoker {
  constructor(command) {
    this.command = command;
  }
  invoke() {
    console.log("客户端-发布订单");
    this.command.execute();
  }
}

// 仓库
const warehouse = new Receiver();
// 订单    
const order = new Command(warehouse);
// 客户
const client = new Invoker(order);
client.invoke()

const { log } = console;
log(1);

console.log(Object.prototype.toString.call(undefined));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(123));
console.log(Object.prototype.toString.call('abc'));
console.log(Object.prototype.toString.call([1, 2, 3]));
console.log(Object.prototype.toString.call({}));
console.log(Object.prototype.toString.call(function () { }));
console.log(Object.prototype.toString.call(Math));

console.log(Object.prototype.toString.call(Array));
console.log(Object.prototype.toString.call(Object));


console.log(typeof undefined);
console.log(typeof null);
console.log(typeof 123);
console.log(typeof 'abc');
console.log(typeof [1, 2, 3]);
console.log(typeof {});
console.log(typeof function () { });

// undefined
// object
// number
// string
// object
// object
// function


function Person() { };
let person = new Person();

console.log(person instanceof Person);

function Student() { };
Student.prototype = new Person();

let stu = new Student();
console.log(stu instanceof Person);
console.log(stu instanceof Person);
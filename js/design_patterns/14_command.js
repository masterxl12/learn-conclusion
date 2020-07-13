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


Array.prototype.fakeEach = function (fn) {
  let context = arguments[1];
  console.log(context);
  if (typeof fn !== "function") {
    throw new TypeError(fn + "is not a function");
  }

  for (var i = 0; i < this.length; i++) {
    fn.call(context, this[i], i, this);
  }
}
let a = [1, 2, 4];
a.fakeEach(item => {
  console.log(item);
})
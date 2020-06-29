// 观察者模式
// 观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，
// 所有依赖于它的对象都将得到通知，并自动更新。观察者模式属于行为型模式，
// 行为型模式关注的是对象之间的通讯，观察者模式就是观察者和被观察者之间的通讯。
function Hunter(name, level) {
  this.name = name;
  this.level = level;
  this.list = [];  // 存放订阅者
}
// 订阅功能
Hunter.prototype.subscribe = function (target, fn) {
  console.log(this.level + '猎人' + this.name + '订阅了' + target.name)
  // target 订阅的目标对象
  target.list.push(fn);
}
// 发布功能
Hunter.prototype.publish = function (money) {
  console.log(this.level + '猎人' + this.name + '寻求帮助');
  this.list.map(itemFn => { // 每一项fn
    itemFn(money);
  })
}
// 定义猎人
let hunterMing = new Hunter('明', '知府');
let hunterLiang = new Hunter('亮', '衙役');
let hunterFei = new Hunter('飞', '富商');
let hunterPeter = new Hunter('皮特', '贫农');

// 观察者订阅任务
// 猎人们(观察者)关联他们感兴趣的猎人(目标对象)，
// 如Peter，当Peter有困难时，会自动通知给他们（观察者）

hunterMing.subscribe(hunterPeter, function (money) {
  console.log('明表示: ' + (money > 500 ? '' : '不') + '给与帮助');
})

hunterLiang.subscribe(hunterPeter, function (money) {
  console.log('亮表示: 给与帮助');
})

hunterFei.subscribe(hunterPeter, function (money) {
  console.log('飞表示: 给与帮助');
})

// 发布者发布任务
hunterPeter.publish(300)
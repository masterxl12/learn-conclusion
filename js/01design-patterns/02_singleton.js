/**
 * 创建实例的过程只执行一次
 * 无论怎么new，只返回一份实例
 * 
 * 单例模式需满足两个条件
 * (1)确保只有一个实例
 * (2)可以全局访问
 */
class Singleton {
  constructor() {
    this.state = "hide";
    this.totalCount = 1000;
  }
  show() {
    this.state = 'show';
    this.totalCount += 100;
    console.log("登录框显示成功!")
  }
  hide() {
    this.state = 'hide';
    this.totalCount -= 100;
    console.log("登录框隐藏成功!")
  }

  // 静态方法
  static getInstance() {
    // 如果不是第一次new(instance肯定是存在的)
    if (!this.instance) {
      // 创建单例对象
      this.instance = new Singleton()
    }
    // 返回单例对象
    return this.instance
  }
}


let obj1 = Singleton.getInstance();
obj1.show()


let obj2 = Singleton.getInstance()
obj2.hide()
obj2.hide()

console.log(obj1.totalCount, obj2.totalCount) // 900 900

console.log(obj1 === obj2) // true
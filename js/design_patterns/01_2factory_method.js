/**
 * 工厂方法模式的本意是将**实际创建对象的工作推迟到子类**中
 * 这样核心类就变成了抽象类。但是在JavaScript中很难像传统面向对象那样去实现创建抽象类。
 * 所以在JavaScript中我们只需要参考它的核心思想即可。
 * 我们可以将工厂方法看作是一个实例化对象的工厂类。

 * 虽然ES6也没有实现`abstract`，
 * 但是我们可以使用`new.target`来模拟出抽象类。
 * `new.target`指向直接被`new`执行的构造函数，
 * 我们对`new.target`进行判断，如果指向了该类则抛出错误来使得该类成为抽象类。

 * 在简单工厂模式中，我们每添加一个构造函数需要修改两处代码。
 * 现在我们使用工厂方法模式改造上面的代码，刚才提到，
 * 工厂方法我们只把它看作是一个实例化对象的工厂，它只做实例化对象这一件事情！
 */
class User {
  constructor(name = '', viewPage = []) {
    if (new.target === User) {
      throw new Error('抽象类不能实例化!')
    }
    this.name = this.name;
    this.viewPage = viewPage;
  }
}

class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage)
  }
  create(role) {
    switch (role) {
      case "superAdmin":
        return new UserFactory('超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理']);
        break;
      case "admin":
        return new UserFactory('超级管理员', ['首页', '通讯录', '发现页', '应用数据']);
        break;
      case "user":
        return new UserFactory('超级管理员', ['首页', '通讯录', '发现页']);
        break;
      default:
        break;
    }
  }
}

let user = new User('xl', ["home"]); // 报错， 核心类不能被实例化
let userFactory = new UserFactory();
let superAdmin = userFactory.create('superAdmin');
let admin = userFactory.create('admin');
let user = userFactory.create('user');

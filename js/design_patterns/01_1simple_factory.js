// class Student {
//   constructor(name, subjects) {
//     this.name = name;
//     this.subjects = subjects;
//   }
// }
// /**
//  * 创建对象跟对不同需求进行不同的实例化
//  */
// class Factory {
//   constructor(name, type) {
//     this.name = name;
//     this.type = type;
//   }
//   createStudent() {
//     switch (this.type) {
//       case "文科":
//         return new Student(this.name, ["政治", "历史", "地理"])
//         break;
//       case "理科":
//         return new Student(this.name, ["物理", "化学", "生物"])
//         break
//       case "体育":
//         return new Student(this.name, ["长跑", "游泳"])
//         break;
//       default:
//         throw ("不合法的学生")
//     }
//   }
// }

// let xiaojin = new Factory("小金", "理科");
// console.log(xiaojin.createStudent());
class User {
  constructor(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }
  // 静态方法 直接在User类上调用（User.classMethod()），而不是在User类的实例上调用
  static getInstance(role) {
    switch (role) {
      case "superAdmin":
        return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] })
        break;
      case 'admin':
        return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
        break;
      case 'user':
        return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}
//调用
let superAdmin = User.getInstance('superAdmin');
let admin = User.getInstance('admin');
let normalUser = User.getInstance('user');

/*
User就是一个简单工厂，在该函数中有3个实例中分别对应不同的权限的用户。当我们调用工厂函数时，
只需要传递superAdmin, admin, user这三个可选参数中的一个获取对应的实例对象。
*/

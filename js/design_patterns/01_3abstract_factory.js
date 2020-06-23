/**
 * 在抽象工厂中，类簇一般用父类定义，并在父类中定义一些抽象方法，
 * 再通过抽象工厂让子类继承父类。
 * 所以，**抽象工厂其实是实现子类继承父类的方法
 * @param {*} type 
 */
function getAbstractUserFactory(type) {
  switch (type) {
    case 'wechat':
      return UserOfWechat; // WechatUserClass extends UserOfWechat
      break;
    case 'qq':
      return UserOfQq;  // QqUserClass extends UserOfQq
      break;
    case 'weibo':
      return UserOfWeibo; // WeiboUserClass extends UserOfWeibo
      break;
    default:
      throw new Error('参数错误, 可选参数:superAdmin、admin、user')
  }
}


let WechatUserClass = getAbstractUserFactory('wechat');
let QqUserClass = getAbstractUserFactory('qq');
let WeiboUserClass = getAbstractUserFactory('weibo');

let wechatUser = new WechatUserClass('微信小李');
let qqUser = new QqUserClass('QQ小李');
let weiboUser = new WeiboUserClass('微博小李');
// let examineCarNum = 0;
// class ExamrCar {
//   constructor(carType) {
//     examineCarNum++;
//     this.carId = examineCarNum;
//     this.carType = carType ? "手动挡" : "自动挡";
//     this.usingState = false;
//   }

//   examine(candinateId) {
//     return new Promise(resolve => {
//       this.usingState = true;
//       console.log(`考生-${candinateId}在${this.carType}驾考车-${this.carId}上考试`);
//       setTimeout(() => {
//         this.usingState = false;
//         console.log(`考生-${candinateId}在${this.carType}驾考车-${this.carId}上考试完毕`);
//         resolve();
//       }, Math.random() * 2000);
//     })
//   }
// }

// const ManualExamCarPool = {
//   _pool: [],
//   _candiateQueue: [],
//   registCandidates(candiateList) {
//     candiateList.map(candiateId => this.registerCandiate(candiateId))
//   },
//   registerCandiate(candiateId) {
//     let examCar = this.getManualCar();
//     if (examCar) {
//       examCar.examine(candiateId).then(() => {
//         let nextCandiateId = this._candiateQueue.length && this._candiateQueue.shift();
//         nextCandiateId && this.registerCandiate(nextCandiateId);
//       })
//     } else this._candiateQueue.push(candiateId)
//   },
//   initManualExamCar(manualExamCarNum) {
//     for (let i = 1; i < manualExamCarNum; i++) {
//       this._pool.push(new ExamrCar(true));
//     }
//   },
//   getManualCar() {
//     return this._pool.find(car => !car.usingState);
//   }
// }

// ManualExamCarPool.initManualExamCar(3);
// ManualExamCarPool.registCandidates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])


let formateStr = function (param, data) {
  return param.replace(/\{#(\w+)#\}/g, (match, key) => {
    return typeof data[key] === undefined ? '' : data[key];
  })
}
// 定义基本的导航类(基类)
let Nav = function (data) {
  let _this = this;
  _this.item = '<li><a href="{#hrefUrl#}" title="{#title#}" {#sign#}>{#content#}</a></li>';
  _this.html = '<ul>';
  for (let i = 0; i < data.length; i++) {
    _this.html += formateStr(_this.item, data[i]);
  }
  _this.html += '</ul>';
  return _this.html;
}

// 增加功能：带提示消息的导航
let InfoNav = function (data) {
  let _this = this;
  _this.info = '<i>{#num#}</i>';
  for (var i = data.length - 1; i >= 0; i--) {
    // 修改对content的内容  '百度一下' -> '百度一下<i>10</i>'
    data[i].content += formateStr(_this.info, data[i]);
  };
  // 调用父类方法
  return Nav.call(this, data);
}


let objNav = document.getElementById('nav');
objNav.innerHTML = InfoNav([
  {
    hrefUrl: 'http://www.baidu.com',
    content: '百度一下',
    title: '百度',
    num: '10',
    sign: 'sign="1"'
  },
  {
    hrefUrl: 'http://www.zhihu.com',
    content: '知乎一下',
    title: '知乎',
    num: '10',
    sign: 'sign="2"'
  }
]);

// 定义饮料基类
class Beverage {
  constructor(data) {
    this.brewDrink = data.brewDrink;
    this.addCondiment = data.addCondiment;
  }
  /* 烧开水，共用方法 */
  boilWater() { console.log('水已经煮沸=== 共用') }
  /* 倒杯子里，共用方法 */
  pourCup() { console.log('倒进杯子里=== 共用') }
  /* 模板方法 */
  init() {
    this.boilWater()
    this.brewDrink()
    this.pourCup()
    this.addCondiment()
  }
}

const coffee = new Beverage({
  /* 冲泡咖啡，覆盖抽象方法 */
  brewDrink: function () { console.log('子类方法 --- 冲泡咖啡') },
  /* 加调味品，覆盖抽象方法 */
  addCondiment: function () { console.log('子类方法 --- 加点奶和糖') }
});

coffee.init();
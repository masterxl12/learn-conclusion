/*
let candidateNum = 10;
let examCarNum = 0;
function ExamCar(carType) {
  examCarNum++;
  this.cardId = examCarNum;
  this.carType = carType ? "手动挡" : "自动挡";
}

ExamCar.prototype.examine = function (candidateId) {
  console.log('考生-' + candidateId + ' 在' + this.carType + "驾考车 " + this.cardId + " 上考试");
}

let manualExamCar = new ExamCar(true);
let autoExamCar = new ExamCar(false);

for (let candidateId = 1; candidateId <= candidateNum; candidateId++) {
  let examCar = candidateId % 2 ? manualExamCar : autoExamCar;
  examCar.examine(candidateId);
}

console.log(`%c考车数量: ${examCarNum}`, 'color:#f40');*/

let examCarNum = 0;
class ExamCar {
  constructor(carType) {
    examCarNum++;
    this.carId = examCarNum;
    this.carType = carType ? "手动挡" : "自动挡";
    this.usingState = false;
  }
  examine(candidateId) {
    return new Promise(resolve => {
      this.usingState = true;
      console.log(`考生- ${candidateId} 开始在${this.carType}驾考车- ${this.carId} 上考试`);
      setTimeout(() => {
        this.usingState = false;
        console.log(`%c考生- ${candidateId} 在${this.carType}驾考车- ${this.carId} 上考试完毕`, 'color:#f40')
        resolve();
      }, Math.random() * 2000)
    })
  }
}
// 手动汽车对象池
const ManualExamCarPool = {
  _pool: [],            // 驾考车对象池
  _candidateQueue: [],  // 考生队列
  // 注册考试ID列表
  registCandidates(candidateList) {
    candidateList.forEach(candidateId => this.registCandidate(candidateId));
  },
  // 注册手动挡考生
  registCandidate(candidateId) {
    debugger;
    // 找一个未被占用的手动挡考车
    const examCar = this.getManualExamCar();
    if (examCar) {
      examCar.examine(candidateId) // 开始考试，考完了让队列中的下一个考生开始考试
        .then(() => {
          const nextCandidateId = this._candidateQueue.length && this._candidateQueue.shift();
          nextCandidateId && this.registCandidate(nextCandidateId);
        })
    } else this._candidateQueue.push(candidateId)
  },

  // 注册手动挡车
  initManualExamCar(manualExamCarNum) {
    for (let i = 1; i <= manualExamCarNum; i++) {
      this._pool.push(new ExamCar(true));
    }
  },

  // /* 获取状态为未被占用的手动档车 */
  getManualExamCar() {
    return this._pool.find(car => !car.usingState);
  }
}

ManualExamCarPool.initManualExamCar(3);

ManualExamCarPool.registCandidates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
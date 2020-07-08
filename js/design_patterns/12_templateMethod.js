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


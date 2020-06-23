const config = {
  name: "潇湘夜雨",
  pattern: "adapter",
  title: "设计模式",
  major: "frontEnd",
  salary: 20000,
  sayName: function () {
    console.log(this.name);
  }
}

class Adapter {
  constructor(param) {
    this.userInfo = {};
    for (let i in config) {
      this.userInfo[i] = param[i] || config[i];
    }
  }
  printUser() {
    console.log(this.userInfo);
  }
}

let adapterOne = new Adapter({
  salary: 30000,
  major: "Java"
});
adapterOne.printUser()
// // 建立一个年终绩效考核策略 
// const obj = {
//   perfect: function (salary) {
//     return salary * 4;
//   },
//   better: function (salary) {
//     return salary * 3;
//   },
//   good: function (salary) {
//     return salary * 2;
//   },
//   hard: function (salary) {
//     return salary / 2;
//   }
// };

// let calculateBonus = function (level, salary) {
//   return obj[level](salary);
// }

// console.log(calculateBonus('better', 16000))
// 定义提交表单的策略规则
let strategys = {
  isNotEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  // 限制最小长度
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  // 手机号码格式
  mobileFormat: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
};
let Validator = function () {
  this.cache = []; // 保存校验规则
};
Validator.prototype.add = function (dom, rules) {
  let self = this;
  for (let i in rules) {
    (function (rule) {
      // minLength:6 -> [minLength,6];
      let strategyArr = rule.strategy.split(":");
      let errorMsg = rule.errorMsg;
      self.cache.push(function () {
        let strategy = strategyArr.shift();
        strategyArr.unshift(dom.value);
        strategyArr.push(errorMsg);
        return strategys[strategy].apply(dom, strategyArr);
      })
    })(rules[i])
  }
};
Validator.prototype.start = function () {
  for (var i = 0, validate; validate = this.cache[i++];) {
    let msg = validate();
    if (msg) {
      return msg;
    }
  }
};

let registerForm = document.getElementById("ruleForm");
// 代码调用
let validateFunc = function () {
  var validator = new Validator(); // 创建一个Validator对象
  /* 添加一些效验规则 */
  validator.add(registerForm.userName, [
    { strategy: 'isNotEmpty', errorMsg: '用户名不能为空' },
    { strategy: 'minLength:6', errorMsg: '用户名长度不能小于6位' }
  ]);
  validator.add(registerForm.passWord, [
    { strategy: 'minLength:6', errorMsg: '密码长度不能小于6位' },
  ]);
  validator.add(registerForm.phoneNumber, [
    { strategy: 'mobileFormat', errorMsg: '手机号格式不正确' },
  ]);

  console.log(validator.cache);
  var errorMsg = validator.start(); // 获得效验结果
  return errorMsg; // 返回效验结果
}

// 点击确定提交
registerForm.onsubmit = function () {
  var errorMsg = validateFunc();
  console.log(errorMsg);
  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
}

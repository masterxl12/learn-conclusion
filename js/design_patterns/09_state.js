const superMarry = (function () {
  // 1. 内部状态私有变量
  let currentState = {};
  // 2. 动作与状态方法映射
  let states = {
    jump() {
      console.log('jump跳跃');
    },
    move() {
      console.log('move移动');
    },
    shoot() {
      console.log('shoot射击');
    },
    squat() {
      console.log('suqat蹲下')
    }
  };
  // 3. 定义动作控制类
  const Action = {
    // 3.1 更改当前动作 有可能是组合动作
    changeState(...action) {
      // 3.2 重置内部状态
      currentState = {};
      // 内部状态中添加动作
      action.map(item => currentState[item] = true);
      // 返回动作控制类
      return this;
    },
    // 3.3 执行动作
    doAction() {
      // 3.4 遍历内部状态保留的动作
      console.log("******执行动作start*********")
      for (let actionItem in currentState) {
        states[actionItem] && states[actionItem]()
      }
      console.log("******执行动作end*********");
      return this;
    }
  }
  // 4. 返回接口方法 change doAction
  return {
    change: Action.changeState,
    goes: Action.doAction
  }
})();
superMarry
  .change('jump', 'shoot')
  .goes()
  .goes()
  .change('move')
  .goes()
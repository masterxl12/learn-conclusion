// 迭代器模式
let eachArr = function (arr, callBack) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (callBack(i, arr[i]) === false) {
      break;  // 终止迭代器，跳出循环
    }
  }
}

eachArr([1, 2, 3, 4, 5], function (index, value) {
  if (value > 3) {
    return false;
  }
  console.log([index, value]);
})


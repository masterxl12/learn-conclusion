// 数组拍平
const arr = [1, 2, 3, 4, ['a', 'b', 'c', ['A', 'B', 'C', ['one', 'two', 'three']]], 5, "string", {name: "弹铁蛋同学"}];

// 1. concat + Array.isArray + recursive
function arrFlat(arr) {
    let arrResult = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            arrResult = arrResult.concat(arguments.callee(item));
            // arrResult = arrResult.concat(...arguments.callee(item))
        } else {
            arrResult.push(item)
        }
    });
    return arrResult;
}

console.log("first")
console.log(arrFlat(arr));

// 2. 用 reduce + concat + Array.isArray + recursive
const flat2 = (arr) => {
    return arr.reduce((prev, current) => {
        return prev.concat(Array.isArray(current) ? flat2(current) : current);
    }, [])
};
console.log('second')
console.log(flat2(arr));

// 3. 无递归数组扁平化，使用堆栈结构
function flat3(arr) {
    const result = [];
    const stack = [].concat(arr);  // 将数组元素拷贝至栈，直接赋值会改变原数组
    //如果栈不为空，则循环遍历
    while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next); //如果是数组再次入栈，并且展开了一层
        } else {
            result.unshift(next); //如果不是数组就将其取出来放入结果数组中
        }
    }
    return result;
}

console.log("third");
console.log(flat3(arr));

// 4. reduce + Array.isArray + concat + recursive
function flatDeep(arr, num = 1) {
    return num > 0 ? arr.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? flatDeep(curr, num - 1) : curr), []) : arr.slice();
}

console.log(flatDeep(arr, Infinity));

// 5. 正则表达式 + JSON.parse/JSON.stringify()
function flatten(arr) {
    let arrTostr = JSON.stringify(arr).replace(/\[|\]/g, '');
    arrTostr = `[${arrTostr}]`;
    return JSON.parse(arrTostr);
}

console.log(flatten(arr));


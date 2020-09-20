/**
 * @description
 * @resolve 使用递推
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 * 问总共有多少条不同的路径？
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
let uniquePaths = function (m, n) {
    let dp = new Array(m).fill(0).map(item => new Array(n).fill(0));
    for (let j = 0; j < m; j++) {
        for (let k = 0; k < n; k++) {
            if (j === 0 || k === 0) {
                dp[j][k] = 1;
            } else {
                dp[j][k] = dp[j - 1][k] + dp[j][k - 1]
            }
        }
    }
    return dp[m - 1][n - 1];
};

console.log(uniquePaths(7, 3));
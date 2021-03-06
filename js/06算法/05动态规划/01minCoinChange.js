/** 
@description 
    最少硬币找零的问题：
        给出零钱目标金额amount，以及可用的面币金额a,b,c,d,找到所需的最少硬币个数
@example
    (1) 先确定「状态」，也就是原问题和子问题中变化的变量。由于硬币数量无限，
        所以唯一的状态就是目标金额amount。
    (2) 然后确定dp函数的定义：函数 dp(n)表示，当前的目标金额是n，至少需要dp(n)个硬币凑出该金额。
    (3) 然后确定「选择」并择优，也就是对于每个状态，可以做出什么选择改变当前状态。具体到这个问题，
        无论当的目标金额是多少，选择就是从面额列表coins中选择一个硬币，然后目标金额就会减少：

    1. 递归 + 记忆化 -> 递推
    2. 状态的定义： opt[n],dp[n],fib[n]
    3. 状态转移方程: opt[n] = best_of(opt[n-1],opt[n-2]...)
    4. 最优子结构
*/
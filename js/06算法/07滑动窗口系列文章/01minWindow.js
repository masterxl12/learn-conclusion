
// !  leetcode 76. 最小覆盖子串

/**
 * @description 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
 * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * 注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。
 * 
 *  * 输入：s = "ADOBECODEBANC", t = "ABC"
 *  * 输出："BANC"
 * 
 * 
 *  * 输入：s = "a", t = "a"
 *  * 输出："a"
 * @param {string} s
 * @param {string} t
 * @return {string}
 * 

 */
var minWindow = function(s, t) {
    let start = 0,
        left = 0,
        right = 0,
        minLen = Infinity;
    let needs = new Map();
    let window = new Map();
    let valid = 0;
    for (let i in t) { 
        let char = t[i];
        needs.has(char) ? needs.set(char, needs.get(char) + 1) : needs.set(char,1) 
    }

    // 'adobec obaeb ank','abc'
    //  adobec oabae bank
    
    /* 
     *  a/ d/o/b/e/c /o/b/a/e/b/ a/n/k


     *  a/ d/o/b/e/c /o/b/a
    
        window: {a:1,b:1,c:1}   {a:1,b:2,c:1}  {a:1,b:1,c:1}
        valid: 3                     3            3
        left:  0                     1            5
        right:6 7 8 9                             9
        right - left = 6                          4

        start:0                                   5
        minLen:6                                  4
     * 
     */
    while (right < s.length) {
        // char 是将移入窗口的字符
        let char = s[right];
        // 右移动窗口
        right++;
        // 进行窗口内数据的一系列更新
        if (needs.has(char)) { 
            window.has(char) ? window.set(char, window.get(char) + 1) : window.set(char, 1);
            if (needs.get(char) === window.get(char)) valid++;
        }

        // 判断左侧窗口是否要收缩
        while (valid === needs.size) { // 3
            if (right - left < minLen) { 
                start = left;
                minLen = right - left;
            }
            // d 是将移出窗口的字符
            let d = s[left];
            // 左移窗口
            left++;
             // 进行窗口内数据的一系列更新
            if (needs.has(d)) { 
                if (window.get(d) === needs.get(d)) { 
                    valid--;
                }
                window.set(d, window.get(d) - 1);
            }
        }
    }

    // 返回最小覆盖子串
    return minLen == Infinity ?
        "" : s.substr(start, minLen);
};

console.log(minWindow('adobecobaebank','abc'));
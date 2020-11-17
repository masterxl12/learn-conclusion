// ! leetCode 438. 找到字符串中所有字母异位词

/**
 * @description 给定一个字符串 s 和一个非空字符串 p，
 * 找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。
 * 
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {

    let left = 0,
        right = 0,
        need = new Map(),
        window = new Map(),
        valid = 0;
    let arr = [];
    
    for (let s of p) { 
        need.set(s, (need.get(s) || 0) + 1);
    }

    while (right < s.length) {
        let c = s[right];
        right++;
        if (need.has(c)) { 
            window.set(c, (window.get(c) || 0) + 1);
            if (need.get(c) === window.get(c)) valid++;
        }

        while (right - left >= p.length) {
            let d = s[left];
            if (valid === need.size) { 
                arr.push(left);
            }
            left++;
            if (need.has(d)) { 
                if (need.get(d) === window.get(d)) valid--;
                window.set(d, window.get(d) - 1);
            }
        }
    }

    return arr;
};
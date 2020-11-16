// ! 567. 字符串的排列

/**
 * @description
 * 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
   换句话说，第一个字符串的排列之一是第二个字符串的子串。
 * 
 * @param {string} s1   'ab'
 * @param {string} s2    'ddfdfdkab'
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    let left = 0, right = 0;
    
    let need = new Map();
    let temp = new Map();
	for (const s of s1) {
        need.set(s, (need.get(s) || 0) + 1);
	}
    let valid = 0;
    while(right < s2.length) {
        let c = s2[right];
        right++;
        if(need.has(c)) {
            temp.set(c, (temp.get(c) || 0) + 1);
            if(need.get(c) === temp.get(c)) valid++;
        }
        while(right - left >= s1.length) {
            let d = s2[left];
            if(valid === need.size) {
                return true
            }
            left ++;
            if(need.has(d)) {
                if(need.get(d) === temp.get(d)) valid--;
                temp.set(d, temp.get(d) - 1);
            }
        }
    }
    return false;

/****

使用对象 + 滑动窗口

let need = {},temp = {};
    let left = 0,right = 0;
    let valid = 0;
    for(const n of s1) need[n] ? need[n] ++ : need[n] = 1;
    while(right < s2.length) {
        let c = s2[right];
        right++;
        if(need[c]) {
            temp[c] ? temp[c]++: temp[c] = 1;
            if(need[c] === temp[c]) valid++;
        }
        while(right - left >= s1.length) {
            let d = s2[left];
            if(valid === Object.keys(need).length) {
                return true
            }
            left ++;
            if(need[d]) {
                if(need[d] === temp[d]) valid--;
                temp[d]--;
            }
        }
    }
    return false
 */

};
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */


/*
var minWindow = function(s, t) {
        let start = 0,
        left = 0,
        right = 0,
        minLen = Infinity;

    let needs = {};
    let window = {};

    let objSetKey = function (obj, key) {
        if (obj[key]) {
            obj[key]++
        } else {
            obj[key] = 1;
        }
    };

    for (let i = 0; i < t.length; i++) {
        objSetKey(needs, t[i]);
    }

    // 记录匹配上的索引
    let match = 0;
    let len = s.length;
    while (right < len) {
        let c1 = s[right];
        if (needs[c1]) {
            objSetKey(window, c1);
            if (needs[c1] === window[c1]) {
                match++;
            }
        }
        right++;
        while (match === Object.keys(needs).length) {
            if (right - left < minLen) {
                start = left;
                minLen = right - left;
            }
            let c2 = s[left];
            if (needs[c2]) {
                window[c2]--;
                if (window[c2] < needs[c2]) match--;
            }
            left++;
        }
    }
    return minLen === Infinity ? "" : s.substr(start, minLen);
};
*/


var minWindow = function (s, t) {
    let start = 0,
        left = 0,
        right = 0,
        minLen = Infinity;

    let needs = new Map();
    let windows = new Map();

    for (let i of t) {
        needs.set(i, needs.has(i) ? needs.get(i) + 1 : 1);
    }

    // 记录匹配上的索引
    let match = 0;
    while (right < s.length) {
        let c1 = s[right];
        right++;

        if (needs.has(c1)) {
            windows.set(c1, windows.has(c1) ? windows.get(c1) + 1 : 1);
            if (needs.get(c1) === windows.get(c1)) match++;
        }

        while (match === needs.size) {
            if (right - left < minLen) {
                start = left;
                minLen = right - left;
            }
            let c2 = s[left];
            left++;
            if (needs.has(c2)) {
                if (needs.get(c2) === windows.get(c2)) {
                    match--;
                }
                windows.set(c2, windows.get(c2) - 1);
            }
        }
    }
    return minLen === Infinity ? "" : s.substr(start, minLen);
};

console.log(minWindow("ADOBECODEBANC", "ABC"));
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

function formatDate(date, fmt) { // fmt "yyyy-MM-dd hh:mm"
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

// let date = new Date();
// formatDate(date, "yyyy-MM-dd hh:mm");

for (let i = 1; i <= 12; i++) {
  let fmt = "yyyy-mm-dd";
  if (new RegExp(`(m+)`).test(fmt)) {
    let str = i + "";
    console.log(RegExp.$1);
    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
  }
  console.log(fmt)
};
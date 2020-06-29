// 06 外观模式

// 比如对document对象添加click事件的时候：
function addEventToDom(dom, type, fn) {
  if (dom.addEventListener) {
    // 支持DOM2级事件处理方法的浏览器
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    // 不支持DOM2级但支持attachEvent
    dom.attachEvent('on' + type, fn);
  } else {
    // 都不支持的浏览器
    dom[on + 'type'] = fn;
  }
}
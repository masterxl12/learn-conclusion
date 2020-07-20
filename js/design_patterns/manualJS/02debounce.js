function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) clearTimeout(timer);
        let _this = this;
        let args = [...arguments];
        timer = setTimeout(() => {
            fn.apply(_this, args);
        }, delay)
    }
}
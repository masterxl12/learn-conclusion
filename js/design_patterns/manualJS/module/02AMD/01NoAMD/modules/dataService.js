// 定义没有依赖的模块
(function (window) {
    let name = 'kobe';

    function getName() {
        return name;
    }
    window.dataService = {getName};
})(window)
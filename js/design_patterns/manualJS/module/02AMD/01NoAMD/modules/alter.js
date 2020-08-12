// 定义有依赖的模块
(function(window,dataService){
    let msg = 'this is module based on dependency';
    function showMsg(){
        console.log(msg,dataService.getName());
    }
    window.alter = {showMsg};
})(window,dataService)
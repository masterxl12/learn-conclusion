(function () {
    
    requirejs.config({
        baseUrl:'js/', // 基本路径 出发点在根目录下
        paths: {  // 配置路径
            dataService:'modules/dataService',
            alerter:'modules/alerter',
            jquery:'libs/jquery-1.10.1'  // jquery 支持amd规范
        } 
    })


    requirejs(['alerter'],function(alerter){
        alerter.showMsg();
    })
})()
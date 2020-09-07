define(function(require,exports,module){
    let data = 'module3';
    function fun(){
        console.log(data);
    }

    exports.vm = {fun}
})
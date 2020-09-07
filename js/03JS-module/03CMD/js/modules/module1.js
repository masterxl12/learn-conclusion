define(function (require,exports,module) {
    let data = 'module1';
    function foo(){
        console.log(data);
    }

    module.exports = {foo};
})
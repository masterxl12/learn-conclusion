import '../css/iconfont.css';
import '../css/index.less';
import print from "./print";

console.log('js文件被重新加载~');
print();

function add(x, y) {
    return x + y;
}

if (module.hot) {
    module.hot.accept('./print.js', () => {
        console.log('123')
        print();
    })
}

console.log(add(2, 3));
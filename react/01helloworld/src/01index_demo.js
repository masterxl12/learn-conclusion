import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


// JSX 语法
// let app = <App />;  <App /> -> 普通对象
let app = <h1>hello world!</h1>;
// 函数式组件
function clock() {
    let element = (
        <div>
            <h1>当前时间: {new Date().toLocaleTimeString()}</h1>
        </div>
    );
    let root = document.querySelector('#root');
    ReactDOM.render(element, root);
}

// setInterval(clock, 1000);

let a = 123;

function Clock(props) {
    return (
        <div>
            <h1>{props.date.toLocaleTimeString()}</h1>
            <p>函数式组件开发</p>
        </div>
    )
}

function run() {
    let root = document.querySelector('#root');
    ReactDOM.render(<Clock date={new Date()} />, root)
}

setInterval(run, 1000);



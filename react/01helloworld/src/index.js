import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';

// JSX 语法
let a = Math.random(0, 1) - 0.5;

// ! 使用className
let classArr = ['bgc', 'bt'].join(" ");

// ! 使用style
let imageStyle = {
    backgroundColor: "rgba(255, 0, 0, .5)"
}

// ! 使用src
let src = 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png';

let element = (
    <div>
        {/** 使用类名 */}

        <h1 className={'abc ' + classArr} >今天天气: {a > 0 ? 'sunshine' : 'rain'}</h1>
        <h2>{Math.random(0, 1) - 0.5 > 0 ? <button>出去嗨皮~</button> : '居家玩耍'}</h2>
        <img src={src} style={imageStyle} />
        <img src={src} style={{ backgroundColor: 'green', border: '3px solid yellow' }} />
    </div>
)

ReactDOM.render(element, document.querySelector('#root'));




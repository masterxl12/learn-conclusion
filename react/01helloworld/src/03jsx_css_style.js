import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';

// JSX_Style 

let classStr = ['a', 'b'].join(' ')

let exampleStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255,0,0,.5)',
    backgroundImage: 'url(https://store-cdn.lizhi.io/pic/thumb/img/d8X4Bbsabe2cFck4LczbIaw7M6j9A1w2N6T8Iaw4L2z4I3wdMfjdA7w5N5TeIew3MDMxMTQwNDMxLnBuZwO0O0OO0O0O)'
}

let element = (
    <div>
        {/** 注释内容部分 */}
        <h2 className={'str ' + classStr}>react-class属性</h2>
        <div style={exampleStyle}>react-style</div>
    </div>
)

/**
 * 
 * _props   -> {user:  props.author } 
 *          -> _props.user = 
 * 
 */

ReactDOM.render(element, document.querySelector('#root'));




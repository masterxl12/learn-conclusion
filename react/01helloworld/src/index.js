import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';

// 函数组件与类组件

// 类组件
class HelloWorld extends React.Component {
    render() {
        console.log(this)
        return (
            <div>
                <h1>类组件: {this.props.name}</h1>
                <Weather weather={this.props.weather} />
            </div>
        );
    }
}

// 函数组件
function Weather(props) {
    console.log('函数组件: ', props);
    return (
        <div>
            <h1>今天是否出门: {props.weather == '下雨' ? '宅家' : '出门'}</h1>
        </div>
    )
}

// ReactDOM.render(<Weather weather='下雨' />, document.querySelector('#root'));
ReactDOM.render(<HelloWorld name='helloWorld!' weather='sunshine' />, document.querySelector('#root'));




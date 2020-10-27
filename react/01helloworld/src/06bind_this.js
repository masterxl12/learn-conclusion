import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// const STR = "被调用，this指向";
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date().toLocaleTimeString(),
            count: 0
        };
        this.handler = this.handler.bind(this);
    }

    // 普通函数 this是执行时的上下文
    // 箭头函数 this是定义时的上下文
    componentDidMount() {
        setTimeout(function () {
            console.log('==========', this); // window
        }, 1000);

        setInterval(() => {
            console.log(this);               // 当前组件实例
            this.setState({
                time: new Date().toLocaleTimeString()
            })
        }, 1000);
    }

    timer() {

    }

    handler() {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        // render函数中的this指向组件实例
        // this.handler();
        // window.handler = this.handler;
        // window.handler();
        return (
            <div>
                <h1>{this.state.time}</h1>
                <h2>计数器：{this.state.count}</h2>
                <input type="button" value="计数器" onClick={this.handler} />
            </div>
        );
    }
}
{/* 
    普通函数是this执行时的上下文，点击按钮，调用handleClick来处理事件，
    this.handleClick中的this指向的还是这个类，因为render首先只是渲染虚假的dom树，
    但当真正插入节点后，我们点击按钮，
    执行环境也就变成了HTML页面，this这时已经指向了button组件，所以找不到相应的函数。
    
    使用  onClick={this.handler.bind(this)}
    在原来基础上，bind函数是创建一个新函数，称为绑定函数，
    将调用绑定函数的函数绑定到bind的第一个参数上。
    再渲染虚假dom树时，this指向Example这个类，相当于Example.handleClick.bind(Example)，
    把handleClick这个函数绑定到Example类，使得this始终指向Example。                                
*/}
ReactDOM.render(<App />, document.querySelector("#root"));
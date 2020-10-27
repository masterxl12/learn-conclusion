import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './statics/css/tab.css'


const c1 = 'content active';
const c2 = 'content';

// 函数组件与类组件
class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            c1,
            c2
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        if (e.target.tabIndex === 1) {
            this.setState({
                c1: c1,
                c2: c2
            })
        } else {
            this.setState({
                c1: c2,
                c2: c1
            })
        }
    }

    render() {
        return (
            <div>
                <button tabIndex='1' onClick={this.clickHandler}>按钮一</button>
                <button tabIndex='2' onClick={this.clickHandler}>内容二</button>
                <div className={this.state.c1}>内容一</div>
                <div className={this.state.c2}>内容二</div>
            </div>
        );
    }
}

ReactDOM.render(<Tab />, document.querySelector("#root"))

export default Tab;




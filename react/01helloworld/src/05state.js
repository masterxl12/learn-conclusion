import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// 函数组件与类组件
class Clock extends Component {
  constructor(props) {
    super(props);
    // 构造函数初始化数据，将需要改变的数据放到state中
    this.state = {
      time: new Date().toLocaleTimeString()
    }
  }

  // 生命周期函数，在render函数渲染之后使用
  componentDidMount() {
    console.log('componentDidMount');
    setInterval(() => {
      // this.state.time = new Date().toLocaleTimeString();
      // 修改数据的方式使用 setState
      this.setState({
        time: new Date().toLocaleTimeString()
      })
    }, 1000);
  }


  render() {
    console.log('render函数调用');
    return (
      <div>
        <h1>当前时间: {this.state.time}</h1>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.querySelector('#root'));
export default Clock;




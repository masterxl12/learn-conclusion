import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// ! react中的事件  阻止默认事件  e.preventDefault()

// ! 获取input输入框的内容

// ! 对于数组中的state 如果数据中有数组 第一次操作数组push，shift等操作时，原始数组已不再是数组而是一串字符串

// ! 不能直接修改原始数据

class EventCompent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      data: ['javascript', 'c++', 'java'],
      skills: ''
    }
  }

  handleSubmit = () => {
    console.log(this.refs.input.value)    // 方法一
    console.log(this.inputdata.value)     // 方法二

    this.setState({
      msg: this.inputdata.value
    })
  }

  handler = (value, e) => {
    e.preventDefault();
    const { data } = this.state;
    data.push(value);
    this.setState({
      data,
      skills: data.join('*')
    })
  }

  render() {
    return (
      <div>
        {/* 方式一 */}
        <input type='text' ref='input' defaultValue="Hello" />
        <button type='submit' onClick={this.handleSubmit}>Submit</button>

        {/* 方式二 */}
        <input type='text' ref={(val) => this.inputdata = val} defaultValue="Hello" />
        <p>{this.state.msg}</p>

        <form action="http://wwww.baidu.com">

          <button onClick={(e) => { this.handler('python', e) }}>获取事件</button>
          <h2>{this.state.skills}</h2>
        </form>

      </div >
    )
  }
}

ReactDOM.render(<EventCompent />, document.querySelector('#root'))

export default EventCompent;
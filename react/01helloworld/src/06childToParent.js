import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// ! 子组件向父组件传值  找到父子组件通信的桥梁  此处是toParent 

// ! 然后在子组件中通过props调用父组件的方法 this.props.toParent 等同于父组件中调用this.sendData

class ParentCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiveMsg: ''
    }
  }

  sendData = (data) => {
    this.setState(state => (
      {
        receiveMsg: data
      }
    ))
  }


  render() {
    return (
      <div>
        <h1>父组件接收子组件数据: {this.state.receiveMsg}</h1>
        <ChildCom toParent={this.sendData} />
      </div>
    );
  }
}


class ChildCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Data from Child"
    }
  }

  postData = () => {
    this.props.toParent(this.state.msg)
  }

  render() {
    return (
      <div>
        <h2>来自子元素数据: {this.state.msg}</h2>
        <button onClick={this.postData}>子传父一</button>
        <button onClick={() => this.props.toParent('abcdefg')}>子传父二</button>
      </div>
    );
  }
}

ReactDOM.render(<ParentCom />, document.querySelector('#root'))


export default ParentCom;
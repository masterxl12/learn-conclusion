import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './statics/css/tab.css'

// ! 父组件向子组件传值  父组件中使用state 子组件使用props接收

class ParentCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.changHandler = this.changHandler.bind(this);
  }

  changHandler() {
    this.setState(state => ({
      active: !state.active
    }))
  }

  render() {
    return (
      <div>
        <input type="button" value="控制子元素显示" onClick={this.changHandler} />
        <ChildCom active={this.state.active} />
      </div>
    );
  }
}


class ChildCom extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    console.log(this.props);

    let str = this.props.active ? ' active' : ''
    return (
      <div>
        <h1 className={'content' + str}>显示子组件</h1>
      </div>
    );
  }
}

ReactDOM.render(<ParentCom />, document.querySelector('#root'))


export default ParentCom;
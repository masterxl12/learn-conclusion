import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 状态 state

class Clock extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            date: new Date()
        }
    }

    render() {
        return (
            <div>
                <h1>当前时间: {this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }

}

ReactDOM.render(<Clock />, document.querySelector('#root'));
export default Clock;
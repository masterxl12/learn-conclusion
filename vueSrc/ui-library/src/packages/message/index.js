import {createApp} from "vue";
import MessageComponent from './MessageComponent';

const wrapper = document.createElement('div');

let style = {
    position: 'absolute',
    color: 'skyblue',
    left: '50%',
    top: '50%',
    height: '200px',
    width: '300px',
    background: 'rgba(0,0,0,.2)',
    "text-align": 'center'
};

for (let key in style) {
    wrapper.style[key] = style[key];
}
document.body.appendChild(wrapper);

const Message = (options) => {
    // 最终调用的此方法 Message({type:'info',message:''}) Message.success({message:''})
    const messageBox = document.createElement('div');
    let app = createApp(MessageComponent, options);
    app.mount(messageBox); // $el
    wrapper.appendChild(messageBox);
    // 延迟卸载组件

    setTimeout(() => {
        app.unmount(messageBox);
        wrapper.removeChild(messageBox);
    }, options.duration || 10000)
};

['success', 'info', 'warning', 'error', 'danger'].forEach(type => {
    Message[type] = function (options) {
        options.type = type;
        return Message(options);
    }
});

export default Message;
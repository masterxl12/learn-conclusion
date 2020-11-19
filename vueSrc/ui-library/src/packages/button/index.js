import Button from './button.vue';
import "../../styles/button.scss"


// * button 组件可以单独使用
// * import {Button} from 
// * app.use(Button)

Button.install = (app) => {
    app.component(Button.name, Button)
};

export default Button;
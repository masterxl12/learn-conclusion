import ButtonGroup from './button-group.vue'


// * button 组件可以单独使用
// * import {Button} from 
// * app.use(Button)

ButtonGroup.install = (app) => {
  app.component(ButtonGroup.name, ButtonGroup)
}

export default ButtonGroup;
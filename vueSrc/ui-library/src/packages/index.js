// * 总入口

import Button from './button';
import ButtonGroup from './button-group';
import Icon from './icon';

// ! 几个组件一起打包

const plugins = [
  Button,
  ButtonGroup,
  Icon
]

const install = (app) => {
  plugins.forEach(plugin => app.use(plugin))
}

export default {
  install,
}


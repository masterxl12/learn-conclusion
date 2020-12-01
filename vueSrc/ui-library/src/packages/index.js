// * 总入口

import Button from './button';
import ButtonGroup from './button-group';
import Icon from './icon';
import Carousel from "./carousel";
import CarouselItem from "./carousel-item";
import Message from "./message";
import Tree from "./tree"

// ! 几个组件一起打包

const plugins = [
    Button,
    ButtonGroup,
    Icon,
    Carousel,
    CarouselItem,
    Tree
];

const install = (app) => {
    plugins.forEach(plugin => app.use(plugin))
};

export default {
    install,
}

export {
    Icon,
    Button,
    ButtonGroup,
    Message
}


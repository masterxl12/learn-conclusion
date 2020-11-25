import Carousel from './carousel'
import "../../styles/carousel.scss"

Carousel.install = (app) => {
    app.component(Carousel.name, Carousel)
};

export default Carousel;
import CarouselItem from '../carousel/carousel-item'
import "../../styles/carousel-item.scss"

CarouselItem.install = (app) => {
    app.component(CarouselItem.name, CarouselItem)
};

export default CarouselItem;
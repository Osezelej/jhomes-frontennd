import Carousel from "react-material-ui-carousel"
export default function CarouselContainer({images, imageHeight}){
    return <div className="Carousel-container">
            <Carousel duration={1000} indicators={false}   animation="slide" >
                {images.map((image, id)=>{
                    return <div className="imageContainer" key={id}>
                        <img loading="lazy" alt="carousel" src={image} />
                    </div>
                })}
            </Carousel>
    </div>
}
import { createRef } from "react";
import { ServerURL, getData } from "../../Services/FetchBackendData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function FeaturedComponent(props) {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false
    };

    var myslider = createRef();
    // var images = props.images;

    const images = [
        { id: 1, images: 'http://localhost:5000/images/f1.png' },
        { id: 2, images: 'http://localhost:5000/images/f2.png' },
        { id: 3, images: 'http://localhost:5000/images/f3.png' },
        { id: 4, images: 'http://localhost:5000/images/f4.jpg' },
        { id: 5, images: 'http://localhost:5000/images/f5.jpg' },
        { id: 6, images: 'http://localhost:5000/images/f6.jpg' },
        { id: 7, images: 'http://localhost:5000/images/f7.jpg' },
    ];

    const playSlide = () => {
        return images.map((item) => {
            return (
                <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <img src={`${ServerURL}/images/${item.image}`} style={{ borderRadius: 20, margin: 20, width: 365, height: 170 }} />
                </div>
            )
        })
    }

    const handleClickLeft=()=>{
        myslider.current.slickPrev();
    }

    const handleClickRight=()=>{
        myslider.current.slickNext()
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 5, paddingTop: 10 }}>
                <span style={{ color: '#bdc3c7', fontWeight: 'bold', fontSize: 28, marginLeft: 25 }}>Featured</span>
                <span><KeyboardArrowLeftIcon style={{fontSize: 34}} onClick={handleClickLeft}/> <KeyboardArrowRightIcon style={{fontSize: 34}} onClick={handleClickRight}/></span>
            </div>
            <Slider ref={myslider} {...settings}>
                {playSlide()}
            </Slider>
        </div>
    )
}
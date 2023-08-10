import { React, useState, useEffect, createRef } from 'react'
import { useStyles } from './OfferCss';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData, ServerURL } from '../../Services/FetchBackendData';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function Offer(props) {

    const [offers, setOffers] = useState([]);
    const mySlider = createRef();
    const classes = useStyles();

    const fetchOffer = async () => {
        var result = await getData('user/display_offer');
        setOffers(result.data);
    }

    useEffect(function () {
        fetchOffer()
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };


    const playSlide = () => {
        return offers.map((item) => {
            return (
                <div key={item.offerid}>
                    <div style={{
                        position: "relative",
                        borderRadius: 20,
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 2px 0 rgb(0 0 0 / 7%)",
                        width: 425,
                        height: 120,
                        margin: 20}}>
                        <span style={{
                            display: "inline-block",
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            height: "50px",
                            width: "50px",
                            left: "20px"
                        }}>
                            <img style={{
                                height: '6vh',
                                width: '20vh',
                                
                            }}
                                src={`${ServerURL}/images/${item.icon}`} />
                        </span>
                        <h4 style={{
                            fontFamily: "Poppins",
                            fontStretch: "normal",
                            fontStyle: "normal",
                            letterSpacing: "normal",
                            margin: 0,
                            fontWeight: 600,
                            fontSize: 20,
                            position: "relative",
                            left: '45%',
                            top: '15%'
                        }}>
                            {item.title}
                        </h4>
                        <p style={{
                            fontFamily: "Poppins",
                            fontStretch: "normal",
                            fontStyle: "normal",
                            letterSpacing: "normal",
                            margin: 0,
                            fontWeight: 400,
                            fontSize: 15,
                            position: "absolute",
                            left: '45%',
                            top: '35%',
                            color: "rgba(18,34,50,.7)",
                            right: 4
                        }}>
                            {item.description}
                        </p>
                    </div>
                </div>
            )
        })
    }

    const handleLeftClick = () => {
        mySlider.current.slickPrev()
    }

    const handleRightClick = () => {
        mySlider.current.slickNext()
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 5, paddingTop: 10 }}>
                <span style={{ color: '#bdc3c7', fontWeight: 'bold', fontSize: 28, marginLeft: 25 }}>Offers</span>
                <span> <KeyboardArrowLeftIcon style={{ fontSize: 34 }} onClick={handleLeftClick} /> <KeyboardArrowRightIcon style={{ fontSize: 34 }} onClick={handleRightClick} />
                </span>
            </div>
            <Slider ref={mySlider} {...settings}>
                {playSlide()}
            </Slider>
        </div>
    )
}
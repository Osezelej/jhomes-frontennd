
import Navigation from "../components/navigationBar";
import '../css/pagecss/homeDescription.css';
import { HomeRounded, FamilyRestroomRounded, BedRounded, DiningRounded, BathroomRounded, ChairRounded } from "@mui/icons-material";
import Home1 from '../assets/home1.jpg';
import Home2 from '../assets/home2.jpg';
import Home3 from '../assets/home3.jpg';
import Home4 from '../assets/home4.jpg';
import Home5 from '../assets/home5.jpg';
import Home6 from '../assets/home6.jpg';
import Home7 from '../assets/home7.jpg';
import Home8 from '../assets/home8.jpg';
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import ScreenModal from "../components/loginComp";
import Carousel from "react-material-ui-carousel";

export default function Homedescription(){
    const featureData = [
        {
            icon:HomeRounded,
            type:'Home Type',
            value:'Duplex'
        },
        {
            icon:BedRounded,
            type:'Bedroom',
            value:'3'
        },
        {
            icon:BathroomRounded,
            type:'Bathroom',
            value:'3'
        },
        {
            icon:FamilyRestroomRounded,
            type:'Toilet',
            value:'3',
        },
        {
            icon:DiningRounded,
            type:'Dinning room',
            value:'3'
        },
        {
            icon:ChairRounded,
            type:'Sittingroom',
            value:'3'
        }
    ]
    const carouselImages = [Home1, Home2,Home3,Home4,Home5,Home6,Home7,Home8];
    const [activityIndicator, setActivityIndicator] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    return <main style={{overflow:'hidden'}}>
        <Navigation isLogin={false} openModal={setOpenModal}/>
        
        <ScreenModal open={openModal} onClose={()=>setOpenModal(prev=>!prev)} />
        <div className="pagebody des-pagebody mobile">
            <Carousel duration={1000} indicators={false} >
                        {carouselImages.map((value, index)=>{
                            return<div className="image-container" key={index}>
                                <img alt="home" src={value}/>
                            </div>
                        })}
            </Carousel>
            <div className="info-agent-container">
                    <div className="info-container" >
                        <div className="price-info-container">
                            <h2>$50,000</h2>
                            <p >3bd | 3ba | 3toi | 4sit</p>
                        </div>
                        <div className="address-container">
                            <p>21, Ogunyomi Street, Oworoshoki, Kosofe, Lagos, Nigeria.</p>
                        </div>
                        <div className="desc-info-container">
                            <div className="redbutton"></div>
                            <p className='bold'> for sale</p>
                        </div>
                    </div>
                    <div className="agent-container">
                        <button className="contact-agent-button"  disabled={activityIndicator} onClick={()=>{
                           setActivityIndicator(true)
                           setTimeout(()=>setActivityIndicator(false), 3000)
                        }}>
                           {activityIndicator ? <ClipLoader size={20} color="white"/>:<p>Contact agent</p>} 
                        </button>
                        
                    </div>
                </div>
                <div className="fact-feature-container">
                <div className="feature-container">
                    <h2>Home Features</h2>
                    <div className="icon-textcontainer">
                            {featureData.map((data, index)=>{
                                return<div className="icon-text" key={index}> 
                                    <data.icon htmlColor="#A11BB7" fontSize="large"/>
                                    <p className="text"><b>{data.value}</b> {data.type !== 'Home Type' && data.type}</p>
                                </div>
                            })}
                    </div>
                </div>
        </div>
            </div>
            
        <div className="pagebody des-pagebody desktop">
            <div className="info-features-detail-comnponent">
            <div className="info-agent-container">
                    <div className="info-container" >
                        <div className="price-info-container">
                            <h2>$50,000</h2>
                            <p >3bd | 3ba | 3toi | 4sit</p>
                        </div>
                        <div className="address-container">
                            <p>21, Ogunyomi Street, Oworoshoki, Kosofe, Lagos, Nigeria.</p>
                        </div>
                        <div className="desc-info-container">
                            <div className="redbutton"></div>
                            <p className='bold'> for sale</p>
                        </div>
                    </div>
                    <div className="agent-container">
                        <button className="contact-agent-button"  disabled={activityIndicator} onClick={()=>{
                           setActivityIndicator(true)
                           setTimeout(()=>setActivityIndicator(false), 3000)
                        }}>
                           {activityIndicator ? <ClipLoader size={20} color="white"/>:<p>Contact agent</p>} 
                        </button>
                        
                    </div>
                </div>
                
            </div>
            <div className="fact-feature-container">
                <div className="feature-container">
                    <h2>Home Features</h2>
                    <div className="icon-textcontainer">
                            {featureData.map((data, index)=>{
                                return<div className="icon-text" key={index}> 
                                    <data.icon htmlColor="#A11BB7" fontSize="large"/>
                                    <p className="text"><b>{data.value}</b> {data.type !== 'Home Type' && data.type}</p>
                                </div>
                            })}
                    </div>
                </div>
           
            </div>
            <div className="desc-images-container">
                {carouselImages.map((value, index)=>{
                    return <div key={index} className="desc-image-container">
                            <img alt="home" src={value}/>
                    </div>
                })}
            </div>
        </div>
    </main>
}
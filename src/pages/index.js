import Navigation from "../components/navigationBar";
import Image1 from '../assets/bg1.jpg';
import Image2 from '../assets/bg2.jpg';
import Image3 from '../assets/bg3.jpg';
import Image4 from '../assets/bg4.jpg';
import Image5 from '../assets/bg5.jpg';
import Home1 from '../assets/home1.jpg';
import Home2 from '../assets/home2.jpg';
import Home3 from '../assets/home3.jpg';
import Home4 from '../assets/home4.jpg';
import Home5 from '../assets/home5.jpg';
import Home6 from '../assets/home6.jpg';
import Home7 from '../assets/home7.jpg';
import Home8 from '../assets/home8.jpg';
import CarouselContainer from "../components/carousel";
import '../css/pagecss/index.css';
import SearchIcon from '../assets/search.png';
import {EmailRounded, PhoneRounded, WarningOutlined } from "@mui/icons-material";
import BottomNavigation from "../components/bNavi";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import ScreenModal from "../components/loginComp";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/user";
import { registerLocation } from "../store/location";
import { Alert } from "@mui/material";


export default function Landing(){
    const dispatch = useDispatch();
    const carouselImages = [Image1,Home1, Home2, Image2,Home3,Home4,  Image3, Home5,Home6, Image4,Home7, Image5, Home8];
    const styleButton = {
        backgroundColor:'#A11BB7',
        color:"white"
    }
    const navigate = useNavigate()
    const [bracket1, setBracket1 ] = useState(false);
    const [bracket2, setBracket2 ] = useState(false);
    const [bracket3, setBracket3 ] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [agentData, setAgentData] = useState('');
    const [errorAlert , setErrorAlert] = useState(false);
    
    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos)=>{
                const {latitude, longitude} = pos.coords;
                console.log({latitude, longitude})
                dispatch(registerLocation({lat:latitude, lng:longitude}));

            }, 
            (error)=>{
                setErrorAlert('LOCATION ERROR - an error occured while trying to get your location data.');
            }
            )
        }else{
            setErrorAlert('BROWSER ERROR - your browser does not support geolocation, change your browser for better expreience');
        }
        setAgentData(sessionStorage.getItem('jhmoesAgentid'));
        if (agentData){
           let data = JSON.parse(agentData);
           dispatch(registerUser({
            username:data.username,
            id:data.agentid,
            phonenumber: data.phonenumber,
            email:data.email,
            loading:false,
            isAuth:true,
        }))
           
        }
    }, [agentData])

    
    return <main>
        <Navigation isLogin={(typeof agentData == 'string' && agentData.length > 0) ? true : false} openModal={setOpenModal}/>
        <ScreenModal open={openModal} onClose={()=>setOpenModal(prev=>!prev)} />
        {errorAlert && <Alert severity='error' onClose={()=>{setErrorAlert(false)}}>{errorAlert}</Alert>}
        <div className="pagebody">
            <div className="carousel-input-container">
                <CarouselContainer images={carouselImages} />
                <div className="search-comp-container" onClick={()=>navigate('/search')}>
                        <h2>Buy, Rent and Sell A Home Seamlessly on <span >Jhomes</span></h2>
                        <div className="index-search-container">
                            <input className="index-seachNavi" name="search" placeholder="Find by Location, Price, Bedroom..."/>
                            <img alt="search" src={SearchIcon} width={25} height={25}/>
                        </div>
                </div>
            </div>
            
            <div className="postahome-signin-container">
                <div className="postahome-container">
                    <p>
                        Post your Home on <span style={{color:'#9317a7', fontWeight:'700', fontStyle:'italic'}}>Jhomes</span> to Sell and Rent, Fast and Easy!!!
                    </p>
                </div>
                <div className="postahome-button-container">
                        <button className="post" onClick={()=>{
                            navigate('/agent/login')
                        }}>
                            Post A Home 
                        </button>
                </div>
            </div>
            <div className="contact-us-container" >
                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <h2 style={{fontSize:27, marginTop:20}}>About us</h2>
                    <div className="content-container" >
                    <p style={{textAlign:'justify', marginLeft:0}}><span style={{color:'#9317a7', fontWeight:'700', fontStyle:'italic'}}>Jhomes</span> is a Platform where Home Agent(realtors) and Home Owners advertise their beautiful home for Sale or for Lease Fast and easy!, <b><em>Jhomes</em></b> connects buyer and renters to Agent or Home Owners. </p>
                    </div>
                    <div className="content-container"  >
                        <WarningOutlined  htmlColor="#b71b57" fontSize="large"/>
                        <p style={{textAlign:'justify'}}><b><em>Jhomes</em></b> is a Home advertisement platform and  does sell or lease a home and do not have any involvement with the agent or
                        Home owner. please before making any transaction Ensure you have gone for inspection and have done your research about the home and confirm it is legit.
                        <b><em>Jhomes</em></b> will not be held responsible for any transaction on this platform.
                        <a href="#contact" onClick={(e)=>{e.preventDefault()}}>Contact Us</a> to report any Agent or home Owner.
                    </p>
                    </div>
                </div>
                
            </div>
            <div className="moreDetails-container" >

                   <div  
                        className="details-container" 
                        onMouseEnter={()=>{setBracket1(true)}} 
                        onMouseLeave={()=>{setBracket1(false)}}
                        onClick={()=>{navigate('/search')}}>
                        <h2>Buy a Home</h2>
                        <p>Find your Perfect Home to Buy from our Home  Listings, with immersive image experience, communicate with Agent, And get your perfect deal Stress free!.</p>
                        <button style={bracket1 ? styleButton : {}}>Browse Home</button>
                   </div>
                    <div  
                        className="details-container" 
                        onMouseEnter={()=>{setBracket2(true)}} 
                        onMouseLeave={()=>{setBracket2(false)}}
                        onClick={()=>navigate('/agent/login')}>
                     <h2>Sell a Home</h2>
                     <p>Post your Home to our Home MarketPlace, and get biders now!.</p>
                     <button style={bracket2 ? styleButton : {}}>Post Home</button>
                   </div>
      
                    <div  
                        className="details-container" 
                        onMouseEnter={()=>{setBracket3(true)}} 
                        onMouseLeave={()=>{setBracket3(false)}}
                        onClick={()=>{navigate('/search')}}>
                    <h2>Rent a Home</h2>
                    <p>Find your Perfect Home to Rent from our Home Listings, with immersive image experience, communicate with Agent, And get your perfect deal Stress free!.</p>
                    <button style={bracket3 ? styleButton : {}}>Browse Home</button>
                    </div>
                
            </div>
            <div className="contact-us-container" id="contact">
                <h2>Contact us</h2>
                <div>
                    <EmailRounded htmlColor="#A11BB7" fontSize="large"/>
                    <p>2osezelejoseph@gmail.com</p>
                </div>
                <div>
                    <PhoneRounded htmlColor="#A11BB7" fontSize="large"/>
                    <p>08076320300</p>
                </div>
            </div>
        </div>
        <BottomNavigation/>
    </main>
}
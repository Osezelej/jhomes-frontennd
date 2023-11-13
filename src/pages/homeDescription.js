
import Navigation from "../components/navigationBar";
import '../css/pagecss/homeDescription.css';
import { HomeRounded, 
    FamilyRestroomRounded, 
    BedRounded, 
    DiningRounded, 
    BathroomRounded, 
    ChairRounded,  
    Phone } from "@mui/icons-material";
import Home1 from '../assets/home1.jpg';
import Home2 from '../assets/home2.jpg';
import Home3 from '../assets/home3.jpg';
import Home4 from '../assets/home4.jpg';
import Home5 from '../assets/home5.jpg';
import Home6 from '../assets/home6.jpg';
import Home7 from '../assets/home7.jpg';
import Home8 from '../assets/home8.jpg';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import ScreenModal from "../components/loginComp";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { agenData } from "../store/user";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../config";
import { Alert } from "@mui/material";

export default function Homedescription(){
    // const navigate = useNavigate();
    //  to get the query parameter and the path parameter
    const location = useLocation();
    const searchParams = location.search;
    let searchsplit = searchParams.split('=');
    let agentId = searchsplit[1]
    let {id} = useParams(); // query parameter
    // console.log(id, agentId)

    // to get the home agent data
    async function getHomeAgent(){
        await axios.post(BaseUrl + '/graphql', {
            query:`{
                findoneAgent(agentid:"${agentId}"){
                    phoneNumber,
                    email,
                    username,
                }
            }`
        }).then((res)=>{
            console.log(res.data)
            setHomeAgentData(res.data.data.findoneAgent.phoneNumber);
        }).catch((err)=>{
            console.log(err)
            setAlertError('ERROR-An error occured while trying to load data, check your network and Try again');
        }).finally(()=>{
            setTimeout(()=>setActivityIndicator(false), 600)
        })
    }

    // to get the home data
    async function getHomeData(){
        setLoading(true)
        await axios.post(BaseUrl + '/graphql', {
            query:`{
                homeAgent(homeid:"${id}"){
                    id,
                    homeDesc{
                        bedroom,
                        bathroom, 
                        sittingroom,
                        toilet,
                        dinningroom,
                        kitchen,
                        homeType,
                        saleType,
                        others
                    },
                    homeAddress{
                        streetName,
                        country,
                        state,
                        lga
                    },
                    homePrice{
                        homePriceMonth,
                        homePriceYear
                    },
                    homeImage
                }
            }`
        }).then((res)=>{
            let homeData = res.data.data.homeAgent;
            let currFormat = new Intl.NumberFormat('en-US', {
                style:'currency',
                currency:'NGN'
            })
            let priceMonth = currFormat.format(parseInt(homeData.homePrice.homePriceMonth));
            let priceYear = currFormat.format(parseInt(homeData.homePrice.homePriceYear));
            setFeatureData( {
                homeDesc:[
                {
                    icon:HomeRounded,
                    type:'Home Type',
                    value:homeData.homeDesc.homeType
                },
                {
                    icon:BedRounded,
                    type:'Bedroom',
                    value:homeData.homeDesc.bedroom
                },
                {
                    icon:BathroomRounded,
                    type:'Bathroom',
                    value:homeData.homeDesc.bathroom
                },
                {
                    icon:FamilyRestroomRounded,
                    type:'Toilet',
                    value:homeData.homeDesc.toilet,
                },
                {
                    icon:DiningRounded,
                    type:'Dinning room',
                    value:homeData.homeDesc.dinningroom
                },
                {
                    icon:ChairRounded,
                    type:'Sittingroom',
                    value:homeData.homeDesc.sittingroom
                }
            ],
            price:{
                month:priceMonth,
                year:priceYear
            },
            addr:homeData.homeAddress.streetName 
                 + ', ' + homeData.homeAddress.lga
                 + ', ' +  homeData.homeAddress.state + '.',
            saleType:homeData.homeDesc.saleType,
            other_info:homeData.homeDesc.others,
            homeImage:homeData.homeImage[0].split(',')
        }
            )
        }).catch((err)=>{
            console.log(err);
            setAlertError('ERROR-An error occured while trying to load data, check your network and Try again')
        }).finally(()=>{
            setLoading(false)
        })
    } 

    // load the home data 
    useEffect(()=>{getHomeData()}, [])
    
    const [alertError, setAlertError] = useState(false);
    const [homeAgentData, setHomeAgentData] = useState('');
    const [featureData, setFeatureData] = useState();
    const [loading, setLoading] = useState(true)
    const carouselImages = [Home1, Home2,Home3,Home4,Home5,Home6,Home7,Home8];
    const [activityIndicator, setActivityIndicator] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const agent = useSelector(agenData);
    return <main style={{overflow:'hidden'}}>
        <Navigation isLogin={agent.isAuth} openModal={setOpenModal}/>
        
        <ScreenModal open={openModal} onClose={()=>setOpenModal(prev=>!prev)} />
        {loading ? <p style={{
            display:"flex", 
            width:'100%',
            justifyContent:'center',
            marginTop:100,
            }}>
                <ClipLoader size={25} color="#9317a7"/>
            </p>:<div className="pagebody des-pagebody mobile">
        
            {alertError && <Alert severity='error' >
                <p onClick={()=>{getHomeData()}}>{alertError}. <span style={{fontWeight:'bolder'}}>Retry</span></p>
                </Alert>}
            <Carousel duration={1000} indicators={false} >
                        {featureData.homeImage.map((value, index)=>{
                            return<div className="image-container" key={index}>
                                <img alt="home" src={BaseUrl + `/${value}`}/>
                            </div>
                        })}
            </Carousel>
            <div className="info-agent-container">
                    <div className="info-container" >
                        <div className="price-info-container">
                            <h2>{featureData.price.year} <span style={{fontSize:13}}> / yr</span> <br/> 
                            {featureData.price.month} <span style={{fontSize:13}}> / mth</span>
                                </h2>
                        </div>
                        <div className="address-container">
                            <p>{featureData.addr}</p>
                        </div>
                        <p>{featureData.other_info}</p>
                        <div className="desc-info-container">
                            <div className="redbutton"></div>
                            <p className='bold'> for {featureData.saleType}</p>
                        </div>
                    </div>
                    <div className="agent-container">
                    {homeAgentData.length == 0 ? 
                    <button className= 'contact-agent-button'  disabled={activityIndicator} onClick={()=>{
                           setActivityIndicator(true);
                           getHomeAgent();
                        }}>
                           {activityIndicator ? <ClipLoader size={20} color="white"/>:<p>Contact agent</p>} 
                        </button>
                            :
                        <button className= 'contact-agent-button-outlined'  disabled={activityIndicator} onClick={()=>{
                           
                        }}>
                            <Phone htmlColor="#A11BB7" fontSize="medium"/>
                           <p>{homeAgentData}</p> 
                        </button>}
                        
                    </div>
                </div>
                <div className="fact-feature-container">
                <div className="feature-container">
                    <h2>Home Features</h2> 
                    <div className="icon-textcontainer">
                            {featureData.homeDesc.map((data, index)=>{
                                return<div className="icon-text" key={index}> 
                                    <data.icon htmlColor="#A11BB7" fontSize="large"/>
                                    <p className="text"><b>{data.value}</b> {data.type !== 'Home Type' && data.type}</p>
                                </div>
                            })}
                    </div>
                </div>
        </div>
            </div>}
            
            {loading ? <p>
            </p>: <div className="pagebody des-pagebody desktop">
            {alertError && <Alert severity='error' >
                    <p onClick={()=>{getHomeData()}}>{alertError}. <span style={{fontWeight:'bolder'}}>Retry</span></p>
                    </Alert>}
            <div className="info-features-detail-comnponent">
            <div className="info-agent-container">
                    <div className="info-container" >
                        <div className="price-info-container">
                            <h2>{featureData.price.year} <span style={{fontSize:13}}> / yr</span> <br/> 
                                {featureData.price.month} <span style={{fontSize:13}}> / mth</span>
                            </h2>
                            
                        </div>
                        <div className="address-container">
                        <p>{featureData.addr}</p>
                        </div>
                        <p>{featureData.other_info}</p>
                        <div className="desc-info-container">
                            <div className="redbutton"></div>
                            <p className='bold'> for {featureData.saleType}</p>
                        </div>
                    </div>
                    <div className="agent-container">
                    {homeAgentData.length == 0 ? 
                    <button className= 'contact-agent-button'  disabled={activityIndicator} onClick={()=>{
                           setActivityIndicator(true);
                           getHomeAgent();
                        }}>
                           {activityIndicator ? <ClipLoader size={20} color="white"/>:<p>Contact agent</p>} 
                        </button>
                            :
                        <button className= 'contact-agent-button-outlined'  disabled={activityIndicator} onClick={()=>{
                           
                        }}>
                            <Phone htmlColor="#A11BB7" fontSize="medium"/>
                           <p>{homeAgentData}</p> 
                        </button>}
                        
                    </div>
                </div>
                
            </div>
            <div className="fact-feature-container">
                <div className="feature-container">
                    <h2>Home Features</h2>
                    <div className="icon-textcontainer">
                            {featureData.homeDesc.map((data, index)=>{
                                return<div className="icon-text" key={index}> 
                                    <data.icon htmlColor="#A11BB7" fontSize="large"/>
                                    <p className="text"><b>{data.value}</b> {data.type !== 'Home Type' && data.type}</p>
                                </div>
                            })}
                    </div>
                </div>
           
            </div>
            <div className="desc-images-container">
                {featureData.homeImage.map((value, index)=>{
                    return <div key={index} className="desc-image-container">
                        <img alt="home" src={BaseUrl + `/${value}`}/>
                    </div>
                })}
            </div>
        </div>}
    </main>
}
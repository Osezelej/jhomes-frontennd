import FilterComp from "../components/filtercomp";
import SearchNavi from "../components/searchNavi";
import '../css/pagecss/search.css';
import Home1 from '../assets/home1.jpg';
import Home2 from '../assets/home2.jpg';
import Home3 from '../assets/home3.jpg';
import Home4 from '../assets/home4.jpg';
import Home5 from '../assets/home5.jpg';
import Home6 from '../assets/home6.jpg';
import Home7 from '../assets/home7.jpg';
import Home8 from '../assets/home8.jpg';
import ItemComp from "../components/ItemComp";
import BottomNavigation from "../components/bNavi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLocationData } from "../store/addr";
import { useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function Search(){
    const locationState = useSelector((state)=>state.location);
    const dispatch = useDispatch(); 

    const [count, setCount] = useState(34);
    const [bottomnavifb, setBottomnavifb] =useState({
        forward:false,
        forwardClicked:false,
        backward: true,
        backwardClicked:false
    });

    const filterData = [
        {
            title:"Sale Type",
            options:["Any","Rent", "Buy"]
        },
        {
            title:"Home Type",
            options:["Any", "Bungalow", "Storey", "Duplex"]
        },
        {
            title:"Bedrooms",
            options:["Any", "1", "2", "3", "4", "5", "6","more"]
        },
        {
            title:"Bathrooms",
            options:["Any", "1", "2", "3", "4", "5", "6","All in suite","more"]
        },
        {
            title:"Kitchens",
            options:["Any", "1", "2", "3", "4", "more"]
        },
        {
            title:"Sitting Room",
            options:["Any", "1", "2", "3", "4", "more"]
        }
    ];
    const demoImage = [Home1, Home2, Home3, Home4, Home5,Home6, Home7, Home8
    ]
    
    const data = [1,2,3,4,5]
    
    // to get the botttom  content navigtion 
    const [countData, setCountData] =useState( Array(Math.ceil(count/10)).fill(0).map((_, index)=>{
     let data =   index == 0 ? {num:index + 1, active:true}:{num:index + 1, active:false};
     return data;
    }));


    useEffect(()=>{
        if(typeof  locationState.lat != 'string' ){
            console.log(locationState)
            dispatch(getLocationData({lat:locationState.lat, lng:locationState.lng}))
            if(locationState.success){
                // send a request with the state posted and location to search api endpoint
            }
            if(locationState.error){
                //send a request without the state and the location
            }
        }else{
            // send a request without the state and the location
        }
    }, [locationState]);
    

    return <main>
        <SearchNavi filterData={filterData}/>
        
        <div className="pagebody search-main">
            <div className="items-container">
                {data.map((value, index)=><div 
                key={index} 
                className="pace-item-comp-container" 
                style={index === 0?{backgroundColor:'white'} 
                :index % 2 === 1?{backgroundColor:'#e27df238'}
                :{backgroundColor:'white'}}
                >
                    {/* <ItemComp images={demoImage}/> */}
                </div>)}
            </div>
            {count > 10 && <div className="bottom-content-container" style={{
                display:'flex', 
                gap:5,
                justifyContent:'center',
                alignItems:'center'
                }}  >
                {bottomnavifb.forward && (bottomnavifb.backwardClicked ? <p 
               
                >
<ArrowBackIos 
                style={{fontSize:20}}
                color="#A11BB7"
                />
                </p> : <p 
                >
<ArrowBackIos 
                style={{fontSize:20}}
                color="#666666"
                />
                </p> ) }


                {countData.map((value)=>{
                    if(value.active){
                        return <p style={{
                            color:"#A11BB7", 
                            margin:7, 
                            fontWeight:'bolder',
                            }}
                            onClick={(e)=>{
                                if(parseInt(e.target.innerText) > 1){
                                    setBottomnavifb((prev)=>{
                                        return {...prev, forward:true}
                                    })
                                }else{
                                    setBottomnavifb((prev)=>{
                                        return {...prev, forward:false}
                                    })
                                }
                                if (e.target.innerText == countData.length){
                                    setBottomnavifb((prev)=>{
                                        return {...prev, backward:false}
                                    })
                                }else{
                                    setBottomnavifb((prev)=>{
                                        return {...prev, backward:true}
                                    })
                                }
                                setCountData((prev)=>{
                                    return prev.map((value)=>{
                                        if (value.num == e.target.innerText){
                                            return {...value, active:true}
                                        }else{
                                            return {...value, active:false}
                                        }
                                    })
                                })
                            }}>{value.num}</p>
                    }
                    return <p style={{
                        margin:7, 
                        fontWeight:'bolder',
                        }}
                        onClick={(e)=>{
                            if(parseInt(e.target.innerText) > 1){
                                setBottomnavifb((prev)=>{
                                    return {...prev, forward:true}
                                })
                            }else{
                                setBottomnavifb((prev)=>{
                                    return {...prev, forward:false}
                                })
                            }
                            if (e.target.innerText == countData.length){
                                setBottomnavifb((prev)=>{
                                        return {...prev, backward:false}
                                    })
                            }else{
                                setBottomnavifb((prev)=>{
                                        return {...prev, backward:true}
                                    })
                            }

                            setCountData((prev)=>{
                                return prev.map((value)=>{
                                    if (value.num == e.target.innerText){
                                        return {...value, active:true}
                                    }else{
                                        return {...value, active:false}
                                    }
                                })
                            })
                        }}>{value.num}</p>
                })}


                {bottomnavifb.backward && (bottomnavifb.forwardClicked ? <p 
                    onClick={(e)=>{}}
                >
                <ArrowForwardIos 
                    style={{fontSize:20}}
                    color="#A11BB7"
                    />
                </p> : <p 
                >
<ArrowForwardIos
                style={{fontSize:20}}
                color="#666666"
                />
                </p> ) }          
            </div>}
        </div>
        <BottomNavigation/>
    </main>
}
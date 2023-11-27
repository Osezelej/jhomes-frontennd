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
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { BaseUrl } from "../config";

export default function Search(){
    const locationState = useSelector((state)=>state.location);
    const addrsState = useSelector((state)=>state.address);
    const dispatch = useDispatch(); 

    const [count, setCount] = useState(0);
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
    
    const [data, setData] = useState([])
    const [displayData, setDisplayData] = useState([])
    
    // to get the botttom  content navigtion 
    const [countData, setCountData] =useState( []);

    const [naviposition, setnaviposition] = useState(1);
    const [visibleIndex, setVisibleIndex] = useState({start:0, end:7});
    const [activityIndicator, setActivityIndicator] = useState(true);
    const [filtered, setFiltered] = useState({
        saletype:'',
        hometype:'',
        bedroom:'',
        bathroom:'',
        kitchen: '',
        sittingroom:''
    });
    
    // handles the fetch data
    async function fetchData(naviposition, state, city){
        setActivityIndicator(true)
     await axios.post(BaseUrl + '/graphql', {
        query:`{
            getHomeonLocation(city:"${city}", state:"${state}", skip:${naviposition}){
                count,
                homeData{
                    id,
                    agentId,
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
                        state,
                        lga,
                        country,
                        streetName
                    },
                    homePrice{
                        homePriceYear,
                        homePriceMonth
                    },
                    homeImage

                }
            }
        }`
     }).then((res)=>{
        // console.log(res.data.data.getHomeonLocation)
        let count = res.data.data.getHomeonLocation.count;
        let data = res.data.data.getHomeonLocation.homeData;
        console.log(typeof count)
        setCount(count);
        setData(data);
        setDisplayData(data)
     }).finally(()=>{
        setActivityIndicator(false)
     })
    }

    function findNdfiltter(letter, title, setOpenDrawer){
        setActivityIndicator(true);
        console.log(letter, title)
        let filter = {title, letter};
        console.log(filter)
        let newTitle = '';
        for (let i = 0; i < title.length; i ++){
            if (title[i] != ' '){
                newTitle += title[i].toLowerCase();
            }
            
        }
        filter.title = newTitle;
        console.log(newTitle)
        if (filter.title == 'saletype'){
            console.log(displayData)
            if( filter.letter.toLowerCase() != 'any'){
                setDisplayData((prev)=>{
                    return data.filter((value)=>{
                        if (filter.letter.toLowerCase() == 'rent'){
                            return value.homeDesc.saleType.toLowerCase() == filter.letter.toLowerCase();
                        }else{
                            return value.homeDesc.saleType.toLowerCase() == 'sell';
                        }
                    })
                })
            }
        }


        if (filter.title == 'hometype'){
            console.log(displayData)
            if( filter.letter.toLowerCase() != 'any'){
                setDisplayData((prev)=>{
                    return data.filter((value)=>{
                            return value.homeDesc.homeType.toLowerCase() == filter.letter.toLowerCase();
                       
                    })
                })
            }
        }
        

        if (filter.title == 'bedrooms'){
            console.log(displayData)
            if( filter.letter.toLowerCase() != 'any'){
                setDisplayData((prev)=>{
                    return data.filter((value)=>{
                            return value.homeDesc.bedroom == filter.letter;
                       
                    })
                })
            }
        }
        
        
        if (filter.title == 'bathrooms'){
            console.log(displayData)
            if( filter.letter.toLowerCase() != 'any'){
                setDisplayData((prev)=>{
                    return data.filter((value)=>{
                            return value.homeDesc.bathroom == filter.letter;
                       
                    })
                })
            }
        }

        
        if (filter.title == 'kitchens'){
            console.log(displayData)
            if( filter.letter.toLowerCase() != 'any'){
                setDisplayData((prev)=>{
                    return data.filter((value)=>{
                            return value.homeDesc.kitchen == filter.letter;
                       
                    })
                })
            }
        }
        
        if (filter.title == 'sittingroom'){
            console.log(displayData)
            if( filter.letter.toLowerCase() != 'any'){
                setDisplayData((prev)=>{
                    return data.filter((value)=>{
                            return value.homeDesc.sittingroom == filter.letter;
                       
                    })
                })
            }
        }
        setOpenDrawer(false)
        setTimeout(()=>{  
        setActivityIndicator(false)
        }, 2000)
    }

    useEffect(()=>{
        if(count > 0){
             let arr =Array(Math.ceil(count/10)).fill(0).map((_, index)=>{
                let data =   index == 0 ? {num:index + 1, active:true}:{num:index + 1, active:false};
                return data;
               })
            setCountData(arr)
        }
    }, [count])

    useEffect(()=>{
        
        console.log(naviposition)
        if(count > 0){
            
        fetchData(naviposition, addrsState.state, addrsState.city)
        }
        if(naviposition > 1){
            setCountData((prev)=>{
                return prev.map((value)=>{
                    if (value.num == naviposition){
                        return {...value, active:true}
                    }else{
                        return {...value, active:false}
                    }
                })
            
        })
        setBottomnavifb((prev)=>{
            return {...prev, forward:true}
        })
    }else{
        setCountData((prev)=>{
            return prev.map((value)=>{
                if (value.num == naviposition){
                    return {...value, active:true}
                }else{
                    return {...value, active:false}
                }
            })
        
    })
        setBottomnavifb((prev)=>{
            return {...prev, forward:false}
        })
    };

    if (naviposition == countData.length){
        setBottomnavifb((prev)=>{
            return {...prev, backward:false}
        })
    }else{
        setBottomnavifb((prev)=>{
            return {...prev, backward:true}
        })
    }

    if(naviposition > 7){
        setVisibleIndex((prev)=>{
            return {start:naviposition-7, end:naviposition}
        })
    }else{
        setVisibleIndex((prev)=>{
            return {start:0, end:7}
        })
    }
    
    }, [naviposition])

    useEffect(()=>{
        if(typeof  locationState.lat != 'string' ){
            console.log(locationState)
            dispatch(getLocationData({lat:locationState.lat, lng:locationState.lng}))
            if(addrsState.success){
                // send a request with the state posted and location to search api endpoint
                fetchData(naviposition, addrsState.state, addrsState.city);
            }
            if(addrsState.error){
                //send a request without the state and the location
                fetchData(naviposition, addrsState.address.state, addrsState.address.city);

            }
        }else{
            // send a request without the state and the location
        }
    }, [locationState]);
    

    
   
    return <main>
        <SearchNavi filterData={filterData} findNdFilter={findNdfiltter}/>
        
        <div className="pagebody search-main">
        {activityIndicator? <p style={{display:'flex', justifyContent:'center', paddingTop:100}}>
            <ClipLoader size={30} color="#A11BB7"/>
        </p>: <div>
        <div className="items-container">
                {displayData.length == 0 && <h4>Your kind of home is not available on our platform.</h4>}
                {displayData.map((value, index)=><div 
                key={index} 
                className="pace-item-comp-container" 
                style={index === 0?{backgroundColor:'white'} 
                :index % 2 === 1?{backgroundColor:'#e27df238'}
                :{backgroundColor:'white'}}
                >
                    <ItemComp homeDetails={value}/>
                </div>)}
            </div>
            {count > 10 && <div className="bottom-content-container" style={{
                display:'flex', 
                gap:5,
                justifyContent:'center',
                alignItems:'center'
                }}  >
                {bottomnavifb.forward &&  <p 
                    onClick={()=>{
                        if(naviposition != 1){
                            setnaviposition(naviposition - 1)
                        }
                    }}
                >
<ArrowBackIos 
                style={{fontSize:20}}
                />
                </p>  }


                {countData.slice(visibleIndex.start, visibleIndex.end).map((value)=>{
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
                            setnaviposition(parseInt(e.target.innerText))
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
                {visibleIndex.end < countData.length && <p> ...</p>}
                {countData.length > 7 && (visibleIndex.end < countData.length )?  countData[countData.length - 1].active ?   <p style={{
                        color:"#A11BB7",
                        margin:7, 
                        fontWeight:'bolder',
                        }} 
                        onClick={(e)=>{
                            
                    
                            
                        }}>{countData[countData.length - 1].num}</p>
                :<p style={{
                        margin:7, 
                        fontWeight:'bolder',
                        }} onClick={(e)=>{
                            setnaviposition(parseInt(e.target.innerText))
                            setCountData((prev)=>{
                                let lastItem = prev[prev.length - 1]
                                return prev.map((value)=>{
                                    if(value.num == lastItem.num){
                                        return{...value, active:true}
                                    }else{
                                        return{...value, active:false}
                                    }
                                })
                            })
                        }}> {countData[countData.length - 1].num}</p>: null}

                {bottomnavifb.backward &&<p 
                    onClick={(e)=>{
                        if(naviposition < countData.length){
                            setnaviposition(naviposition + 1)
                        }
                        
                    }}
                >
                <ArrowForwardIos 
                    style={{fontSize:20}}
                    color="#A11BB7"
                    />
                </p>  }          
            </div>}
        </div>}
           
        </div>
        <BottomNavigation/>
    </main>
}
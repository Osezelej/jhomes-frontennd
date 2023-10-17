import Navigation from "../components/navigationBar";
import "../css/pagecss/AddHome.css";
import { useState } from "react";
import { Collapse, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Naijastates from "naija-state-local-government";
import {useSelector, useDispatch} from 'react-redux';
import { registerhome } from "../store/signuphome";


export default function AddHome() {
  
  const dispatch = useDispatch()
  const [displaydata, setDisplayData] = useState([
    {
      title: "Country",
      content: ["Nigeria"],
    },
    {
      title: "State",
      content: Naijastates.states(),
    },
    {
      title: "lga",
      content: [...Naijastates.lgas("Abia").lgas],
    },
    {
      title: "homeType",
      content: ["Bungalow", "Storey", "Duplex"],
    },
    {
      title: "saleType",
      content: ["Sell", "Rent"],
    },
  ]);
  const [slideup, setslideup] = useState(true);
  const [slideup2, setslideup2] = useState(false);
  const [slideup3, setslideup3] = useState(false);
  const navigate = useNavigate();
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [activityIndicator1, setActivityIndicator1] = useState(false);
  const [activityIndicator2, setActivityIndicator2] = useState(false);
  const [activityIndicator3, setActivityIndicator3] = useState(false);
  const [activityIndicator4, setActivityIndicator4] = useState(false);
  const [ErrorAlert, setErrorAlert] = useState(false);
  const [HomeData, setHomeData] = useState({
    addrInfo: {
      streetName: "",
      country: "Nigeria",
      state: "Abia",
      lga: "Aba North",
    },
    homeDescription: {
      bedroom: "",
      bathroom: "",
      toilet: "",
      sittingRoom: "",
      dinningRoom: "",
      kitchen: "",
      homeType: "Bungalow",
      saleType: "sell",
      others: "",
    },
    price: {
      priceYear: "",
      priceMonth: "",
    },
  });

  function handleLGA(state) {
    setDisplayData((prev) => {
      return prev.map((value, index) => {
        if (value.title == "lga") {
          value.content = [...Naijastates.lgas(state).lgas];
        }
        return value;
      });
    });
  }


  // handle data selection
  function handleData(e){
    if(e.target.name === 'streetname'){
        setHomeData((prev)=>{
          prev.addrInfo.streetName = e.target.value;
          return prev
        })
    }else if(e.target.name === 'country'){
      setHomeData((prev)=>{
        prev.addrInfo.country = e.target.value;
        return prev
      })
    }else if(e.target.name === 'state'){
      setHomeData((prev)=>{
        prev.addrInfo.state = e.target.value;
        return prev
      })
    }else if(e.target.name === 'lga'){
      setHomeData((prev)=>{
        prev.addrInfo.lga = e.target.value;
        return prev
      })
    }else if(e.target.name === 'bedroom'){
      setHomeData((prev)=>{
        prev.homeDescription.bedroom = e.target.value;
        return prev
      })
    }else if(e.target.name === 'bathroom'){
      setHomeData((prev)=>{
        prev.homeDescription.bathroom = e.target.value;
        return prev
      })
    }else if(e.target.name === 'toilet'){
      setHomeData((prev)=>{
        prev.homeDescription.toilet = e.target.value;
        return prev
      })
    }else if(e.target.name === 'kitchen'){
      setHomeData((prev)=>{
        prev.homeDescription.kitchen = e.target.value;
        return prev
      })
    }else if(e.target.name === 'sitting'){
      setHomeData((prev)=>{
        prev.homeDescription.sittingRoom = e.target.value;
        return prev
      })
    }else if(e.target.name === 'dinning'){
      setHomeData((prev)=>{
        prev.homeDescription.dinningRoom = e.target.value;
        return prev
      })
    }else if(e.target.name === 'homeType'){
      setHomeData((prev)=>{
        prev.homeDescription.homeType = e.target.value;
        return prev
      })
    }else if(e.target.name === 'saleType'){
      setHomeData((prev)=>{
        prev.homeDescription.saleType = e.target.value;
        return prev
      })
    }else if(e.target.name === 'anual-price'){
      setHomeData((prev)=>{
        prev.price.priceYear = e.target.value;
        return prev
      })
    }else if(e.target.name === 'monthly-price'){
      setHomeData((prev)=>{
        prev.price.priceMonth = e.target.value;
        return prev
      })
    }else if(e.target.name === 'other'){
      setHomeData((prev)=>{
        prev.homeDescription.others = e.target.value;
        return prev
      })
    }
  }

  // check data on every next
  function checkData(type){
    let addr = true;
    let homeDesc = true;
    let price = true;

    if(type === 'addr'){
        if(HomeData.addrInfo.streetName.length === 0){
          setErrorAlert('HOME ADDRESS ERROR-please enter home street name Address')
          addr = false;
          return false;
        }
        if(HomeData.addrInfo.state !== 'Abia' && HomeData.addrInfo.lga === 'Aba North'){
          setErrorAlert('HOME ADDRESS ERROR-please enter home local goverment area')
          addr = false;
          return false;
        }
    }
    if (type ==='homeDesc'){
      if(HomeData.homeDescription.bedroom.length === 0 
        || HomeData.homeDescription.bathroom.length === 0 
        ||HomeData.homeDescription.dinningRoom.length === 0 
        ||HomeData.homeDescription.kitchen.length === 0
        ||HomeData.homeDescription.toilet.length === 0
        ||HomeData.homeDescription.sittingRoom.length === 0
        ){
          setErrorAlert('HOME Description ERROR-please fill all the required input fields');
          homeDesc = false;
          return false;
        }
    }
    if (type === 'price'){
      if(HomeData.price.priceYear.length === 0){
          setErrorAlert('HOME PRICE ERROR-please fill all the price fields');
          price = false;
          return false;
        }
      if(HomeData.price.priceMonth.length === 0){
          setErrorAlert('HOME PRICE ERROR-please fill all the price fields');
          price = false;
          return false;
        }
    }

    if (addr){
      return addr;
    }
    if(homeDesc){
      return homeDesc;
    }
    if(price){
      return price;
    }

  }

  return (
    <main className="addhome-main">
      <Navigation isLogin={true} />
      <div className="main-container">
        <Collapse in={slideup}>
          <div id="first" className={`home-detail-container`}>
            <h2>Home Address Information</h2>
              {ErrorAlert && <Alert severity="error" onClose={()=>{setErrorAlert(false)}}>
              <p style={{margin:0}}>{ErrorAlert}</p>
              </Alert>}
            <div className="home-form-container">
              <div className="input-container">
                <input
                  type="text"
                  name="streetname"
                  className="input-tabs"
                  placeholder="Street name"
                  onChange={(e)=>{handleData(e)}}
                />
              </div>
              <div className="input-container">
                <select
                  className="input-tabs"
                  style={{ margin: 0, height: 50, width: "85%" }}
                  name="country"b   
                >
                  {displaydata[0].content.map((value, index) => {
                    return <option key={index}>{value}</option>;
                  })}
                </select>
              </div>
              <div className="input-container">
                <select
                  className="input-tabs"
                  style={{ margin: 0, height: 50, width: "85%" }}
                  onChange={(e) => {
                    handleLGA(e.target.value);
                    handleData(e);
                  }}
                  name="state"
                >
                  {displaydata[1].content.map((value, index) => {
                    return <option key={index}>{value}</option>;
                  })}
                </select>
              </div>
              <div className="input-container">
                <select
                  className="input-tabs"
                  style={{ margin: 0, height: 50, width: "85%" }}
                  name="lga"
                  onChange={(e)=>{handleData(e)}}
                >
                  {displaydata[2].content.map((value, index) => {
                    return <option key={index}>{value}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="bottom-container">
              <button
                disabled={activityIndicator}
                className="next-button"
                onClick={() => {
                  if (checkData('addr')){
                    setActivityIndicator(true);
                    setTimeout(() => {
                      setslideup((prev) => !prev);
                      setslideup2((prev) => !prev);
                      setActivityIndicator(false);
                    }, 1000);
                    setErrorAlert(false);
                  }
                }}
              >
                  {activityIndicator ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  <h3>-{">"}</h3>
                )}
              </button>
            </div>
          </div>
        </Collapse>
        <Collapse in={slideup2}>
          <div id="second" className="home-detail-container desc">
            <h2>Home Description Information</h2>
            {ErrorAlert && <Alert severity="error" onClose={()=>{setErrorAlert(false)}}>
              <p style={{margin:0}}>{ErrorAlert}</p>
              </Alert>}
            <div className="home-form-container">
              <div className="input-container">
                <input
                  type="number"
                  name="bedroom"
                  className="input-tabs"
                  placeholder="Number of Bedrooms"
                  onChange={(e)=>{handleData(e)}}
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="bathroom"
                  className="input-tabs"
                  placeholder="Number of Bathrooms"
                  onChange={(e)=>{handleData(e)}}
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="toilet"
                  className="input-tabs"
                  placeholder="Number of Toilet"
                  onChange={(e)=>{handleData(e)}}
                />
              </div>
              
              <div className="input-container">
                <input
                  type="number"
                  name="kitchen"
                  className="input-tabs"
                  placeholder="Number of Kitchen"
                  onChange={(e)=>{handleData(e)}}
                />
              </div>

              <div className="input-container">
                <input
                  type="number"
                  name="sitting"
                  className="input-tabs"
                  placeholder="Number of Sitting room"
                  onChange={(e)=>{handleData(e)}}
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="dinning"
                  className="input-tabs"
                  placeholder="Number of dinning"
                  onChange={(e)=>{handleData(e)}}
                />
              </div>
              <div className="input-container">
                <select
                  className="input-tabs"
                  style={{ margin: 0, height: 50, width: "85%" }}
                  name="homeType"
                  onChange={(e)=>{handleData(e)}}
                >
                  {displaydata[3].content.map((value, index) => {
                    return <option key={index}>{value}</option>;
                  })}
                </select>
              </div>
              <div className="input-container">
                <select
                  className="input-tabs"
                  style={{ margin: 0, height: 50, width: "85%" }}
                  name="saleType"
                  onChange={(e)=>{handleData(e)}}
                >
                  {displaydata[4].content.map((value, index) => {
                    return <option key={index}>{value}</option>;
                  })}
                </select>
              </div>
              <div className="input-container last-container">
                <textarea
                  type="text"
                  name="other"
                  className="input-tabs"
                  placeholder="Other information about this home."
                  onChange={(e)=>{handleData(e)}}
                />
              </div>
            </div>
            <div className="bottom-container button-containerx">
              <button
                disabled={activityIndicator1}
                className="prev-button"
                onClick={() => {
                  setActivityIndicator1(true);
                  setTimeout(() => {
                    setslideup((prev) => !prev);
                    setslideup2((prev) => !prev);
                    setActivityIndicator1(false);
                  }, 1000);
                }}
              >
                {activityIndicator1 ? (
                  <ClipLoader color="#9317a7" size={20} />
                ) : (
                  <h3>{"<"}-</h3>
                )}
              </button> 
              <button
                disabled={activityIndicator2}
                className="next-button"
                onClick={() => {
                  if (checkData('homeDesc')){
                    setActivityIndicator2(true);
                    setTimeout(() => {
                      setslideup2((prev) => !prev);
                      setslideup3((prev) => !prev);
                      setActivityIndicator2(false);
                    }, 1000);
                    
                    setErrorAlert(false);
                  }
                }}
              >
                {activityIndicator2 ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  <h3>-{">"}</h3>
                )}
              </button>
            </div>
          </div>
        </Collapse>
        <Collapse in={slideup3}>
          <div id="third" className="home-detail-container">
            <h2>Home Pricing Information</h2>
            {ErrorAlert && <Alert severity="error" onClose={()=>{setErrorAlert(false)}}>
              <p style={{margin:0}}>{ErrorAlert}</p>
              </Alert>}
            <div className="home-form-container">
              <div className="input-container">
                <input
                  type="number"
                  name="anual-price"
                  className="input-tabs"
                  placeholder="Price per Annum"
                  onChange={(e)=>{handleData(e)}}
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="monthly-price"
                  className="input-tabs"
                  placeholder="Price per month"
                  onChange={(e)=>{handleData(e)}}
                />
              </div>
            </div>
            <div className="bottom-container button-containerx">
              <button
                disabled={activityIndicator3}
                className="prev-button"
                onClick={() => {
                  setActivityIndicator3(true);
                  setTimeout(() => {
                    setslideup2((prev) => !prev);
                    setslideup3((prev) => !prev);
                    setActivityIndicator3(false);
                  }, 1000);
                }}
              >
                {activityIndicator3 ? (
                  <ClipLoader color="#9317a7" size={20} />
                ) : (
                  <h3>{"<"}-</h3>
                )}
              </button>
              <button
                disabled={activityIndicator4}
                className="next-button"
                onClick={() => {
                  if (checkData('price')){
                    setActivityIndicator4(true);
                    dispatch(registerhome(HomeData))
                    setTimeout(() => {
                      navigate("/add/home/image");
                      setActivityIndicator4(false);
                    }, 3000);
                    console.log(HomeData)
                    setErrorAlert(false);
                  }
                  
                }}
              >
                {activityIndicator4 ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  <h3>Next</h3>
                )}
              </button>
            </div>
          </div>
        </Collapse>
      </div>
    </main>
  );
}
// here the data will be generated that will be used to work on the uploading image page

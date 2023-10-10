import Navigation from "../components/navigationBar";
import "../css/pagecss/AddHome.css";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Naijastates from "naija-state-local-government";
export default function AddHome() {
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

  const [HomeData, setHomeData] = useState({
    addrInfo: {
      streetName: "",
      country: "",
      state: "",
      lga: "",
    },
    homeDescription: {
      bedroom: "",
      bathroom: "",
      toilet: "",
      sittingRoom: "",
      dinningRoom: "",
      kitchen: "",
      homeType: "",
      saleType: "",
      others: "",
    },
    price: {
      priceYear: "",
      priceMonth: "",
    },
  });

  function handleLGA(state) {
    console.log(state);
    console.log(Naijastates.lgas(state));
    setDisplayData((prev) => {
      return prev.map((value, index) => {
        if (value.title == "lga") {
          value.content = [...Naijastates.lgas(state).lgas];
        }
        return value;
      });
    });
  }

  return (
    <main className="addhome-main">
      <Navigation isLogin={true} />
      <div className="main-container">
        <Collapse in={slideup}>
          <div id="first" className={`home-detail-container`}>
            <h2>Home Address Information</h2>
            <div className="home-form-container">
              <div className="input-container">
                <input
                  type="text"
                  name="street name"
                  className="input-tabs"
                  placeholder="Street name"
                />
              </div>
              <div className="input-container">
                <select
                  className="input-tabs"
                  style={{ margin: 0, height: 50, width: "85%" }}
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
                  }}
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
                  setActivityIndicator(true);
                  setTimeout(() => {
                    setslideup((prev) => !prev);
                    setslideup2((prev) => !prev);
                    setActivityIndicator(false);
                  }, 1000);
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
          <div id="second" className="home-detail-container ">
            <h2>Home Description Information</h2>
            <div className="home-form-container">
              <div className="input-container">
                <input
                  type="number"
                  name="bedrooms"
                  className="input-tabs"
                  placeholder="Number of Bedrooms"
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="bathrooms"
                  className="input-tabs"
                  placeholder="Number of Bathrooms"
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="toilet"
                  className="input-tabs"
                  placeholder="Number of Toilet"
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="sitting"
                  className="input-tabs"
                  placeholder="Number of Sitting room"
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="kitchen"
                  className="input-tabs"
                  placeholder="Number of Kitchen"
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="dinning"
                  className="input-tabs"
                  placeholder="Number of dinning"
                />
              </div>
              <div className="input-container">
                <select
                  className="input-tabs"
                  style={{ margin: 0, height: 50, width: "85%" }}
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
                >
                  {displaydata[4].content.map((value, index) => {
                    return <option key={index}>{value}</option>;
                  })}
                </select>
              </div>
              <div className="input-container last-container">
                <textarea
                  type="text"
                  name="dinning"
                  className="input-tabs"
                  placeholder="Other information about this home."
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
                  setActivityIndicator2(true);
                  setTimeout(() => {
                    setslideup2((prev) => !prev);
                    setslideup3((prev) => !prev);
                    setActivityIndicator2(false);
                  }, 1000);
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
            <div className="home-form-container">
              <div className="input-container">
                <input
                  type="number"
                  name="anual-price"
                  className="input-tabs"
                  placeholder="Price per Annum"
                />
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="monthly-price"
                  className="input-tabs"
                  placeholder="Price per month"
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
                  setActivityIndicator4(true);
                  setTimeout(() => {
                    navigate("/add/home/image");
                    setActivityIndicator4(false);
                  }, 3000);
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

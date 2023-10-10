import Navigation from "../components/navigationBar";
import "../css/pagecss/AddHome.css";
import { useEffect, useState } from "react";
import { Alert, Collapse, Drawer, Switch } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function AddHomeImages() {
  //   async function getFile() {
  //     try {
  //       const [filehandle] = await window.showOpenFilePicker({
  //         types: [
  //           {
  //             description: "Images",
  //             accept: {
  //               "image/*": [".png", ".gif", ".jpeg", ".jpg"],
  //             },
  //           },
  //         ],
  //         excludeAcceptAllOption: true,
  //         multiple: false,
  //       });
  //       const file = await filehandle.getFile();
  //       console.log(file);
  //     } catch (e) {
  //       console.log(e);
  //       setAlertError(true);
  //     }
  //   }
  const [alertError, setAlertError] = useState(false);
  const [slideup, setslideup] = useState(true);
  const [slideup2, setslideup2] = useState(false);
  const [slideup3, setslideup3] = useState(false);
  const [slideup4, setslideup4] = useState(false);
  const [slideup5, setslideup5] = useState(false);

  // for the buttons

  const [activityIndicator, setActivityIndicator] = useState(false);
  const [activityIndicator1, setActivityIndicator1] = useState(false);
  const [activityIndicator2, setActivityIndicator2] = useState(false);
  const [activityIndicator3, setActivityIndicator3] = useState(false);
  const [activityIndicator4, setActivityIndicator4] = useState(false);
  const [activityIndicator5, setActivityIndicator5] = useState(false);
  const [activityIndicator6, setActivityIndicator6] = useState(false);
  const [activityIndicator7, setActivityIndicator7] = useState(false);
  const [activityIndicator8, setActivityIndicator8] = useState(false);

  // assuming the data that will determine the number of upload field for the images
  const [toisamebath, setToisamebath] = useState(false);
  const [dinsamesit, setDinsamesit] = useState(false);
  const [succesDrawer, setSuccessDrawer] = useState(false);
  const navigate = useNavigate();

  // this is the data holding the image
  const [homeImage, setHomeImage] = useState({
    bedRoom: [],
    bathRoom: [],
    toilet: [],
    sittingRoom: [],
    dinningRoom: [],
  });

  // handleImage
  function handleImage(e) {
    if (e.target.name === "bedRoom") {
      setHomeImage((prev) => {
        return { ...prev, bedRoom: [...prev.bedRoom, e.target.files[0]] };
      });
      console.log(e.target.files);
    } else if (e.target.name === "bathRoom") {
      setHomeImage((prev) => {
        return { ...prev, bathRoom: [...prev.bathRoom, e.target.files[0]] };
      });
      console.log(e.target.files);
    } else if (e.target.name === "toilet") {
      setHomeImage((prev) => {
        return { ...prev, toilet: [...prev.toilet, e.target.files[0]] };
      });
      console.log(e.target.files);
    } else if (e.target.name === "sittingRoom") {
      setHomeImage((prev) => {
        return {
          ...prev,
          sittingRoom: [...prev.sittingRoom, e.target.files[0]],
        };
      });
      console.log(e.target.files);
    } else {
      setHomeImage((prev) => {
        return {
          ...prev,
          dinningRoom: [...prev.dinningRoom, e.target.files[0]],
        };
      });
      console.log(e.target.files);
    }
  }
  const imageData = {
    bedroom: 4,
    bathroom: 3,
    sittingroom: 1,
    dining: 1,
    toilet: 3,
  };
  useEffect(() => {
    if (toisamebath) {
      setslideup3(false);
      setslideup4(true);
    }
  }, [toisamebath]);
  useEffect(() => {
    if (dinsamesit) {
      setSuccessDrawer(true);
    }
  }, [dinsamesit]);

  return (
    <main className="addhome-main">
      <Drawer
        anchor="bottom"
        open={alertError}
        onClose={() => setAlertError((prev) => !prev)}
      >
        <div
          style={{ backgroundColor: "white", paddingTop: 10, paddingBottom: 0 }}
        >
          <Alert severity="error">
            <p style={{ marginTop: 0 }}>
              IMAGE SELECTION ERROR - please an image must be selected for all
              the input.
            </p>
          </Alert>
        </div>
      </Drawer>
      <Navigation isLogin={true} />

      <div className="main-container">
        <Collapse in={slideup}>
          <div className={`home-detail-container`}>
            <h2>Bedrooms Images</h2>
            <div className="home-form-container">
              {[...Array(imageData.bedroom).keys()].map((value, index) => {
                return (
                  <div className="input-container" key={value}>
                    <div className="input-tabs">
                      <input
                        name="bedRoom"
                        onChange={(e) => {
                          handleImage(e);
                        }}
                        type="file"
                        accept=".png, .gif, .jpeg, .jpg"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bottom-container">
              <button
                disabled={activityIndicator}
                className="next-button"
                onClick={() => {
                  console.log(homeImage);
                  setActivityIndicator(true);
                  setTimeout(() => {
                    setslideup((prev) => !prev);
                    setslideup2((prev) => !prev);
                    setActivityIndicator(false);
                  }, 1000);
                }}
              >
                {activityIndicator ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  <h3>-{">"}</h3>
                )}
              </button>
            </div>
          </div>
        </Collapse>

        <Collapse in={slideup2}>
          <div className={`home-detail-container`}>
            <h2>Bathrooms Images</h2>
            <div className="home-form-container">
              {[...Array(imageData.bathroom).keys()].map((value, index) => {
                return (
                  <div className="input-container" key={value}>
                    <div className="input-tabs">
                      <input
                        onChange={(e) => {
                          handleImage(e);
                        }}
                        name="bathRoom"
                        type="file"
                        accept=".png, .gif, .jpeg, .jpg"
                      />
                    </div>
                  </div>
                );
              })}
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
                  <ClipLoader color="#A11BB7" size={20} />
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
                  <ClipLoader size={20} color="white" />
                ) : (
                  <h3>-{">"}</h3>
                )}
              </button>
            </div>
          </div>
        </Collapse>
        <Collapse in={slideup3}>
          <div className={`home-detail-container`}>
            <h2>Toilet Images</h2>

            <Alert severity="warning">
              If the toilet and bathroom are the same you can just click on the
              switch
            </Alert>
            <Switch
              value={toisamebath}
              style={{
                color: "#A11BB7",
                backgroundColor: "#e6e6e6",
              }}
              onChange={() => {
                toisamebath ? setToisamebath(false) : setToisamebath(true);
              }}
            />
            <div className="home-form-container">
              {[...Array(imageData.toilet).keys()].map((value, index) => {
                return (
                  <div className="input-container" key={value}>
                    <div className="input-tabs">
                      <input
                        name="toilet"
                        onChange={(e) => {
                          handleImage(e);
                        }}
                        type="file"
                        accept=".png, .gif, .jpeg, .jpg"
                      />
                    </div>
                  </div>
                );
              })}
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
                  <ClipLoader color="#A11BB7" size={20} />
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
                    setslideup3((prev) => !prev);
                    setslideup4((prev) => !prev);
                    setActivityIndicator4(false);
                  }, 1000);
                }}
              >
                {activityIndicator4 ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  <h3>-{">"}</h3>
                )}
              </button>
            </div>
          </div>
        </Collapse>
        <Collapse in={slideup4}>
          <div className={`home-detail-container`}>
            <h2>Sittingroom Images</h2>

            <div className="home-form-container">
              {[...Array(imageData.sittingroom).keys()].map((value, index) => {
                return (
                  <div className="input-container" key={value}>
                    <div className="input-tabs">
                      <input
                        onChange={(e) => {
                          handleImage(e);
                        }}
                        name="sittingRoom"
                        type="file"
                        accept=".png, .gif, .jpeg, .jpg"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bottom-container button-containerx">
              <button
                disabled={activityIndicator5}
                className="prev-button"
                onClick={() => {
                  setActivityIndicator5(true);
                  setTimeout(() => {
                    setslideup3((prev) => !prev);
                    setslideup4((prev) => !prev);
                    setActivityIndicator5(false);
                  }, 1000);
                }}
              >
                {activityIndicator5 ? (
                  <ClipLoader color="#A11BB7" size={20} />
                ) : (
                  <h3>{"<"}-</h3>
                )}
              </button>
              <button
                disabled={activityIndicator6}
                className="next-button"
                onClick={() => {
                  setActivityIndicator6(true);
                  setTimeout(() => {
                    setslideup4((prev) => !prev);
                    setslideup5((prev) => !prev);
                    setActivityIndicator6(false);
                  }, 1000);
                }}
              >
                {activityIndicator6 ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  <h3>-{">"}</h3>
                )}
              </button>
            </div>
          </div>
        </Collapse>
        <Collapse in={slideup5}>
          <div className={`home-detail-container`}>
            <h2>Dining room Images</h2>
            <Alert severity="warning">
              If the Dining room and sitting room are the same you can just
              click on the switch
            </Alert>
            <Switch
              value={toisamebath}
              style={{
                color: "#A11BB7",
                backgroundColor: "#e6e6e6",
              }}
              onChange={() => {
                dinsamesit ? setDinsamesit(false) : setDinsamesit(true);
              }}
            />
            <div className="home-form-container">
              {[...Array(imageData.dining).keys()].map((value, index) => {
                return (
                  <div className="input-container" key={value}>
                    <div className="input-tabs">
                      <input
                        onChange={(e) => {
                          handleImage(e);
                        }}
                        name="dinningRoom"
                        type="file"
                        accept=".png, .gif, .jpeg, .jpg"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="agree">
              once you have clicked on submit that means you have agreed to our{" "}
              <span className="term-condition">terms & conditions</span>
            </p>
            <div className="bottom-container button-containerx">
              <button
                disabled={activityIndicator7}
                className="prev-button"
                onClick={() => {
                  setActivityIndicator7(true);
                  setTimeout(() => {
                    setslideup4((prev) => !prev);
                    setslideup5((prev) => !prev);
                    setActivityIndicator7(false);
                  }, 1000);
                }}
              >
                {activityIndicator7 ? (
                  <ClipLoader size={20} color="#A11BB7" />
                ) : (
                  <h3>{"<"}-</h3>
                )}
              </button>
              <button
                disabled={activityIndicator8}
                className="next-button"
                onClick={() => {
                  setActivityIndicator8(true);
                  setTimeout(() => {
                    setSuccessDrawer(true);
                    setActivityIndicator8(false);
                  }, 1000);
                }}
              >
                {activityIndicator8 ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  <h3>Submit</h3>
                )}
              </button>
            </div>
          </div>
        </Collapse>
      </div>
      <Drawer
        anchor="bottom"
        PaperProps={{
          style: {},
          square: false,
        }}
        open={succesDrawer}
        onClose={() => {
          setSuccessDrawer(false);
          navigate("/agent/osezelej");
        }}
      >
        <div style={{ padding: 20, display: "flex", alignItems: "center" }}>
          <ThumbUp fontSize="large" htmlColor="#a21bb78f" />
          <h3 style={{ marginLeft: 30 }}>
            Success!, home have been uploaded but will be reviewed.
          </h3>
        </div>
      </Drawer>
    </main>
  );
}

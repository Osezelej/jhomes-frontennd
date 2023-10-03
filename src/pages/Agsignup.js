import Navigation from "../components/navigationBar";
import BottomNavigation from "../components/bNavi.js";
import '../css/pagecss/Aglogin.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Drawer } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import {ClipLoader} from 'react-spinners';
import ScreenModal from "../components/loginComp";
export default function Agsignup(){
    const [showmodal, setShowmodal] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState(false); 
    const [openModal, setOpenModal] = useState(false)
    function sleepandNavigate(mills){
        setTimeout(()=>{
            navigate('/add/home')
        }, mills)
    }
    const navigate = useNavigate()
    return <main>
        <Navigation isLogin={false} openModal={setOpenModal}/>
        <ScreenModal open={openModal} onClose={()=>setOpenModal(prev=>!prev)} />

        <div className="login-main">
            <div className="login-text-container">
                <h2>Welcome!, Sign Up To add a Home</h2>
            </div>
            <div className="login-form-container">
                <div className="login-input-container">
                    <input type="text" name='phone number' className="userinput" placeholder="Enter your Name or Company name"/>
                    <input type="email" name='Email' className="userinput" placeholder="Enter your Email"/>
                    <input type="number" name='phone number' className="userinput" placeholder="Enter your Phone number"/>
                    <input type="password" name='password' className="userinput" placeholder="Enter your Password"/>
                    <input type="password" name='confirm password' className="userinput" placeholder="Confirm your Password"/>
                </div>
                <div className="login-button-container">
                    <div className="agent-container">
                        <button className="contact-agent-button login-button"  onClick={()=>{
                            setShowmodal(true)
                            
                            }}><p>Sign In</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    <BottomNavigation/>
    
    {/* gotten from the add image page */}
    <Drawer anchor="bottom" PaperProps={{
            style:{

            },
            square:false
        }} open={showmodal} >
            <div className="down-modals" style={{ display:'flex', alignItems:'center'}}>
                <ThumbUp fontSize="large" htmlColor="#a21bb78f"/>
                <h3 >Sign up successfully! Post a home to activate your account. </h3>
                <div style={{width:200}}>
                    {/* this was gotten from homedescription */}
                    <div className="agent-container signup-b-modal">
                        <button className="contact-agent-button" disabled={activityIndicator} onClick={()=>{
                            setActivityIndicator(true)
                            sleepandNavigate(3000)
                        }}>
                           {activityIndicator? <ClipLoader color="white" size={20}/>:<p>Add new home</p>} 
                        </button>
                        
                    </div>
                </div>
            </div>
        </Drawer>

    </main>
}
import Navigation from "../components/navigationBar";
import BottomNavigation from "../components/bNavi.js";
import '../css/pagecss/Aglogin.css';
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { ClipLoader } from "react-spinners";
import ScreenModal from "../components/loginComp";

export default function AgentLogin(){
    const navigate = useNavigate();
    const [activityIndicator, setActivityIndicator] = useState({
        login:false,
        signup:false
    });

    async function sleepandNavigate(type, mills){
        if (type === 'login'){
            setTimeout(()=>{
                navigate('/agent/osezelej')
            }, mills)
        }
        if (type === 'signup'){
            setTimeout(()=>{
                navigate('/agent/signup')
            }, mills)
        }

       
    }
    
    const [openModal, setOpenModal] = useState(false);

    return <main>
        <Navigation isLogin={false} openModal={setOpenModal}/>
        <ScreenModal open={openModal} onClose={()=>setOpenModal(prev=>!prev)} />
        <div className="login-main">
            <div className="login-text-container">
                <h2>Login, Welcome Back!</h2>
            </div>
            <div className="login-form-container">
                <div className="login-input-container">
                    <input type="number" name='phone number' className="userinput" placeholder="Enter your Phone number"/>
                    <input type="password" name='password' className="userinput" placeholder="Enter your Password"/>
                </div>
                <div className="login-button-container">
                    
                    <div className="agent-container">
                        <button className="contact-agent-button login-button" disabled={activityIndicator.login}  onClick={()=>{
                            setActivityIndicator((prev)=>({...prev, login:true}));
                            sleepandNavigate('login',3000)
                         }}>
                           {activityIndicator.login ? <ClipLoader size={20} color="white"/> :<p>Login</p>} 
                        </button>
                    </div>
                    <div className="agent-container">
                        <button className="contact-agent-button login-button-outlined" disabled={activityIndicator.signup} onClick={()=>{
                            setActivityIndicator((prev)=>({...prev, signup:true}))
                            sleepandNavigate('signup',2000)
                            }}>
                            {activityIndicator.signup ? <ClipLoader size={20} color="#9317a7"/> :<p>Sign up</p>} 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    <BottomNavigation/>

    </main>
}
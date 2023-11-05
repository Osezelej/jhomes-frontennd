import Navigation from "../components/navigationBar";
import BottomNavigation from "../components/bNavi.js";
import '../css/pagecss/Aglogin.css';
import { useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import ScreenModal from "../components/loginComp";
import { useDispatch, useSelector } from "react-redux";
import { agenData, loginuser, registerUser } from "../store/user";
import { Alert } from "@mui/material";

export default function AgentLogin(){
    const agent = useSelector(agenData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activityIndicator, setActivityIndicator] = useState({
        login:false,
        signup:false
    });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [ErrorAlert, setErrorAlert] = useState(false);

    function handleChange(e){
        if (e.target.name == 'phone number'){
            setPhoneNumber(e.target.value)
        }
        if(e.target.name == 'password'){
            setPassword(e.target.value)
        }
    }

    async function sleepandNavigate(type, mills){
        if (type === 'login'){
            handleLogin().then(()=>{
              
            setTimeout(()=>{
                // navigate('/agent/osezelej')
            }, mills)  
            })
        }
        if (type === 'signup'){
            setTimeout(()=>{
                navigate('/agent/signup')
            }, mills)
        }

       
    }
    async function handleLogin(){
    let loginData = {
        phoneNumber, 
        password
    };
    dispatch(loginuser(loginData));
    }
    const [openModal, setOpenModal] = useState(false);


    useEffect(()=>{
        let data = sessionStorage.getItem('jhmoesAgentid');
        console.log(typeof data)
        if(agent.isAuth){
            navigate('/agent/'+agent.username)
        }else{
            if (data){
                let agentData = JSON.parse(data)
                dispatch(registerUser({
                    username:agentData.username, 
                    id:agentData.agentid,  
                    email:agentData.email,
                    isAuth:true,
                    loading:false,
                    phonenumber:agentData.phonenumber,
                }))
            }
        }
    }, [])


    useEffect(()=>{
        if (agent.isAuth){
            navigate('/agent/' + agent.username);
            let {error, isAuth, loading, ...AgentData} = agent;
            // this is storing the agent id of the agent after signing up is successful.
            sessionStorage.setItem('jhmoesAgentid', JSON.stringify(AgentData))
        }
        if(agent.loading){
            setActivityIndicator(prev=>({...prev, login:true}))
        }else{
            setActivityIndicator(prev=>({...prev, login:false}))
        }
        if(agent.error.length > 0){
            setErrorAlert('LOGIN ERROR- user with username and password does not exist or check your network and try again.');        
        }
    }, [agent])

    return <main>
        <Navigation isLogin={false} openModal={setOpenModal}/>
        <ScreenModal open={openModal} onClose={()=>setOpenModal(prev=>!prev)} />
        <div className="login-main">
            <div className="login-text-container">
                <h2>Login, Welcome Back!</h2>
            </div>
            {ErrorAlert && <Alert severity="error"  >
                    <p style={{
                        margin:0
                    }}>{ErrorAlert}</p>
                </Alert>} 
            <div className="login-form-container">
                <div className="login-input-container">
                    <input 
                    value={phoneNumber} 
                    onChange={(e)=>{handleChange(e)}} 
                    type="number" 
                    name='phone number' 
                    className="userinput" 
                    placeholder="Enter your Phone number"

                    />
                    <input 
                    value={password} 
                    onChange={(e)=>{handleChange(e)}} 
                    type="password" 
                    name='password' 
                    className="userinput" 
                    placeholder="Enter your Password"

                    />
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
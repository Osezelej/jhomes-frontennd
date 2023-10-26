import Navigation from "../components/navigationBar";
import BottomNavigation from "../components/bNavi.js";
import '../css/pagecss/Aglogin.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Drawer } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import {ClipLoader} from 'react-spinners';
import ScreenModal from "../components/loginComp";
import { BaseUrl } from "../config";
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { registerUserDataThunk, agenData } from "../store/user.js";

export default function Agsignup(){
    let agent = useSelector(agenData);
    let dispatchAction = useDispatch();
    const [signupData, setSignupData] = useState({
        username:'',
        email:"",
        phonenumber:"",
        password:"",
        confirmPassWord:""
        
    })
    const [showmodal, setShowmodal] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState(false); 
    const [openModal, setOpenModal] = useState(false);
    const [ErrorAlert, setErrorAlert] = useState(false);
    function sleepandNavigate(mills){
        setTimeout(()=>{
            navigate(`/add/home/${signupData.username}`)
        }, mills)
    }
    const navigate = useNavigate();

    // register user signupdata
    function handleUserInput(e){
        if (e.target.name ==='username'){
            setSignupData((prev)=>{
                return {...prev, username:e.target.value}
            })
        }else if(e.target.name === 'Email'){

            setSignupData((prev)=>{
                return {...prev, email:e.target.value}
            })
        }else if(e.target.name === 'phonenumber'){
            setSignupData((prev)=>{
                return {...prev, phonenumber:e.target.value}
            })
        }else if(e.target.name === 'password'){
            
            setSignupData((prev)=>{
                return {...prev, password:e.target.value}
            })
        }else if(e.target.name === 'confirmpassword'){
            setSignupData((prev)=>{
                return {...prev, confirmPassWord:e.target.value}
            })
        }
    }

    // register user
    async function registerAgent(){
     return await axios.post(BaseUrl + '/api/v1/user', {
        username: signupData.username.trim(),
        email: signupData.email.trim(),
        phoneNumber: signupData.phonenumber.trim(),
        password: signupData.password
     })
       
    }
    function registerData(data){
        dispatchAction(registerUserDataThunk(signupData))
    }
    // to handle SignupClick
    function handleSignUpClick(){
        if(!(signupData.email.includes('@') || signupData.email.includes('.com'))){
            setErrorAlert('Email ERROR-please enter the right email');
            return ;
        }
        if(signupData.username.length < 3){
            setErrorAlert('USERNAME ERROR-please enter your username and it should at least 3 character')
            return ;
        }
        if (signupData.phonenumber.length < 10){
            setErrorAlert('PHONENUMBER ERROR-please enter a valid phone number')
            return ;
        }
        if(signupData.password.length === 0 || signupData.confirmPassWord.length === 0){
            return ;
        }
        if(ErrorAlert){
            return ;
        }
        setActivityIndicator(true)
        registerAgent().then((value)=>{
            let data ={
                username:value.data.username,
                phonnumber:value.data.phoneNumber,
                email:value.data.email,
                id:value.data.id
            }
            registerData(data);
            setShowmodal(true);
        })
        .catch((error)=>{
            console.log(error)
            setErrorAlert('NETWORK ERROR-request failed')
        })
        .finally(()=>{
            setTimeout(()=>{setActivityIndicator(false)}, 600)
        })
    
    }
    const capAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    const specialChar = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '"', "'", ";", ":", '{', '}', '[', ']', '|' , '\\', '>', '<', '?', '/', '~', '`']
    const num = ['1','2','3','4','5','6','7','8','9','0'];
 
    function handlePAssword (){
       
        let cap = true;
        let small = true;
        let speChar = true;
        let numP = true;
        let charLen = signupData.password.length < 8;
        capAlpha.forEach((value)=>{
            if(signupData.password.includes(value)){
                cap = false;
            }
            if (signupData.password.includes(value.toLowerCase())){
                small = false
            }
            
        });
        if (cap){
            
            setErrorAlert('PASSWORD ERROR-please enter the at least one capital letter');
            return ;
        }
        if(small){
            setErrorAlert('PASSWORD ERROR-please enter the at least one Small letter');
            return;
        }
        specialChar.forEach((value)=>{
            
            if (signupData.password.includes(value)){
                speChar = false
            }
        });
            if(speChar){
                setErrorAlert('PASSWORD ERROR-please enter the at least one special character');
                return;
            }
        num.forEach((value)=>{
            
            if (signupData.password.includes(value)){
                numP = false
            }
        })
        if(numP){
            setErrorAlert('PASSWORD ERROR-please enter the at least one number');
            return;
        }
        if(charLen){
            setErrorAlert('PASSWORD ERROR-your password should be at least 8 character long ');
            return;
        }
        if(!numP && !cap && !small && !speChar && !charLen){
            setErrorAlert(false);
            return ;
        }

    }
    useEffect(()=>{
        console.log(agent)
    }, [agent])
    useEffect(()=>{
        if(signupData.password.length > 0){
          handlePAssword()
        }
        if(signupData.confirmPassWord.length >0 && (signupData.confirmPassWord !== signupData.password)){
            setErrorAlert('PASSWORD ERROR-Ensure your password is correct')
        }
        if(signupData.password.length === 0 && signupData.confirmPassWord.length === 0){
            setErrorAlert(false)
        }
    }, [signupData])
    return <main>
        <Navigation isLogin={false} openModal={setOpenModal}/>
        <ScreenModal open={openModal} onClose={()=>setOpenModal(prev=>!prev)} />

        <div className="login-main">
            <div className="login-text-container">
                <h2>Welcome!, Sign Up To add a Home</h2>
              {ErrorAlert && <Alert severity="error"  >
                    <p style={{
                        margin:0
                    }}>{ErrorAlert}</p>
                </Alert>}  
            </div>
            <div className="login-form-container">
                <div className="login-input-container">
                    <input onChange={(e)=>{handleUserInput(e)}} value={signupData.email} type="email" name='Email' className="userinput" placeholder="Enter your Email"/>
                    <input onChange={(e)=>{handleUserInput(e)}} value={signupData.username} type="text" name='username' className="userinput" placeholder="Enter your Name or Company name"/>
                    <input onChange={(e)=>{handleUserInput(e)}} value={signupData.phonenumber} type="number" name='phonenumber' className="userinput" placeholder="Enter your Phone number"/>
                    <input onChange={(e)=>{handleUserInput(e)}} value={signupData.password} type="password" name='password' className="userinput" placeholder="Enter your Password"/>
                    <input onChange={(e)=>{
                        handleUserInput(e);
                    }} value={signupData.confirmPassWord} type="password" name='confirmpassword' className="userinput" placeholder="Confirm your Password"/>
                </div>
                <div className="login-button-container">
                    <div className="agent-container">
                        <button disabled={activityIndicator} className="contact-agent-button login-button"  onClick={()=>{
                            handleSignUpClick();  
                                                     
                            }}>{activityIndicator? <ClipLoader color="white" size={20}/> :<p>Sign In</p>}
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
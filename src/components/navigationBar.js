import { Link, useNavigate } from "react-router-dom";
import '../css/compcss/naviBar.css';
import { Close, LoginOutlined, LogoutOutlined, Menu, Person2Outlined} from "@mui/icons-material";
import { useState } from "react";
import { Drawer } from "@mui/material";
// import Logo from '../assets/jhomesLogo.png'
export default function Navigation({isLogin, openModal}){
    const routes = [{text:'Home', link:'/'}, {text:'Search a home', link:'/search'}, {text:'Post a home', link:'/agent/login'}]
    const [opendown, setOpenDown] = useState(false);
    const [openDrawerw, setOpenDrawerw] = useState(false);
    const navigate = useNavigate();

    return <nav className="navibar">
        <Link className="logo-container" to={'/'}>
            {/* <img alt="logo" className="logo" src={Logo} height={50} width={50}/> */}
            <h1 className="brand-name" >Jhomes</h1>
        </Link>
        
        <div className="navigation-container">
            {routes.map((route, index)=>{
                return <Link key={index} to={route.link}><p className="route">{route.text}</p></Link>
            })}
        </div>
        {!isLogin ? <div className="login-user-icon-container" style={{cursor:"pointer", flexDirection:'column', justifyContent:'center', alignItems:'center'}} onClick={()=>{setOpenDown(prev=>!prev)}} >
          {!opendown && <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <LoginOutlined htmlColor="#A11BB7"  style={{fontSize:30}}/>
                <h3 className="small" style={{color:"#A11BB7"}}>Login</h3>
            </div>}  
            
            {opendown && <div style={{borderRadius:5}}>
                <div className="agent-user-Button-container">
                   <button style={{
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        width:160,
                        padding:0,
                        borderWidth:0,
                        borderRadius:5
                     }} onClick={()=>{
                            navigate('/agent/login')
                     }}>
                        <h3 style={{color:"#A11BB7"}}>Login as agent</h3>
                   </button>
                </div>
                <div className="agent-user-Button-container">
                   <button style={{
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        width:160,
                        padding:0,
                        borderWidth:0,
                        borderRadius:5
                     }} onClick={()=>{setOpenDown((prev)=>!prev);openModal(true); }}>
                        <h3 style={{color:"#A11BB7"}}>Login as user </h3>
                   </button>
                </div>
            </div>}
        </div>: <div className="login-user-icon-container" style={{cursor:'pointer', flexDirection:'column', alignItems:'center'}} onClick={()=>{setOpenDown(prev=>!prev)}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Person2Outlined htmlColor="#A11BB7"  style={{fontSize:30}}/>
                <h3 style={{color:"#A11BB7"}}>User</h3>
            </div>
           
            {opendown && <div>
                <div className="agent-user-name-container" >
                    <p>Osezele J</p>
                </div>
                <div className="agent-user-Button-container">
                   <button style={{
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        width:160,
                        padding:0,
                        borderWidth:0,
                     }} onClick={()=>{
                            navigate('/')
                     }}>
                        <LogoutOutlined htmlColor="#A11BB7" style={{fontSize:30}}/>
                        <h3 style={{color:"#A11BB7"}}>Log out</h3>
                   </button>
                </div>
            </div>}
            
        </div>
        }
        <div className="mobile-drawer-container">
        {!isLogin ? <div className="login-user-icon-container" style={{cursor:"pointer", flexDirection:'column', justifyContent:'center', alignItems:'center'}} onClick={()=>{setOpenDown(prev=>!prev)}} >
          {!opendown && <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <LoginOutlined htmlColor="#A11BB7"  style={{fontSize:30}}/>
                <h3 className="small" style={{color:"#A11BB7"}}>Login</h3>
            </div>}  
            
            {opendown && <div style={{borderRadius:5}}>
                <div className="agent-user-Button-container">
                   <button style={{
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        width:160,
                        padding:0,
                        borderWidth:0,
                        borderRadius:5
                     }} onClick={()=>{
                            navigate('/agent/login')
                     }}>
                        <h3 style={{color:"#A11BB7"}}>Login as agent</h3>
                   </button>
                </div>
                <div className="agent-user-Button-container">
                   <button style={{
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        width:160,
                        padding:0,
                        borderWidth:0,
                        borderRadius:5
                     }} onClick={()=>{setOpenDown((prev)=>!prev);openModal(true); }}>
                        <h3 style={{color:"#A11BB7"}}>Login as user </h3>
                   </button>
                </div>
            </div>}
        </div>: <div className="login-user-icon-container" style={{cursor:'pointer', flexDirection:'column', alignItems:'center'}} onClick={()=>{setOpenDown(prev=>!prev)}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Person2Outlined htmlColor="#A11BB7"  style={{fontSize:30}}/>
                <h3 className="small" style={{color:"#A11BB7"}}>User</h3>
            </div>
           
            {opendown && <div>
                <div className="agent-user-name-container" >
                    <p>Osezele J</p>
                </div>
                <div className="agent-user-Button-container">
                   <button style={{
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        width:160,
                        padding:0,
                        borderWidth:0,
                     }} onClick={()=>{
                            navigate('/')
                     }}>
                        <LogoutOutlined htmlColor="#A11BB7" style={{fontSize:30}}/>
                        <h3 style={{color:"#A11BB7"}}>Log out</h3>
                   </button>
                </div>
            </div>}
            
        </div>
        }
             <div className="navi-menu-container" onClick={()=>{setOpenDrawerw(true)}} >
                <Menu htmlColor="#A11BB7" style={{fontSize:25, margin:5}} />
             </div>
                <Drawer anchor="right" open={openDrawerw} onClose={()=>{setOpenDrawerw(false)}} PaperProps={{
                    style:{
                        width:'65%'
                    }
                }}>
                    <div className="navigation-containerm">
                        <div style={{
                            display:'flex',
                            justifyContent:'flex-end',
                            marginTop:10
                        }}  onClick={()=>{
                            setOpenDrawerw(false)
                        }}>
                            <Close htmlColor="#A11BB7"  style={{fontSize:33}}/>
                        </div>
                        {routes.map((route, index)=>{
                            return <Link key={index} to={route.link}><p className="route">{route.text}</p></Link>
                        })}
                    </div>
                </Drawer>
        </div>
    </nav>
}
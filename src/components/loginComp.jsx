import { Modal } from "@mui/material";
import { useState } from "react";
import { Close, FacebookRounded, Google} from "@mui/icons-material";
import '../css/pagecss/index.css';
export default function ScreenModal({open, onClose}){
    
    const [buttonOnHover, setButtonOnHover] = useState(false);
    const [buttonOnHover2, setButtonOnHover2] = useState(false);

    return <Modal open={open} onClose={onClose}>
          <div style={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div className="modal-main-container">
                <div className="close-button-container">
                    <div className="icon-container" onClick={onClose} style={{cursor:"pointer"}}>
                        <Close htmlColor="#A11BB7" fontSize="large"/>
                    </div>
                </div>
                <div className="oauth-buttons-container">
                    <div className="button-1-container">
                        <button style={buttonOnHover ?{backgroundColor:'#A11BB7', color:'white'} : {}} onMouseEnter={()=>setButtonOnHover(true)} onMouseLeave={()=>setButtonOnHover(false)}>
                                
                            <Google fontSize="large" htmlColor={buttonOnHover?"white":"#A11BB7"}/>
                            <p>Sign in with Google</p>
                        </button>
                    </div>
                    <div className="button-1-container">
                        <button style={buttonOnHover2 ?{backgroundColor:'#A11BB7', color:'white'} : {}} onMouseEnter={()=>setButtonOnHover2(true)} onMouseLeave={()=>setButtonOnHover2(false)}>  
                            <FacebookRounded fontSize="large" htmlColor={buttonOnHover2?"white":"#A11BB7"}/>
                            <p>Sign in with Facebook</p>
                        </button>
                    </div>
                </div>
            </div>
            </div>
            
    </Modal>
}
import Navigation from "../components/navigationBar";
import '../css/pagecss/agent.css';
import Home1 from '../assets/home1.jpg';
import Home2 from '../assets/home2.jpg';
import Home3 from '../assets/home3.jpg';
import Home4 from '../assets/home4.jpg';
import Home5 from '../assets/home5.jpg';
import Home6 from '../assets/home6.jpg';
import Home7 from '../assets/home7.jpg';
import Home8 from '../assets/home8.jpg';
import ItemComp from "../components/ItemComp";
import {ClipLoader} from 'react-spinners';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddAPhotoRounded, Edit } from "@mui/icons-material";

export default function Agent(){
    const data = [1,2,3,4,5];
    const demoImage = [Home1, Home2, Home3, Home4, Home5,Home6, Home7, Home8];
    const [activityIndicator, setActivityIndicator] = useState(false);
    const [profileImage, setProfileImage] = useState(false);
    const navigate = useNavigate();


    async function getProfilePics(){
        
        try{
        const [filehandle] = await window.showOpenFilePicker({
            types:[
                {
                    description:"Images",
                    accept:{
                        "image/*":[".png", ".gif", ".jpeg", ".jpg"]
                    },
                },
            ],
            multiple:false,
            excludeAcceptAllOption:true
        })

            const fileData = await filehandle.getFile();
            // console.log(fileData)
            try{
                
                var fileReader  = new FileReader()
                fileReader.readAsDataURL(fileData);
                fileReader.onloadend = ()=>{
                    setProfileImage(fileReader.result);
            }
            }catch(e){
                console.log(e)
            }
        }catch(e){
            console.log(e)
        }
    }
    return <main className="post-main">
        <Navigation isLogin={true}/>   
        <div className="agent-mainpage">
            <div className="profile-details-container">
                <div className="profile-image-container">
                    <div className="pimage-container">
                        {!profileImage  && <div className="change-profile-icon" style={{cursor:'pointer'}}
                        onClick={()=>{
                            getProfilePics();
                        }}
                        >
                            <AddAPhotoRounded htmlColor="#A11BB7" style={{fontSize:27}}/>
                        </div>}
                        
                        {profileImage && <img src={profileImage} className="profile-image"/>}
                    </div>
                </div>
                <div className="profile-data-container">
                    <div className="name-container">
                        <h4>Name:</h4>
                        <p>Anubahimendo Osezele Joseph</p>
                    </div>
                    <div className="name-container">
                        <h4>Email:</h4>
                        <p>2osezelejoseph@gmail.com</p>
                    </div>
                    <div className="name-container">
                        <h4>Phone number:</h4>
                        <p>(+234)08076320300</p>
                    </div>
                    <div className="agent-container">
                        <button className="contact-agent-button" disabled={activityIndicator} onClick={()=>{setActivityIndicator(true);setTimeout(()=>navigate('/add/home'), 3000)}}>
                            {activityIndicator? <ClipLoader size={20} color="white"/>:<p>Add new home</p>}
                        </button>
                    </div>
                </div>
            </div>
            <div className="post-text-container">
                <h2>Posts</h2>
            </div>
            <div className="posts-container">
                {/* gotten from the search page */}
                <div className="itemsd-container">
                    {data.map((value, index)=><div key={index} className="pace-item-comp-container" style={index === 0?{backgroundColor:'white'} :index % 2 === 1?{backgroundColor:'#e27df238'}:{backgroundColor:'white'}}><ItemComp images={demoImage} from={'description'}/></div>)}
                </div>
            </div>
        </div>
    </main>
}
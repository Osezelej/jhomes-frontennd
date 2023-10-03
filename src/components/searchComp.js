import { Drawer } from '@mui/material';
import SearchIcon from '../assets/search.png';
import '../css/compcss/searchcomp.css';
import { useState } from 'react';

export default function SearchComp(){
    const [handlesearch, setHandleSearch] = useState(false);
    return<div className="search-container">
        <div className='mobilew' open>
                <Drawer open={handlesearch} onClose={()=>setHandleSearch(false)}  anchor='top' PaperProps={{
                    style:{
                        display:'flex',
                        justifyContent:'center',
                        height:'15%',
                        padding:10
                    }
                }}>
                    <input style={{
                        margin:0,
                        width:'96%',
                        display:'flex',
                        justifyContent:'center',
                        justifySelf:'center'
                    }} className="seachNavi" name="search" placeholder="Find by Location, Price, Bedroom..."/>
                </Drawer>
                <img alt="search" src={SearchIcon} width={25} height={25} onClick={()=>setHandleSearch(true)}/>
        </div>
        <div className='desktopw'>
            <input className="seachNavi" name="search" placeholder="Find by Location, Price, Bedroom..."/>
            <img alt="search" src={SearchIcon} width={25} height={25}/>
        </div>
    
    </div> 
}
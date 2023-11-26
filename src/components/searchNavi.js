import SearchComp from "./searchComp";
import FilterComp from "./filtercomp";
// import Logo from '../assets/jhomesLogo.png';
import '../css/compcss/searchNavi.css';
import { Link } from "react-router-dom";
import {  Drawer } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
export default function SearchNavi({filterData, findNdFilter}){
    const [openDrawer, setOpenDrawer] = useState(false);
    return <nav className="navise">
                <div className="navibarsearch">
                    <div className="logo-containersearch">
                        {/* <img alt="logo" className="logo" src={Logo} height={50} width={50}/> */}
                        <Link to={'/'}>
                            <h1 className="brand-name">Jhomes</h1>
                        </Link>
                    </div>
                    <SearchComp/>
                </div>
                
                <div className="filter-container">
                    <p>Filter:</p>
                    {filterData.map((items, index)=><FilterComp 
                    key={index} 
                    title={items.title} 
                    content={items.options}
                    fillterFunction={findNdFilter}
                    />)}
                </div>
                <div className="filter-containerw">
                    <p>Filter</p>
                    <div className="down-arrow" onClick={()=>{setOpenDrawer(true)}}>
                        <Menu htmlColor="#A11BB7" style={{fontSize:29}}/>
                    </div>
                    
                </div>
                <Drawer anchor="top" open={openDrawer} onClose={()=>{setOpenDrawer(false)}} PaperProps={{style:{
                    height:'15%',
                    paddingTop:10,
                    paddingBottom:10,
                    display:'flex',
                    flexWrap:'wrap',
                    flexDirection:'row',
                    overflowY:'visible'
                }}}>
                    
                    {filterData.map((items, index)=><FilterComp 
                    key={index} 
                    title={items.title} 
                    content={items.options}
                    fillterFunction={findNdFilter}
                    setOpenDrawer={setOpenDrawer}
                    />)}
                   
                </Drawer>
    </nav>
}
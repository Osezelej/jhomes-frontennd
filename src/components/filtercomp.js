import { useState } from 'react';
import ArrowDownIcon from '../assets/arrow-down.png';
import '../css/compcss/filtercomp.css'
import FilterOption from './filteroption';
export default function FilterComp({title, content, fillterFunction, setOpenDrawer}){
    const [showOptions, setShowOption] = useState(false);
    const [picked, setPicked] = useState('');
    function handlePicked(letter, title){
        setPicked(letter)
        fillterFunction(letter, title, setOpenDrawer)
        console.log(setOpenDrawer)
        if(setShowOption != undefined){
            
        // setShowOption(false)
        }
    }
    
    return <div className='filtercontainer'>
        <div className="filterComp-container" onClick={()=>{showOptions?setShowOption(false):setShowOption(true)}}>
            <p>{picked.length == 0 ? title:picked}</p>
            <img src={ArrowDownIcon} height={10} width={10}/>
        </div>
        {showOptions && <FilterOption title={title} content={content} handlePicked={handlePicked}/>}
    </div> 
}
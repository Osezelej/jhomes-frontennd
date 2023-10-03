import { useNavigate } from 'react-router-dom';
import '../css/compcss/itemcomp.css';
import Carousel from 'react-material-ui-carousel';
import { DeleteRounded, FavoriteBorderOutlined,FavoriteRounded } from '@mui/icons-material';
import { useState } from 'react';

export default function ItemComp({images, from}){
    const [FavHome, setFavHome] = useState(false);
    const navigate = useNavigate()
    /*
    i will need the images, price, 
    house-features, address of the  home, 
    and home id
    */
    return <div className="item-container">
        <div className="car-image-container" onDoubleClick={()=>{setFavHome((prev)=>!prev)}} >
           {from !== 'description' && <div className='fav-icon-container'>
            {FavHome ? <FavoriteRounded fontSize='large' htmlColor='#b71b42'/> :<FavoriteBorderOutlined fontSize='large' htmlColor='white'/>}
                
            </div>} 
        <Carousel duration={1000} indicators={false} >
                {images.map((image, id)=>{
                    return <div className=" image-container" key={id}>
                        <img alt="carousel" src={image} />
                    </div>
                })}
            </Carousel>
        </div>
        <div className="itemcomp-detail-container" onClick={()=>{navigate('/description/1')}}>
            <div className="price-description-container">
                <div className="price-container">
                    <h2>$50,000</h2>
                    {from === 'description'  && <DeleteRounded htmlColor='#A11BB7'/>}
                </div>
                <div className="description-container">
                    <p className='bold'>3bd | 3ba | 3toi | 4sit</p>
                    <p> - House for sale</p>
                </div>

            </div>
            <div className="address-next-container">
                <div className="address-container">
                    <p>21, Ogunyomi Street, Oworoshoki, Kosofe, Lagos, Nigeria.</p>
                </div>
                <div className="next-container" style={from === 'description'? {flexDirection:'row', alignItems:'center', justifyContent:'space-between'}:{}}>
                    {from === 'description'  && <p  style={{color:'#A11BB7'}}>staging...</p>}
                    <p>-&gt;</p>
                </div>
            </div>
        </div>
    </div>
}
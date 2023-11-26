import { useNavigate } from 'react-router-dom';
import '../css/compcss/itemcomp.css';
import Carousel from 'react-material-ui-carousel';
import { DeleteRounded, FavoriteBorderOutlined,FavoriteRounded } from '@mui/icons-material';
import { useState } from 'react';
import { BaseUrl } from '../config';

export default function ItemComp({homeDetails, from}){
    // console.log(homeDetails)
    const [FavHome, setFavHome] = useState(false);
    const images = homeDetails.homeImage[0].split(',');
    const navigate = useNavigate();
    let mthPrice = parseInt(homeDetails.homePrice.homePriceMonth);
    let yrPrice = parseInt(homeDetails.homePrice.homePriceYear)
    let currFormat = new Intl.NumberFormat('en-US', {
        style:'currency',
        currency:'NGN'
    })
    let formattedMthPrice = currFormat.format(mthPrice);
    let formattedYrPrice = currFormat.format(yrPrice) 

    return <div className="item-container">
        <div className="car-image-container" onDoubleClick={()=>{setFavHome((prev)=>!prev)}} >
           {from !== 'description' && <div className='fav-icon-container'>
            {FavHome ? <FavoriteRounded fontSize='large' htmlColor='#b71b42'/> :<FavoriteBorderOutlined fontSize='large' htmlColor='white'/>}
                
            </div>} 
        <Carousel duration={1000} indicators={false} >
                {images.map((image, id)=>{
                    return <div className=" image-container" key={id}>
                        <img alt="carousel" src={BaseUrl + '/' + image} />
                    </div>
                })}
            </Carousel>
        </div>
        <div className="itemcomp-detail-container" onClick={()=>{navigate('/description/' + homeDetails.id + '?agentid=' + homeDetails.agentId)}}>
            <div className="price-description-container">
                <div className="price-container">
                    <h4>{formattedYrPrice} <span style={{fontSizeL:3}}>/ yr</span></h4>
                    {from === 'description'  && <DeleteRounded htmlColor='#A11BB7'/>}
                </div>
                <div className="description-container">
                    <p className='bold'>{homeDetails.homeDesc.bedroom}bd | {homeDetails.homeDesc.bathroom}ba | {homeDetails.homeDesc.toilet}toi | {homeDetails.homeDesc.sittingroom}sit</p>
                    <p> - House for {homeDetails.homeDesc.saleType}</p>
                </div>

            </div>
            <div className="address-next-container">
                <div className="address-container">
                    <p>{homeDetails.homeAddress.streetName}, {homeDetails.homeAddress.lga}, {homeDetails.homeAddress.state}.</p>
                </div>
                <div className="next-container" style={from === 'description'? {flexDirection:'row', alignItems:'center', justifyContent:'space-between'}:{}}>
                    {from === 'description'  && <p className='staging'  style={{color:'#A11BB7'}}>staging...</p>}
                    <p>-&gt;</p>
                </div>
            </div>
        </div>
    </div>
}
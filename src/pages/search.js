import FilterComp from "../components/filtercomp";
import SearchNavi from "../components/searchNavi";
import '../css/pagecss/search.css';
import Home1 from '../assets/home1.jpg';
import Home2 from '../assets/home2.jpg';
import Home3 from '../assets/home3.jpg';
import Home4 from '../assets/home4.jpg';
import Home5 from '../assets/home5.jpg';
import Home6 from '../assets/home6.jpg';
import Home7 from '../assets/home7.jpg';
import Home8 from '../assets/home8.jpg';
import ItemComp from "../components/ItemComp";
import BottomNavigation from "../components/bNavi";

export default function Search(){
    const filterData = [
        {
            title:"Sale Type",
            options:["Any","Rent", "Buy"]
        },
        {
            title:"Home Type",
            options:["Any", "Bungalow", "Storey", "Duplex"]
        },
        {
            title:"Bedrooms",
            options:["Any", "1", "2", "3", "4", "5", "6","more"]
        },
        {
            title:"Bathrooms",
            options:["Any", "1", "2", "3", "4", "5", "6","All in suite","more"]
        },
        {
            title:"Kitchens",
            options:["Any", "1", "2", "3", "4", "more"]
        },
        {
            title:"Sitting Room",
            options:["Any", "1", "2", "3", "4", "more"]
        }
    ]
    const demoImage = [Home1, Home2, Home3, Home4, Home5,Home6, Home7, Home8
    ]
    const data = [1,2,3,4,5]
    return <main>
        <SearchNavi filterData={filterData}/>
        
        <div className="pagebody search-main">
            <div className="items-container">
                {data.map((value, index)=><div key={index} className="pace-item-comp-container" style={index === 0?{backgroundColor:'white'} :index % 2 === 1?{backgroundColor:'#e27df238'}:{backgroundColor:'white'}}><ItemComp images={demoImage}/></div>)}
            </div>
        </div>
        <BottomNavigation/>
    </main>
}
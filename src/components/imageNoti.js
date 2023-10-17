import { Close } from "@mui/icons-material";

function ImageNoti({filename, handleDeleteFile}){
    return (
          <div className="imageNotiContainer" style={{
                    display:"flex", 
                    padding:3, 
                    backgroundColor:"#e27df260", 
                    marginRight:5,
                    justifyContent:'center',
                    alignItems:'center', 
                    marginBottom:10}}>
                 <p style={{margin:0, padding:0}}>
                    {filename}
                 </p>
                 <div  
                 className="closeNotiContainer" 
                 style={{padding:1, marginLeft:10 , display:'flex', 
                 alignContent:'center',}} 
                 onClick={()=>{handleDeleteFile()}}>
                    <Close htmlColor="black" fontSize="14"/>
                 </div>
          </div>
    )
}
export default ImageNoti;
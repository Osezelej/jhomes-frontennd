import { createSlice,} from "@reduxjs/toolkit";


const locationSlice =  createSlice({
          name:"location",
          initialState:{
                    lat:'',
                    lng:'', 
                    
          },
          reducers:{
                    registerLocation(state, action){
                              state.lat = action.payload.lat;
                              state.lng = action.payload.lng;
                    }
          },
          
});

const {registerLocation} = locationSlice.actions;

export {registerLocation};
export default locationSlice.reducer;
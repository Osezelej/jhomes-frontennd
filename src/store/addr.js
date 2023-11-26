import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

async function handlelocationData(lat, lng){
          let data = '';
          await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=c80bf84daac1447698e7c8763a8d8641`).then((res)=>{
                    data = res.data;
                    console.log(data)
          })
          .catch((err)=>{
                    throw new Error('an error occured')
          })

          return data
}

const getLocationData = createAsyncThunk('user/location', async(data, thunkApi)=>{
          try{
              return await handlelocationData(data.lat, data.lng);
          }catch(e){
              thunkApi.rejectWithValue(e)
          }
})
let addrSlice = createSlice({
          name:'user/address',
          initialState:{
                    addrs: {
                              state: '', 
                              city: '',
                    },
                    error:'',
                    success: '',
                    loading:''
          },
          extraReducers:(builder)=>{
                    builder.addCase(getLocationData.pending, (state, payload)=>{
                        state.loading = true;
                        state.success = false;
                        state.error = '';
                    });
                    builder.addCase(getLocationData.fulfilled, (state, action)=>{
                              state.loading = false;
                              state.success = true;
                              state.error = '';
                              let city = action.payload.results[0].components.city;
                              let state_ = action.payload.results[0].components.state;
                              state.addrs.city = city;
                              state.addrs.state = state_; 
                    });
                    builder.addCase(getLocationData.rejected, (state, payload)=>{
                              state.loading = false;
                              state.success = false;
                              state.error = 'An error occured while trying to get your location for better search result.';
                    });
          }
});

export {getLocationData}
export default addrSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../config";

const registerUserdata = async (signupData)=>{
          let data = {};

          await axios.post(BaseUrl + '/api/v1/user', {
                    username: signupData.username.trim(),
                    email: signupData.email.trim(),
                    phoneNumber: signupData.phonenumber.trim(),
                    password: signupData.password
                 }).then((res)=>{
                    data = res.data;
                 }).catch((err)=>{
                    throw new Error(err.response.data)
                 })
                 return data;
}


const registerUserDataThunk = createAsyncThunk('user/registeruser', async (signupData, thunkApi)=>{
                  try{
                    return registerUserdata(signupData)
                  }
                  catch(err){
                    thunkApi.rejectWithValue(err)
                  }
})


const agentSlice = createSlice({
          name:'agentSlice', 
          initialState:{
                    username:'',
                    agentid:'',
                    phonenumber:'',
                    email:'',
                    isAuth:false,
                    loading:false,
                    error:''
          },
          reducers:{
                    registerUser(state, action){
                              state.username = action.payload.username;
                              state.agentid = action.payload.id;
                              state.phonenumber =action.payload.phonenumber;
                              state.email = action.payload.email;
                    },
          },
          extraReducers:(builder)=>{
                    builder.addCase(registerUserDataThunk.pending, (state, action)=>{
                              state.loading = true
                              state.isAuth = false;
                              state.error = false;
                    });
                    builder.addCase(registerUserDataThunk.fulfilled, (state, action)=>{
                              state.agentid = action.payload.id;
                              state.email = action.payload.email;
                              state.phonenumber = action.payload.phoneNumber;
                              state.username = action.payload.username;
                              state.loading = false;
                              state.error = false;
                              state.isAuth = true;

                    });
                    builder.addCase(registerUserDataThunk.rejected, (state, action)=>{
                              state.isAuth = false;
                              state.loading = false;
                              state.error = action.error.message;
                    });
          }
})

let {registerUser} = agentSlice.actions;
let agenData = state=>state.agent;


export {registerUser, agenData, registerUserDataThunk}
export default agentSlice.reducer;
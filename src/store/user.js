import { stepButtonClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const agentSlice = createSlice({
          name:'agentSlice', 
          initialState:{
                    username:'',
                    agentid:'',
                    phonenumber:'',
                    email:'',
          },
          reducers:{
                    registerUser(state, action){
                              state.username = action.payload.username;
                              state.agentid = action.payload.id;
                              state.phonenumber =action.payload.phonenumber;
                              state.email = action.payload.email;
                    },
          }

})

let {registerUser} = agentSlice.actions;
let agenData = state=>state.agent;


export {registerUser, agenData}
export default agentSlice.reducer;
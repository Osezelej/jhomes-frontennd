import { configureStore } from "@reduxjs/toolkit";
import homeDetail from './signuphome.js';
import agentSlice from './user.js';
const store = configureStore({
    reducer:{
        homeDetails: homeDetail,
        agent:agentSlice,
    }
})

export default store
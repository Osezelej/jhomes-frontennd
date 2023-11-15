import { configureStore, applyMiddleware} from "@reduxjs/toolkit";
import homeDetail from './signuphome.js';
import agentSlice from './user.js';
import locationSlice from "./location.js";
import addressSlice from "./addr.js";

const store = configureStore({
    reducer:{
        homeDetails: homeDetail,
        agent:agentSlice,
        location: locationSlice,
        address: addressSlice
    },

})

export default store
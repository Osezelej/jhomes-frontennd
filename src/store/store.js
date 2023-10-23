import { configureStore, applyMiddleware} from "@reduxjs/toolkit";
import homeDetail from './signuphome.js';
import agentSlice from './user.js';
import thunk from "redux-thunk";
const store = configureStore({
    reducer:{
        homeDetails: homeDetail,
        agent:agentSlice,
    },
})

export default store
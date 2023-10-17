import { configureStore } from "@reduxjs/toolkit";
import homeDetail from './signuphome.js'
const store = configureStore({
    reducer:{
        homeDetails: homeDetail,
    }
})

export default store
import { createSlice } from "@reduxjs/toolkit";

const homedetailSlice = createSlice({
          name:'homeDetails',
          initialState:{
                    addrInfo: {
                      streetName: "",
                      country: "Nigeria",
                      state: "Abia",
                      lga: "Aba North",
                    },
                    homeDescription: {
                      bedroom: "",
                      bathroom: "",
                      toilet: "",
                      sittingRoom: "",
                      dinningRoom: "",
                      kitchen: "",
                      homeType: "Bungalow",
                      saleType: "sell",
                      others: "",
                    },
                    price: {
                      priceYear: "",
                      priceMonth: "",
                    },
          },
          reducers:{
              registerhome:(state, action)=>{
                    console.log(action.payload, 'turyuy')
                    state.addrInfo = action.payload.addrInfo;
                    state.homeDescription = action.payload.homeDescription;
                    state.price = action.payload.price;
          }
          }

})

const {registerhome} = homedetailSlice.actions;
const homedetailstate = (state)=>state.homeDetails;

export {registerhome, homedetailstate};                                                                                                                       
export default homedetailSlice.reducer;
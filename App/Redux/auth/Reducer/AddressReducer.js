import { createSlice } from '@reduxjs/toolkit'

export const AddressSlice = createSlice({
  name: 'Address',
  initialState: {
    userAddress:'',
    carDesAddress:'',
    carLatLong:[],
    userLatLong:[]
  },
  reducers: {
    setUserAddress: (state,action) => {
        state.userAddress=action.payload;
    },
    setUserLatLong: (state,action) => {
        state.userLatLong=action.payload;
    },
    setCarAddress: (state,action) => {
        state.carDesAddress=action.payload;
    },
    setCarLatLong: (state,action) => {
        state.carLatLong=action.payload;
    },
    
  }
})

// Action creators are generated for each case reducer function
export const { setUserAddress,setCarAddress,setUserLatLong,setCarLatLong} = AddressSlice.actions

export default AddressSlice.reducer;


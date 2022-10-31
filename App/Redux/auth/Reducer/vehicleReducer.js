import {createSlice, createSelector} from '@reduxjs/toolkit';

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    nearByVehicles: [],
  },
  reducers: {
    setNearByVehicle: (state, action) => {
      state.nearByVehicles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setNearByVehicle} = vehicleSlice.actions;

export default vehicleSlice.reducer;

export const getVehicleById = VehicleId => state => {
  const vehicles=state?.vehicles?.nearByVehicles
  console.log("VehicleId ->> ",VehicleId);
  let Vehicle = vehicles.find(vehicle => vehicle._id === VehicleId);
  return Vehicle;
};
export const getAllVehicle =  state => {
  const vehicles=state?.vehicles?.nearByVehicles
  
  return vehicles;
};

// const selectItemsByCategory = createSelector(
//   [
//     // Usual first input - extract value from `state`
//     state => state.items,
//     // Take the second arg, `category`, and forward to the output selector
//     (state, category) => category
//   ],
//   // Output selector gets (`items, category)` as args
//   (items, category) => items.filter(item => item.category === category)
// );

export const Config = {
  baseUrl: {
    main: 'http://192.168.0.105:8000/api/v1/'
  },
  endpoint: {
    user:{
      register: 'users',
      login: 'users/login',
      forgotPassword: 'users/otp/forgotpassword',
      verifyOtp: 'users/otp/verifyotp',
      changePassword: 'users/otp/changepassword',
      abc:'users/abc',
      isValidRegister: 'users/isvalidcred',
      isValidToken: 'users/verify',
      notification: 'users/noti'
    },
    vehicles:{
      getAllVehicles: 'vehicles/',
      nearByVehicle: 'vehicles/getnearbyvehicles',
      getVehiclesCategory: 'vehicles/vehiclecategory',
    },
    bookings:{
      getBookings:'bookings',
      getmybookings:'bookings/getmybookings'
    },
    compareFace: '/test',
  }
};


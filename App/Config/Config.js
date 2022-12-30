export const Config = {
  baseUrl: {
    main: 'http://192.168.0.108:8000/api/v1/'
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
      verifyUser: 'users/verification/verifyuser',
      isVerified:'users/verification/isverified'
    },
    vehicles:{
      getAllVehicles: 'vehicles/',
      nearByVehicle: 'vehicles/getnearbyvehicles',
      getVehiclesCategory: 'vehicles/vehiclecategory',
    },
    bookings:{
      getBookings:'bookings',
      getmybookings:'bookings/getmybookings',
      approveReject:'bookings/approveorrejectbooking',
      startrental:'bookings/startrental',
      endrental:'bookings/endrental'
    },
    compareFace: '/test',
  }
};


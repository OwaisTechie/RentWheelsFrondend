
import ip from './IpAddress'
console.log("GET IP =>> ",ip.getIp())
export const Config = {
  baseUrl: {
    // main: `http://${ip.getIp()}:8000/api/v1/`
    main: `http://192.168.43.197:8000/api/v1/`
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
      verifyUser: 'users/verification/verifyuser',
      isVerified:'users/verification/isverified',
      updateProfile:'users/updateprofile',
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
    Wallet:{
      getWalletDetails:'payments/getpayments'
    },
    Reviews:{
      getAllReviewsOfVehicle:'/reviews',
    },
    compareFace: '/test',
  }
};


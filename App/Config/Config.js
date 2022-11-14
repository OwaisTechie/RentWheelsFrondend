export const Config = {
  baseUrl: {
    main: 'http://192.168.0.108:8000/api/v1/'
  },
  endpoint: {
    user:{
      register: 'users',
      login: 'users/login',
      abc:'users/abc',
      isValidRegister: 'users/isvalidcred',
      isValidToken: 'users/validatetoken'
    },
    vehicles:{
      getAllVehicles: 'vehicles/',
      nearByVehicle: 'vehicles/getnearbyvehicles',
      getVehiclesCategory: 'vehicles/vehiclecategory',
    },
    bookings:{
      getBookings:'bookings'
    },
    compareFace: '/test',
  }
};


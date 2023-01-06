import {Config} from '../../../Config/Config';
import Toast from 'react-native-toast-message';
import axios from 'axios';
export const getBookings = (payload, onSuccess, onFailure) => {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint.bookings.getBookings;
  const URL = `${baseUrl}${endpoint}?vehicle=${payload.vehicleId}&select=startTime,endTime&dates=true`;

  axios
    .get(URL)
    // .get(URL,{ params: { filter: `noOfSeats=${payload.noOfSeats}||noOfDoors${payload}` })
    .then(res => {
      onSuccess(res.data.Payload);
    })
    .catch(error => {
      console.log(error, 'Error...');

      if (error.response) {
        onFailure(error.response.status);
        if (error.response.status !== 404) {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'NetWork Error!',
            text2: `500`,
            // visibilityTime: 5000,
            // autoHide: true,
          });
        } else {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: error.response.data.Message,
            text2: error.response.data.responseCode,
            visibilityTime: 5000,
            autoHide: true,
          });
        }
      } else if (error.request) {
        console.log('error.request: ', error.request);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Server Not Found!',
          text2: `${error.request.status}`,
          visibilityTime: 5000,
          autoHide: true,
        });
        onFailure(error.request.status);

      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Unknown error: ', error);
        onFailure(error.request.status);
      }
    });
};
export const addBooking = (payload, onSuccess, onFailure) => {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint.bookings.getBookings;
  const URL = `${baseUrl}${endpoint}`;
  axios
    .post(URL, payload)
    // .get(URL,{ params: { filter: `noOfSeats=${payload.noOfSeats}||noOfDoors${payload}` })
    .then(res => {
    

      Toast.show({
        // topOffset: 30,
        topOffset: 60,
        type: 'success',
        text1: `Success ${res.data.responseCode}`,
        text2: res.data.Message,
        visibilityTime: 3000,
        autoHide: true,
      });
      onSuccess(res.data.Payload);
    
    })
    .catch(error => {
      console.log(error, 'Error...');
      //   if (!unmounted) {
      //     if (axios.isCancel(error)) {
      //         console.log(`request cancelled:${error.message}`);
      //     } else {
      //         console.log("another error happened:" + error.message);
      //     }
      // }
      if (error.response) {
        console.log('ERR =>> ', error.response.data);
        onFailure(error.response.status);
        if (error.response.status !== 404) {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'NetWork Error!',
            text2: `500`,
            // visibilityTime: 5000,
            // autoHide: true,
          });
        } else {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: error.response.data.Message,
            text2: error.response.data.responseCode,
            visibilityTime: 5000,
            autoHide: true,
          });
        }
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // onFailure(error.request.status);

      } else if (error.request) {
        console.log('error.request: ', error.request);
        // let errorRes = error.request._response ? error.request.response.Message : ;
        // 'Server Not Found!'
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Server Not Found!',
          text2: `${error.request.status}`,
          visibilityTime: 5000,
          autoHide: true,
        });
        onFailure(error.request.status);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Unknown error: ', error);
        onFailure(error.request.status);
        // Toast.show({
        //   topOffset: 60,
        //   type: 'error',
        //   text1: 'Unknown error',
        //   text2: error,
        //   visibilityTime:5000,
        //   autoHide :true
        // });
      }
    });
};

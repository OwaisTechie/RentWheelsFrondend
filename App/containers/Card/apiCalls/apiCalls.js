import {Config} from '../../../Config/Config';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {getHeaders} from '../../../Constant/requestHeaders';
export const addBookings = async (payload, onSuccess, onFailure) => {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint.bookings.getBookings;
  const URL = `${baseUrl}${endpoint}/`;
  const header = await getHeaders().then(data => {
    return data;
  });
  axios
    .post(URL, payload, header)
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

      if (error.response) {
        console.log('ERR =>> ', error.response.data);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: error.response.data.Message,
          text2: error.response.data.responseCode,
          visibilityTime: 5000,
          autoHide: true,
        });
        onFailure(error.response.status);

       
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
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Unknown error',
          text2: error,
          visibilityTime:5000,
          autoHide :true
        });
      }
    });
};

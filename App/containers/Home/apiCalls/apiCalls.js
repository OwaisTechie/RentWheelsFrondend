import {Config} from '../../../Config/Config';
import Toast from 'react-native-toast-message';
import axios from 'axios';
const getNearByLocation = async (payload, onSuccess, onFailure) => {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint.vehicles.nearByVehicle;
  const URL = `${baseUrl}${endpoint}`;
  
  try {
    const value = await AsyncStorage.getItem('userDetail');
    if (value !== null) {
      // We have data!!
      console.log("WE HAVE DATA ->>",value);
    }
  } catch (error) {
    // Error retrieving data
  }
  
  axios
    .get(URL, {
      // cancelToken: source?.token,
      params: {pickupLocation: payload[0] + ',' + payload[1]},
    })
    // .get(URL,{ params: { filter: `noOfSeats=${payload.noOfSeats}||noOfDoors${payload}` })
    .then(res => {
      // if (res.data.responseCode === 200) {

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

        console.log('error.response: ', error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        // console.log(error.response.data.message);
        console.log(error.response.headers);
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

        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log("getDataAgainstCnic error.request: ", error.request);
        // console.log(e)
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

export default getNearByLocation;

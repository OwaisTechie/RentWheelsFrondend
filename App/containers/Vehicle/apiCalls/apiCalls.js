import {Config} from '../../../Config/Config';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { getHeaders } from '../../../Constant/requestHeaders';
export const getAllVehicles = (payload, onSuccess, onFailure) => {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint.vehicles.getAllVehicles;
  const URL = `${baseUrl}${endpoint}`;
  console.log("URL ->> ",URL)
  const page=1
  const limit=10
  axios
    .get(URL, { 
      params: {filter:`[["noOfSeats", "=", ${payload.noOfSeats},"||",noOfDoors,"=",${payload.noOfDoors}]]`,
      page:{page},
      limit:{limit}
    },
    })
    // .get(URL,{ params: { filter: `noOfSeats=${payload.noOfSeats}||noOfDoors${payload}` })
    .then(res => {
      // if (res.data.responseCode === 200) {
        
        // console.log(`onSuccess Passing : ${JSON.stringify({cnic:cnic,...res.data})}`)
      Toast.show({
        // topOffset: 30,
        topOffset: 60,
        type: 'success',
        text1: `Success ${res.data.responseCode}`,
        text2: res.data.Message,
        visibilityTime: 3000,
        // autoHide: true,
      });
      onSuccess(res.data.Payload);
    })
    .catch(error => {
      console.log(error, 'Error...');
      // if (!unmounted) {
      //   if (axios.isCancel(error)) {
      //     console.log(`request cancelled:${error.message}`);
      //   } else {
      //     console.log('another error happened:' + error.message);
      //   }
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
            visibilityTime: 5000,
            autoHide: true,
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
export const getAllCategories = (onCategorySuccess, onCategoryFailure) => {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint.vehicles.getVehiclesCategory;
  const URL = `${baseUrl}${endpoint}`;
  console.log("URL ->> ",URL)
  axios
    .get(URL)
    // .get(URL,{ params: { filter: `noOfSeats=${payload.noOfSeats}||noOfDoors${payload}` })
    .then(res => {
      // if (res.data.responseCode === 200) {
        
        // console.log(`onSuccess Passing : ${JSON.stringify({cnic:cnic,...res.data})}`)
      Toast.show({
        // topOffset: 30,
        topOffset: 60,
        type: 'success',
        text1: `Success ${res.data.responseCode}`,
        text2: res.data.Message,
        visibilityTime: 3000,
        autoHide: true,
      });
      onCategorySuccess(res.data.Payload);
    })
    .catch(error => {
      console.log(error, 'Error...');
      // if (!unmounted) {
      //   if (axios.isCancel(error)) {
      //     console.log(`request cancelled:${error.message}`);
      //   } else {
      //     console.log('another error happened:' + error.message);
      //   }
      // }
      if (error.response) {
        console.log('ERR =>> ', error.response.data);
        onCategoryFailure(error.response.status);
        if (error.response.status !== 404) {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'NetWork Error!',
            text2: `500`,
            visibilityTime: 5000,
            autoHide: true,
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
        onCategoryFailure(error.request.status);

        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log("getDataAgainstCnic error.request: ", error.request);
        // console.log(e)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Unknown error: ', error);
        onCategoryFailure(error.request.status);
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

export async function isVerified(onSuccess, onFailure) {
  const header = await getHeaders().then(data => {
    return data;
  });
  console.log('HEADERS ->>', header);
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  console.log('Config ==>', Config);
  const URL = `${baseUrl}${endpoint.user.isVerified}`;
  console.log('baseURL1 ==>', URL);

  axios
    .get(URL, header)
    .then(res => {
      console.log("RRRR ->> ",res.data)
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: res.data.Message,
        text2: res.data.Success,
        visibilityTime: 5000,
        autoHide: true,
      });
      onSuccess(res.data);
    })
    .catch(error => {
      console.log(error, 'Error...');

      if (error.response) {
        onFailure(error.response.status);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // onFailure(error.request.status);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: error.response.data.Message,
          text2: `${error.response.status}`,
          visibilityTime: 5000,
          autoHide: true,
        });

        console.log('error.response: ', error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
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
}

// export default {getAllVehicles,getAllCategories};

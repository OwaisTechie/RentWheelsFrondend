import axios from 'axios';
import {Config} from '../../../Config/Config';
import {getHeaders} from '../../../Constant/requestHeaders';
import Toast from 'react-native-toast-message';

export async function verifyUser(Payload, onSuccess, onFailure) {
  const header = await getHeaders().then(data => {
    return data;
  });
  console.log('HEADERS ->>', header);
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  console.log('Config ==>', Config);
  const URL = `${baseUrl}${endpoint.bookings.approveReject}`;
  console.log('baseURL1 ==>', URL);

  axios
    .post(URL, Payload, header)
    .then(res => {
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
export async function updateProfile(Payload, onSuccess, onFailure) {
  const header = await getHeaders('multipart').then(data => {
    return data;
  });
  console.log('HEADERS ->>', header);
  console.log('Payload.profilePicture.path   ->>', Payload.profilePicture.path);
  
  const formData = new FormData();
  formData.append('username', Payload.username);
  formData.append('email', Payload.email);
  formData.append('phone', Payload.phone);
  formData.append('profilePicture', {
    name: Payload.profilePicture.path.split('/').pop(),
    type: Payload.profilePicture.mime,
    uri:
      Platform.OS === 'android'
        ? Payload.profilePicture.path
        : Payload.profilePicture.path.replace('file://', ''),
  });

  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  const URL = `${baseUrl}${endpoint.user.updateProfile}`;
  console.log('baseURL1 ==>', URL);

  axios
    .post(URL, formData, header)
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

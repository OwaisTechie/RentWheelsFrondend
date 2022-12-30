import axios from 'axios';
import {Config} from '../../../Config/Config';
import Toast from 'react-native-toast-message';
import {getHeaders} from '../../../Constant/requestHeaders';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function loginRequest(payload, onSuccess, onFailure){
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  console.log('baseURL ==>', baseUrl);
  console.log('Config ==>', Config);
  const URL = `${baseUrl}${endpoint.user.login}`;
  console.log('baseURL1 ==>', URL);
  console.log('Payload =>> ', payload);

  axios
    .post(URL, payload)
    .then(res => {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Success',
          text2: 'Successfully Logged In',
          visibilityTime: 2000,
          autoHide: true,
        });
        let header = res.headers['set-cookie'][0];
        console.log('TOKEN =>> ', header);
        let Token = header.split('=')[1].split(';')[0].trim();
        console.log(Token);

        res['Token'] = Token;

        onSuccess(res);
        
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
};
export function forgotPassword(payload, onSuccess, onFailure){
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;

  const URL = `${baseUrl}${endpoint.user.forgotPassword}`;
  console.log('baseURL1 ==>', URL);
  console.log('Payload =>> ', payload);

  axios
    .post(URL, payload)
    .then(res => {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Success',
          text2: res.data.Message,
          visibilityTime: 5000,
          autoHide: true,
        });
        console.log("Response => ",res)
        onSuccess(res);
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
};
export function verifyOtp(payload, onSuccess, onFailure){
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;

  const URL = `${baseUrl}${endpoint.user.verifyOtp}`;
  console.log('baseURL1 ==>', URL);
  console.log('Payload =>> ', payload);

  axios
    .post(URL, payload)
    .then(res => {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Success',
          text2: res.data.Message,
          visibilityTime: 5000,
          autoHide: true,
        });
        let header = res.headers['set-cookie'][0];
        console.log('TOKEN =>> ', header);
        let Token = header.split('=')[1].split(';')[0].trim();
        console.log(Token);

        res['Token'] = Token;

        onSuccess(res);
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
};
export async function  changePassword(payload, onSuccess, onFailure){
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;

  const URL = `${baseUrl}${endpoint.user.changePassword}`;
  console.log('baseURL1 ==>', URL);
  console.log('Payload =>> ', payload);

  const header = await getHeaders()
  .then(data => {return data})
  axios
    .post(URL, payload,header)
    .then(res => {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Success',
          text2: res.data.Message,
          visibilityTime: 5000,
          autoHide: true,
        });
        onSuccess(res);
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
};


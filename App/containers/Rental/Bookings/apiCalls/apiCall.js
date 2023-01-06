import axios from 'axios';
// import config from "../../../../config";
import {Config} from '../../../../Config/Config';
import Toast from 'react-native-toast-message';
import {getHeaders} from '../../../../Constant/requestHeaders';

export async function getRentalBookings(onSuccess, onFailure) {
  const header = await getHeaders().then(data => {
    return data;
  });
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  console.log('baseURL ==>', baseUrl);
  const URL = `${baseUrl}${endpoint.bookings.getmybookings}?isBooking=true&isRenter=true`;
  console.log('baseURL1 ==>', URL);

  axios
    .get(URL, header)
    .then(res => {
      console.log("Res Data ->> ",res.data)
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
export async function approveRejectBooking(Payload, onSuccess, onFailure) {
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

      console.log("APPROVE ->> ",res.data);
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: res.data.Message,
        text2: `${res.data.responseCode}`,
        visibilityTime: 10000,
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
export async function startRental(Payload, onSuccess, onFailure) {
  const header = await getHeaders().then(data => {
    return data;
  });
  console.log('HEADERS ->>', header);
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  console.log('Config ==>', Config);
  const URL = `${baseUrl}${endpoint.bookings.startrental}`;
  console.log('baseURL1 ==>', URL);

  axios
    .post(URL, Payload, header)
    .then(res => {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: res.data.Message,
        text2: res.data.status,
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

export async function activeRentals(onSuccess, onFailure) {
  const header = await getHeaders().then(data => {
    return data;
  });
  console.log('HEADERS ->>', header);
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  console.log('Config ==>', Config);
  const URL = `${baseUrl}${endpoint.bookings.getmybookings}?isBooking=false&isRenter=true`;
  console.log('baseURL1 ==>', URL);

  axios
    .get(URL, header)
    .then(res => {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: res.data.Message,
        text2: res.data.status,
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


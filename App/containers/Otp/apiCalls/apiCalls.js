import axios from 'axios';
// import config from "../../../../config";
import {Config} from '../../../Config/Config';
import Toast from 'react-native-toast-message';
import {getHeaders} from '../../../Constant/requestHeaders';
// const defaultPageSize = 10;
// const defaultPageNumber = 1;
// // const defaultStartingDate = new Date();
// // const defaultEndingDate = new Date();
// const defaultOrderBy = 'stampDate';
// const defaultisAsc = 'true';

// const defaultSearchCriteria = {
//   username: '',
//   status: '',
//   fromAccount: '',
//   stan: '',
//   mobileNo: '',
//   toBank: '',
//   rrn: '',
//   companyName: '',
// };

const registeration = (payload, onSuccess, onFailure) => {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  console.log('baseURL ==>', baseUrl);
  console.log('Config ==>', Config);
  const URL = `${baseUrl}${endpoint.user.register}`;
  console.log('baseURL1 ==>', URL);
  console.log('Payload =>> ', payload);
  
  axios
    .post(URL, payload)
    .then((res) => {
      // const { data } = res.data;
      console.log("Response ==> ", res.data);
      if (res.status === 200) {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Registration Succeeded',
          text2: 'Please login into your account',
          visibilityTime:5000,
          autoHide :true
        });
        onSuccess(res.data.Payload);
        // console.log(`onSuccess Passing : ${JSON.stringify({cnic:cnic,...res.data})}`)
      }
      // else{
      //   Toast.show({
      //     topOffset: 60,
      //     type: 'success',
      //     text1: res.data.Message,
      //     text2: res.data.status,
      //     visibilityTime:5000,
      //     autoHide :true
      //   });
      //   onFailure(error.request.status); 
      // }
    })
    .catch((error) => {
      console.log(error, "Error...");
      
      if (error.response) {
        onFailure(error.response.status); 
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // onFailure(error.request.status);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: error.response.data.Message ,
          text2: `${error.response.status}`,
          visibilityTime:5000,
          autoHide :true
        });
        
        console.log("error.response: ", error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);      
      } else if (error.request) {
        console.log("error.request: ", error.request);
        // let errorRes = error.request._response ? error.request.response.Message : ;
        // 'Server Not Found!'
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Server Not Found!',
          text2: `${error.request.status}`,
          visibilityTime:5000,
          autoHide :true
        });
        onFailure(error.request.status); 
        
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log("getDataAgainstCnic error.request: ", error.request);
        // console.log(e)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Unknown error: ", error);
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

export default registeration;

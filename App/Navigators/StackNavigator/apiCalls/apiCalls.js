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

const  AuthToken = async (onSuccess, onFailure) => {
  console.log("AUTHTOKEN")
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  const URL = `${baseUrl}${endpoint.user.isValidToken}`;
  console.log('baseURL1 ==>', URL);

  const header = await getHeaders()
  .then(data => {return data})

  axios
    .get(URL,header)
    .then(res => {
        console.log("RESDATA =>> ",res.data)
          console.log("onSuccess")
          onSuccess(res.data,header);      

    })
    .catch(error => {
      console.log(error, 'Error...');
      
      if (error.response) {
        // if()
        console.log('error.response: ', error);
        onFailure();
        // error
        if(error.message === "Network Error"){
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: `${error.message}`,
            text2: 'Looks like you are having an Internet Issue!',
            visibilityTime: 5000,
            autoHide: true,
          });
        }
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
          text2: `${error.request}`,
          visibilityTime: 5000,
          autoHide: true,
        });
        onFailure();

        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log("getDataAgainstCnic error.request: ", error.request);
        // console.log(e)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Unknown error: ', error);
        onFailure();
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

export default AuthToken;

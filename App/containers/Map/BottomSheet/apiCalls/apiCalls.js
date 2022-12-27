import { Config } from '../../../../Config/Config';
import Toast from 'react-native-toast-message';
import axios from 'axios';
export function getNearByLocation(payload,onSuccess, onFailure) {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint.vehicles.nearByVehicle;
  const URL = `${baseUrl}${endpoint}`;
  // const CancelToken = axios.CancelToken;
  // const source = CancelToken.source();
  // console.log("timeout ->> ",timeout)
  // let id =
  //   timeout &&
  //   setTimeout(() => {
  //     id = 0;
  //     source.cancel(`Timeout of ${timeout}ms.`);
  //   }, timeout);
  axios
    .get(URL, {
      // cancelToken: source?.token,
      params: {pickupLocation: payload[0] + ',' + payload[1]},
    },{timeout: 1000 * 5}
    )
    // .get(URL,{ params: `selfDriveCharges.selfDriveDailyCharges[gte]=${payload.noOfSeats}||noOfSeats=${payload.noOfSeats}||noOfDoors${payload}`})
    .then(res => {
      // if (res.data.responseCode === 200) {

      // Toast.show({
      //   // topOffset: 30,
      //   topOffset: 60,
      //   type: 'success',
      //   text1: `Success ${res.data.responseCode}`,
      //   text2: res.data.Message,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      onSuccess(res.data.Payload);
      // console.log(`onSuccess Passing : ${JSON.stringify({cnic:cnic,...res.data})}`)
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
    if (axios.isCancel(error)) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Request TimeOut!',
        text2: `500`,
        visibilityTime: 5000,
        autoHide: true,
      });
      console.log('Request canceled', error.message);
    }
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
    }).finally(() => {
      id && clearTimeout(id);
    });
};
export function getVehicle(payload, onSuccess, onFailure) {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint.vehicles.getAllVehicles;
  const URL = `${baseUrl}${endpoint}?selfDriveCharges.selfDriveDailyCharges[gte]=60&selfDriveCharges.selfDriveDailyCharges[lte]=70&vehicleType=SUV&isAutomatic=true&isAircondition=true&fuelType=Petrol&pickupLocation=67.15148915985498,24.938165058441033`;

  console.log("URL ->> ",URL)
  console.log("payload ->> ",payload)
  axios
    .get(URL
      // , 
    //   {
    //   // cancelToken: source?.token,
    //   params: `selfDriveCharges.selfDriveDailyCharges[gte]=${payload?.startPrice}&elfDriveCharges.selfDriveDailyCharges[lte]=${payload.endPrice}`
    // }
    )
    // .get(URL,{ params: `selfDriveCharges.selfDriveDailyCharges[gte]=${payload.noOfSeats}||noOfSeats=${payload.noOfSeats}||noOfDoors${payload}`})
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
      // console.log(`onSuccess Passing : ${JSON.stringify({cnic:cnic,...res.data})}`)
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


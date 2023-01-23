import axios from 'axios';
// import config from "../../../../config";
import {Config} from '../../../../Config/Config';
import Toast from 'react-native-toast-message';
import { getHeaders } from '../../../../Constant/requestHeaders';


export function getVehicleCategies(onSuccess, onFailure) {
  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  console.log('baseURL ==>', baseUrl);
  console.log('Config ==>', Config);
  const URL = `${baseUrl}${endpoint.vehicles.getVehiclesCategory}`;
  console.log('baseURL1 ==>', URL);

  axios
    .get(URL)
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
export async function addVehicle(payload,onSuccess, onFailure) {

  const baseUrl = Config.baseUrl.main;
  const endpoint = Config.endpoint;
  console.log('baseURL ==>', baseUrl);
  console.log('payload ==>', payload);

  const formData = new FormData();
    formData.append('vehicleOwner', payload.userId);
    formData.append('vehicleCategory', payload.vehicleCategory);
    formData.append('brand', payload.brand);
    formData.append('model', payload.model);
    formData.append('year', payload.yearItems);
    formData.append('registrationNumber', payload.registrationNumber);
    formData.append('vehicleType', payload.vehicleType);
    formData.append('pickupLocation[0]', payload.pickupLocation[0]);
    formData.append('pickupLocation[1]', payload.pickupLocation[1]);
    formData.append('description', payload.description);
    formData.append('noOfSeats', payload.noOfSeats);
    formData.append('fuelType', payload.fuelType);
    formData.append('noOfAirbags', payload.noOfAirbags);
    formData.append('isAutomatic', payload.isAutomatic);
    formData.append('noOfDoors', payload.noOfDoors);
    formData.append('isAircondition', payload.isAircondition);
    formData.append('selfDriveDailyCharges', payload.selfDriveDailyCharges);
    for (let i = 0; i < payload?.images?.length; i++) {
      formData.append('images', {
        name: payload.images[i].image.split('/').pop(),
        type: payload.images[i].mime,
        uri:
        payload.images[i].image
      });
    }
    for (let i = 0; i < payload?.vehicleInsurance?.length; i++) {
      formData.append('vehicleInsurance', {
        name: payload.vehicleInsurance[i].image.split('/').pop(),
        type: payload.vehicleInsurance[i].mime,
        uri:
        payload.vehicleInsurance[i].image
      });
    }
    for (let i = 0; i < payload?.vehiclePapers?.length; i++) {
      formData.append('vehiclePapers', {
        name: payload.vehiclePapers[i].image.split('/').pop(),
        type: payload.vehiclePapers[i].mime,
        uri:
        payload.vehiclePapers[i].image
      });
    }

  const URL = `${baseUrl}vehicles`;
  console.log('baseURL1 ==>', URL);
  const header = await getHeaders('multipart').then(data => {
    return data;
  });
  axios
    .post(URL,formData,header)
    .then(res => {
      console.log("RES>DATA ->> ",res.data)
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Success',
        text2: res.data.Message,
        visibilityTime: 5000,
        autoHide: true,
      });
      onSuccess(res.data);
    })
    .catch(error => {
      console.log(error, 'Error...');

      if (error.response) {
        onFailure(error.response.status);
        console.log("error.response ->> ",error.response);
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

        console.log('error.response: ', error.response.data);
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

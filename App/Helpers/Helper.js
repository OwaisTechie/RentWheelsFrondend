import * as yup from "yup";
import {Dimensions} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
const width = Dimensions.get('screen').width;
const heighto = Dimensions.get('screen').height;
export const btnStandard = width / 3;
export const btnStandardHeight = 45;
export const textFieldHeight = 45;

const cnicRegex =
  /^[+]*[(]{0,1}[0-9]{5}[-]{1}[0-9]{7}[-]{1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

const mobileNumberRegex =
  // /^((\+92)|(0092))-{0,1}\d{3}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
  // /^03[0-9]{2}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
  /^03[0-9]{2}[0-9]{7}[-\s./0-9]*$/;
// /^03[0-9]{0,9}$/;

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const cnicMask = [
  /^[0-9+]/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /[0-9+]/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /[0-9]$/
];

const mobileNumberMask = [
    /[+]/,
  /[9]/,
  /[2]/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const cnicYupValidation = yup
  .string()
  .matches(cnicRegex, "Invalid cnic number")
  .min(15, "Invalid cnic number")
  .required("cnic is required");

const mobileYupValidation = yup
  .string()
  .matches(mobileNumberRegex, "Invalid mobile number")
  .min(11, "Invalid mobile number")
  .required("mobile number is required");

const dateYupValidation = yup
  .string()
  .matches(dateRegex, "Invalid date")
  .min(10, "Invalid date")
  .required("date is required");

const pinValidation = yup.string().required("Pin is required");

const headerInfo = {
  device_Token: "dasd",
  device_Type: "Browser",
  device_ID: "ipaddress1",
  device_Version: "0.0.1",
  token_Id: "abcd",
  channel: "INTERNET_BANKING",
  access_control_request_headers: "authorization",
};

const isFirstTimeloging = false;

// const requestUrls = {
//   //Authentication Controller
//   authenticate: `${baseURL}authenticate`,
//   verifyDevice: `${baseURL}my/otpWithSmsAndEmail/device-verification`,
//   accountOverview: `${baseURL}my/accountOverview`,
//   accountsList: `${baseURL}my/accounts`,
//   accountTitleFetch: `${baseURL}transfer/titlefetch`,
//   verifyAccount: `${baseURL}my/account`,
//   accountStatement: `${baseURL}my/statement/`,
// };

const messages = {
  unlinkAccount: "Account unlink successfully",
};

const errorResponseCode = [
  "641",
  "615",
  "614",
  "606",
  "605",
  "632",
  "607",
  "02",
  "608",
  "99",
  "647",
  "616",
  "100",
  "43",
  "613",
  "95",
  "635",
  "01",
  "65",
  "658",
  "92",
];

const statusCode = {
  SUCCESS: 200,
};

// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     return getToken();
//   }
//   else{
//     console.log("NOT AUTHORIZED")
//   }
// }

// async function getToken(){
//   let token = await AsyncStorage.getItem("fcmtoken");
//   if(!token){
//     try{
//       await messaging().registerDeviceForRemoteMessages();
//       const token = await messaging().getToken();
//       console.log("firebaseToken -> ",token)
//       if(token){
//         console.log('New Token ->>',token)
//         AsyncStorage.setItem("fcmtoken",token)
//       }
//     }
//     catch(error){
//       console.log(error,"error in fcmtoken")
//     }
//   }
//   return token;
// }

// const NotificationListner = () => {
//   // Assume a message-notification contains a "type" property in the data payload of the screen to open

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   // Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });

//     messaging().onMessage(async remoteMessage => {
//       console.log('notification on foreground state....',remoteMessage)
//     })
// }

export {
  cnicRegex,
  mobileNumberRegex,
  dateRegex,
  cnicMask,
  mobileNumberMask,
  cnicYupValidation,
  mobileYupValidation,
  dateYupValidation,
  pinValidation,
  headerInfo,
  isFirstTimeloging,
  // requestUserPermission,
  // NotificationListner,
//   requestUrls,
  messages,
  errorResponseCode,
  statusCode,
};


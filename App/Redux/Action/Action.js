// import * as actionTypes from './types';
// import store from '../Store/Store';
// import axios from 'axios';

// //loader function
// export const globalLoaderState = (state) => async (dispatch) => {
//   dispatch({
//     type: actionTypes.SET_LOADER,
//     payload: state,
//   });
// };

// export const globalAlertState = (state, text) => async (dispatch) => {
//   dispatch({
//     type: actionTypes.SET_ALERT_STATE,
//     payload: state,
//   });
//   dispatch({
//     type: actionTypes.SET_ALERT_TEXT,
//     payload: text,
//   });
// };

// export const changeActiveDeliveryState = (state) => async (dispatch) => {
//   dispatch({
//     type: actionTypes.SET_ACTIVE_ORDER_STATE,
//     payload: state,
//   });
// };
// export const pcakgeItemList = (state) => async (dispatch) => {
//   // console.log('inside action ', state);
//   dispatch({
//     type: actionTypes.SET_PACKAGE_LIST,
//     payload: state,
//   });
// };
// export const userInfo = (state) => async (dispatch) => {
//   dispatch({
//     type: actionTypes.SET_USER_INFO,
//     payload: state,
//   });
// };

// export const changePackKey = (state) => async (dispatch) => {
//   // console.log(state);
//   dispatch({type: actionTypes.SET_PACKAGE_KEY, payload: state});
// };

// export const postMethod = (Url, body, responseSucces, responseError) => async (
//   dispatch,
// ) => {
//   //laoder true
//   // globalLoaderState(true);
//   dispatch(globalLoaderState(true));
//   const token = '';
//   axios
//     .post(
//       Url,
//       body,

//       {
//         header: {
//           // key: token,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       },
//     )
//     .then((response) => {
//       if (response) {
//         responseSucces(response);

//         console.log('asdas', response.data);
//       }
//     })
//     .catch((response) => {
//       responseError(response);
//       console.log('error ', response);
//     });
// };

// export const getMethod = (Url, body, responseSucces, responseError) => async (
//   dispatch,
// ) => {
//   console.log('body', body);
//   //laoder true
//   // globalLoaderState(true);
//   dispatch(globalLoaderState(true));
//   const token = '';
//   axios
//     .get(Url, body, {
//       header: {
//         // key: token,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     })
//     .then((response) => {
//       if (response) {
//         responseSucces(response);

//         console.log('get method response ', response.data);
//       }
//     })
//     .catch((response) => {
//       responseError(response);
//       console.log('error ', response.data);
//     });
// };

// export const changeUserinfo = (state) => async (dispatch) => {
//   dispatch({
//     type: actionTypes.SET_USER_INFO,
//     payload: state,
//   });
// };

// export const putMethod = (Url, body, responseSucces, responseError) => async (
//   dispatch,
// ) => {
//   //laoder true
//   // globalLoaderState(true);
//   dispatch(globalLoaderState(true));
//   const token = '';
//   axios
//     .put(
//       Url,
//       body,

//       {
//         header: {
//           // key: token,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       },
//     )
//     .then((response) => {
//       if (response) {
//         responseSucces(response);

//         console.log('asdas', response.data);
//       }
//     })
//     .catch((response) => {
//       responseError(response);
//       console.log('error ', response);
//     });
// };

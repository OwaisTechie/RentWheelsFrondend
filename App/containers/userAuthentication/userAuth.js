// import {useMemo} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useContextValue} from '../../Context/MainProvider';

// export const userAuth = () => {
//   const [{users}, dispatch] = useContextValue();
//   const useLogin = useMemo(
//     () => ({
//       signIn: async data => {
//         if (data) {
//           console.log('SignIn', data);
//           try {
//             await AsyncStorage.setItem('userToken', data.Token);
//           } catch (e) {
//             console.log('ERR ', e);
//           }
//         }
//         dispatch({
//           type: 'LOGIN',
//           user: {
//             isLoading: false,
//             userId: data.userId,
//             userToken: data.userToken,
//           },
//         });
//       },
//       signOut: async () => {
//         try {
//           await AsyncStorage.removeItem('userToken');
//         } catch (error) {
//           console.log('ERR ', error);
//         }
//         dispatch({type: 'LOGOUT'});
//       },
//       signUp: async () => {
//         dispatch({type: 'REGISTER'});
//       },
//     }),
//     [],
//   );

//   return useLogin;
// };

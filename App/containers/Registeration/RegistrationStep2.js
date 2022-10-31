// import React, {useState} from 'react';
// import {
//   View,
//   Dimensions,
//   KeyboardAvoidingView,
//   ScrollView,
//   Image,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import styles from './RegistrationStyle';
// import CustomTextField from '../../Components/CustomTextField/CustomTextField';
// import CustomBtn from '../../Components/Custom_btn/Custom_btn';
// import {Colors, Images} from '../../Theme';
// import {btnStandard} from '../../Helpers/Helper';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {postMethod, globalLoaderState} from '../../Redux/Action/Action';
// import {Config} from '../../Config/Config';
// import {globalAlertState} from '../../Redux/Action/Action';
// import {useDispatch} from 'react-redux';

// // import CustomDropdown from '../../Components/CustomDropdown/CustomDropdown'
// const width = Dimensions.get('screen').width;
// const heighto = Dimensions.get('screen').height;

// export default function Registration(props) {
//   const dispatch = useDispatch();
//   const [pass, changepass] = useState('');
//   const [pass2, changepass2] = useState('');
//   const responseObj = props.route.params.responseObj;
//   // const res = props.route.params.response._parts[];

//   // console.log(res);

//   const upperComponent = () => {
//     return (
//       <View>
//         <View style={{height: heighto / 5, justifyContent: 'center'}}>
//           <TouchableOpacity
//             style={{marginLeft: 10}}
//             onPress={() => {
//               props.navigation.goBack();
//             }}>
//             <Icon
//               size={width / 10}
//               color={'grey'}
//               name={'ios-arrow-back-circle'}
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.loginRegiesterText}>Registration</Text>
//       </View>
//     );
//   };
//   const userRegisteration = () => {
//     return (
//       <View>
//         {/* <CustomDropdown/> */}

//         <View style={styles.gap}></View>

//         <View style={styles.gap}></View>
//         <CustomTextField
//           ispass={true}
//           placeholder={'Enter Password'}
//           Textfield_label={'Enter Password'}
//           onChangeText={(value) => {
//             // console.log(value);
//             changepass(value);
//           }}
//         />
//         <View style={styles.gap}></View>
//         <CustomTextField
//           ispass={true}
//           placeholder={'Enter Re-Entered Password'}
//           Textfield_label={'Enter Re-Entered Password'}
//           onChangeText={(value) => {
//             changepass2(value);
//           }}
//           // masked={'[0000]-[0000000]-[0]'}
//         />
//         <View style={styles.gap}></View>

//         <View style={styles.gap}></View>
//         <CustomBtn
//           btn_txt={'Register'}
//           onPress={() => {
//             if (pass == '' || pass == '') {
//               dispatch(globalAlertState(true, 'Fields are empty'));
//             } else {
//               if (pass == pass2) {
//                 //call start
//                 const url = `${Config.baseUrl.main}${Config.endpoint.register}`;
//                 responseObj.roll = 'd';
//                 responseObj.password = pass;
//                 responseObj.pass_confirm = pass2;
//                 responseObj.current_status = 'new';
//                 console.log('res', responseObj);
//                 dispatch(
//                   postMethod(url, responseObj, (res) => {
//                     if (res.data.responseCode == '00') {
//                       dispatch(globalLoaderState(false));
//                       dispatch(
//                         globalAlertState(
//                           true,
//                           'Account has been created successfully',
//                         ),
//                       );
//                       props.navigation.navigate('Login');
//                     } else {
//                       dispatch(globalLoaderState(false));
//                       dispatch(
//                         globalAlertState(
//                           true,
//                           'Unable To process at this time ',
//                         ),
//                       );
//                     }
//                   }),
//                   () => {
//                     dispatch(
//                       globalAlertState(true, 'Unable To process at this time '),
//                     );
//                   },
//                 );
//                 //call end
//               } else {
//                 dispatch(globalAlertState(true, 'Password didnot match'));
//               }
//             }
//           }}
//           btn_width={btnStandard}
//           backgroundColor={Colors.primary_green}
//         />
//         <View style={styles.gap}></View>
//       </View>
//     );
//   };
//   return (
//     <ImageBackground
//       source={Images.backDropLogin}
//       style={{flex: 1, backgroundColor: 'red'}}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {upperComponent()}
//         {userRegisteration()}
//       </ScrollView>
//     </ImageBackground>
//   );
// }

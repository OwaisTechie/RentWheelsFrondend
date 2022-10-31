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
// import {useDispatch} from 'react-redux';
// import {globalAlertState} from '../../Redux/Action/Action';
// // import CustomDropdown from '../../Components/CustomDropdown/CustomDropdown'
// const width = Dimensions.get('screen').width;
// const heighto = Dimensions.get('screen').height;
// const responseObj = {};
// let response = new FormData();
// response.append('name', 'raffay');
// response.append('id', 'raffay');
// export default function Registration(props) {
//   const dispatch = useDispatch();
//   const [name, changeName] = useState('');
//   const [email, changeEmail] = useState('');
//   const [nic, changeCnic] = useState('');
//   const [number, changenumber] = useState('');

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
//         <CustomTextField
//           placeholder={'Enter Name'}
//           Textfield_label={'Enter Full Name'}
//           onChangeText={(value) => {
//             changeName(value);
//           }}
//           masked={'[000]'}
//         />
//         <View style={styles.gap}></View>
//         <CustomTextField
//           // ispass={true}
//           placeholder={'Enter Email Address'}
//           Textfield_label={'Enter Email Address'}
//           onChangeText={(value) => {
//             changeEmail(value);
//           }}
//           masked={'[0000000000000000]'}
//         />
//         <View style={styles.gap}></View>
//         <CustomTextField
//           placeholder={'Enter CNIC'}
//           Textfield_label={'Enter CNIC'}
//           keyboardType={'numeric'}
//           maxLength={13}
//           onChangeText={(value) => {
//             changeCnic(value);
//           }}
//           masked={'[0000]-[0000000]-[0]'}
//         />
//         <View style={styles.gap}></View>
//         <CustomTextField
//           placeholder={'Enter Mobile Number'}
//           Textfield_label={'Enter Mobile Number'}
//           disabled={true}
//           maxLength={11}
//           keyboardType={'numeric'}
//           onChangeText={(value) => {
//             changenumber(value);
//           }}
//         />
//         <View style={styles.gap}></View>
//         <CustomBtn
//           btn_txt={'Next'}
//           onPress={() => {
//             if (name == '' || email == '' || nic == '' || number == '') {
//               dispatch(globalAlertState(true, 'Fields are empty'));
//             } else {
//               if (nic.length == 13) {
//                 if (number.length == 11) {
//                   responseObj.name = name;
//                   responseObj.email = email;
//                   responseObj.nic = nic;
//                   responseObj.contact_no = number;
//                   console.log(responseObj);
//                   props.navigation.navigate('RegistrationStep2', {responseObj});
//                 } else {
//                   dispatch(globalAlertState(true, 'invalid Phone number '));
//                 }
//               } else {
//                 dispatch(globalAlertState(true, 'Invalid cnic'));
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
//     // <ImageBackground
//       // source={Images.backDropLogin}
//       // style={{flex: 1, backgroundColor: 'red'}}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {upperComponent()}
//         {userRegisteration()}
//       </ScrollView>
//     // {/* </ImageBackground> */}
//   );
// }

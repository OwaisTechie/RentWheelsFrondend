// import React, {useState} from 'react';
// import {View, Dimensions, TouchableOpacity, Text} from 'react-native';
// import {Overlay} from 'react-native-elements';
// import styles from './GlobalAlertStyle';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Colors} from '../../Theme';
// import CustomBtn from '../../Components/Custom_btn/Custom_btn';
// import {globalAlertState} from '../../Redux/Action/Action';
// const width = Dimensions.get('screen').width;
// import {useSelector, useDispatch} from 'react-redux';
// //overlay_state
// //props.onPressClosebtn()
// //props.onPressCancel()
// //props.onPressOkay()
// //alert_text

// const GlobalAlert = (props) => {
//   const dispatch = useDispatch();
//   const globalAlert = useSelector((state) => state.reducers.globalalert);
//   // const [overlay_state,setOverlayState]=useState(false)
//   const globalAlertText = useSelector(
//     (state) => state.reducers.globalAlertText,
//   );
//   return (
//     <Overlay
//       animationType={'slide'}
//       isVisible={globalAlert}
//       overlayStyle={styles.overlay}>
//       <View style={{width: width / 1.19}}>
//         <TouchableOpacity
//           onPress={() => {
//             dispatch(globalAlertState(false, ''));
//             // props.onPressClosebtn();
//           }}>
//           <Icon
//             name={'close-circle'}
//             style={{alignSelf: 'flex-end'}}
//             size={25}
//             color={Colors.primary_green}
//           />
//         </TouchableOpacity>
//       </View>
//       <Icon
//         name={'alert-outline'}
//         size={55}
//         style={{alignSelf: 'center'}}
//         color={Colors.alet_icon}
//       />
//       <View style={styles.gap}></View>
//       <Text style={styles.alert_text}>{globalAlertText}</Text>
//       <View style={styles.gap}></View>
//       <Text
//         style={{
//           alignSelf: 'center',
//           width: width / 1.5,
//           textAlign: 'center',
//           color: Colors.paleorange,
//           margin: 15,
//         }}>
//         {props.alertShortText}
//       </Text>
//       {/* <View style={styles.gap}></View> */}
//       <View style={{flexDirection: 'row', alignSelf: 'center'}}>
//         <CustomBtn
//           btn_txt={'Okay'}
//           onPress={() => {
//             dispatch(globalAlertState(false, ''));
//           }}
//           btn_width={width / 3.5}
//           backgroundColor={Colors.primary_green}
//         />
//       </View>
//     </Overlay>
//   );
// };

// export default GlobalAlert;

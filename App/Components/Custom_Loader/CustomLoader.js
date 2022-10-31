// import React, {useState} from 'react';
// import {View, Text, Modal, Image, Dimensions, StyleSheet} from 'react-native';
// import {Overlay} from 'react-native-elements';
// import {Images} from '../../Theme';
// const width = Dimensions.get('screen').width;
// const height = Dimensions.get('screen').height;
// import {useSelector} from 'react-redux';
// import Lottie from 'lottie-react-native';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// const CustomLoader = props => {
//   // const loader = useSelector((state) => state.reducers.loader);
//   // return loader ? (
//   return (
//     // <View style={styles.fullScreenView}>
//     <View style={styles.loaderView}>
//       <View style={{flexDirection:'column'}}>
//         <Lottie
//           style={{
//             // width: 500,
//             // marginTop: heightPercentageToDP('17%'),
//             // aspectRatio: 300 / 100,
//             // flexGrow: 1,
            
//             alignSelf: 'center',
//           }}
//           // resizeMode="cover"
//           source={require('../../Assets/animations/lf30_editor_r6hsueck.json')}
//           autoPlay
//           loop
//         />
//         <Text
//         style={{
//           // width: width /2 -0,
//           fontSize:20,
//           alignSelf: 'center',
//         }}
//         >
//           Request Processing...
//         </Text>
//       </View>
//     </View>
//   );
//   // : null;
// };
// const styles = StyleSheet.create({
//   fullScreenView: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: widthPercentageToDP('100%'),
//     height: heightPercentageToDP('100%'),
    
//   },
//   loaderView: {
//     width: width,
//     height: height,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',

//     // overflow: 'hidden',
//     position: 'absolute',
//     opacity: 1,
//   },
//   image: {width: '100%', height: '100%'},
// });

// export default CustomLoader;

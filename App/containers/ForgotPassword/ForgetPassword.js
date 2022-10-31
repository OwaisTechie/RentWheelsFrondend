// import React from "react";
// import { View ,Dimensions,KeyboardAvoidingView, ScrollView} from "react-native";
// import styles from './ForgetPassStyle';
// import CustomTextField from '../../Components/CustomTextField/CustomTextField'
// import CustomBtn from '../../Components/Custom_btn/Custom_btn'
// import {Colors} from '../../Theme'

// const heighto = Dimensions.get('screen').height;
// const width = Dimensions.get('screen').width;
// const ForgetPassword = () => {
//     return (
//         <ScrollView style={styles.container}>
//         <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}  >
      
//       <View style={styles.gap}></View>
//         <CustomTextField 
//         placeholder={'eg:***********'}  
//         Textfield_label={'Enter Debit/ATM Card Number'}
//         onChangeText={(value)=>{'Card number :'}}/>
//         <View style={styles.gap}></View>
//         <View style={styles.gap}></View>
//         <CustomTextField placeholder={'eg:****'}  Textfield_label={'Enter Debit/ATM Card Pin'} maxLength={4}
//                onChangeText={(value)=>{'Card number :'}}/>
//         <View style={styles.gap}></View>
//         <View style={styles.gap}></View>
//         <CustomTextField placeholder={'eg:*****-*******-*'}  Textfield_label={'Enter CNIC'}  maxLength={15}
//                onChangeText={(value)=>{'Card number :'}}/>
//         <View style={styles.gap}></View>
//         <View style={styles.gap}></View>
//         <CustomBtn btn_txt={'Submit'} onPress={()=>{console.debug('i am pressed')}} btn_width={width/2} backgroundColor={Colors.primary_green}/>
//         </KeyboardAvoidingView>
//         </ScrollView>
//     );
// };

// export default ForgetPassword;

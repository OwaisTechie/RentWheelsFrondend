import React, {useEffect, useState, useRef,useLayoutEffect,useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CustomButton from '../../Components/Custom_btn/CustomButton';
import {Colors, Images} from '../../Theme';
import Custom_Loader from '../../Components/Custom_Loader/Custom_Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import auth from '@react-native-firebase/auth';
import registeration from './apiCalls/apiCalls';

// import {AuthContext}  from '../../Context/context';
import { userAuth } from '../userAuthentication/userAuth';
const OtpScreen = props => {
 

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  // const [phone, setPhone] = useState('');
  const {registerInfo} = props.route.params;
  console.log("PROPSS",registerInfo.phone)
  const {phone} = registerInfo;

  const {signUp} =userAuth();
  

  // // Handle user state changes
  // const onAuthStateChanged = (user) => {
  //   console.log("USER =>> ",user);
  //   // setUser(user);
  //   // if (initializing) setInitializing(false);
  // }

  useEffect(() => {
    async function signInWithPhoneNumber() {
      try{
         console.log(phone)
         const confirmation = await auth().signInWithPhoneNumber(phone);
         console.log("confirmation =>> ",confirmation)
         setConfirm(confirmation);
       }catch(e){
        alert('Network Error');
      }
     }

    signInWithPhoneNumber();
  }, [])

 

  // useEffect(() => {
  //   const responseObj = props.route.params.responseObj;
  //   console.log('responseObj =>> ', responseObj);
  //   // const subscriber =  auth().onAuthStateChanged(user => {
  //     // if (user) {
  //   console.log("The user is logged in");
    
  //       // make sure to catch any error
  //       // .catch(console.error);
  //   //   } else {
  //   //     console.log("The user is not logged in");
  //   //   }
  //   // });

  //   const signInWithPhoneNumber = async (phoneNumber) => {
  //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //     alert(JSON.stringify(confirmation));
  //     setConfirm(confirmation);
  //     }

  //     signInWithPhoneNumber(responseObj?.phone);
      
  // }, []);

  useEffect(() => {
    console.log("What code",code.length)
    if(code.length == 6){
      console.log("VALIDATION ",code)
      confirmCode();
    }
    else{
      console.log("HEY",code)
    }
  },[code])
  // useEffect(() => {
  //   const responseObj = props.route.params.responseObj;
  //   console.log('responseObj =>> ', responseObj);
  //   const subscriber =  auth().onAuthStateChanged(user => {
  //     if (user) {
  //       console.log("The user is logged in");
  //       signInWithPhoneNumber(responseObj?.phone)
  //       // make sure to catch any error
  //       .catch(console.error);
  //     } else {
  //       console.log("The user is not logged in");
  //     }
  //   });

  //   const signInWithPhoneNumber = async (phoneNumber) => {
  //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //     setConfirm(confirmation);
  //     }
      
     
      
  //     return () => {
  //       subscriber();
  //   };
  // }, []);

  

 

  // useEffect(() => {
  //   if (code.length >= 6 ){
  //     console.log("code Inside",code)
  //     confirmCode();
  //   }
  //   console.log("code",code)
  // },[code])


  // const onOtp = () => {
  //   Keyboard.dismiss;
  //   confirmCode()
  // }


   const confirmCode = async () => {
    try {
      const response = await confirm.confirm(code);
      console.log("RES",response);
      if(response){
        setCode('');
        console.log("RES21213",response);
        setIsLoading(true);
        registeration(registerInfo,onSuccess,onFailure);
      }
    } catch (error) {
      alert("Incorrect Code")
      console.log('Invalid code.',error);
    }
  }

  const onSuccess = (data) => {
    console.log('Success =>> ',data);
    setIsLoading(false);
    props.navigation.navigate('Login');
  }
  const onFailure = () => {
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{overflow: 'hidden'}}>
        {/* <View>
      
        </View> */}
        <View style={styles.Logo}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon
                name="arrow-left"
                style={{fontSize: 30, color: Colors.White}}
              />
            </TouchableOpacity>
          <Icon
            // name="email-seal-outline"
            name="message-lock-outline"
            size={100}
            color="white"
            // style={{justifyContent: 'center', alignItems: 'center'}}
          />
        </View>
      </View>

      <View
        style={[styles.bottonView, {overflow: 'hidden'}]}
        // animation="fadeInUpBig"
        >
        <View
          style={{
            flexDirection: 'row',
            paddingTop: hp('5%'),
            marginBottom: hp('1%'),
          }}>
          <Text style={{fontSize: 30, marginRight: 3, color: Colors.Black}}>
            Verification
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 30, color: Colors.Black}}>
            Code
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 10,
            marginBottom: hp('7%'),
          }}>
          <Text style={{color: Colors.Black}}>
            Please Type the Verification code
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Send to</Text>
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: wp('1%'),
                color: '#EFB250',
              }}>
              {phone}
            </Text>
          </View>
        </View>

        <View style={styles.parentTextInput}>
          <SmoothPinCodeInput
            // placeholder="*"
            // password
            cellSpacing={6}
            cellStyle={{
              borderWidth: 2,
              borderRadius: 24,
              borderColor: Colors.darkgrey,
              backgroundColor: 'white',
              
            }}
            
            cellStyleFocused={{
              borderColor: Colors.darkgrey,
              // color:'black'
              // backgroundColor: 'black',
            }}
            // onFulfill={Keyboard.dismiss}
            // onFulfill={confirmCode}
            textStyle={{
              fontSize: 24,
              // color: 'black',
              color: '#EFB250'
            }}
            // textStyleFocused={{
            //   color: 'White',
            // }}
            autoFocus={true}
            value={code}
            codeLength={6}
            onTextChange={(code) => setCode(code)}
            
          />
          <View style={{alignItems: 'center',marginVertical:hp('5%')}}>
            <Text style={{fontWeight: '15'}}>Didn't Recieve an OTP?</Text>
            <TouchableOpacity style={{marginTop: 15}}>
              <Text
                style={{
                  // textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#EFB250',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#000',
                  fontSize: 15,
                }}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
          <View>
          <CustomButton onPress={() => {confirmCode()}} title="Verify" />
          </View>
        </View>
      </View>
      {isLoading && <Custom_Loader />}
    </SafeAreaView>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: '#161616',
    paddingTop: Platform.OS === 'android' ? 30 : 0, //Android
    // alignItems: 'center',
  },
  parentTextInput: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // width:'100%'
    // justifyContent: 'center',
    // marginVertical: 35,
  },
  bottonView: {
    flex: 4,
    
    backgroundColor: Colors.White,
    alignItems: 'center',
    // bottom:60,
    borderTopLeftRadius: 60,
  },
  inputView: {
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
    // padding: 10,
    fontSize: 20,
    height: 40,
    width: 40,
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 0,
    // justifyContent:'space-between'
  },
  Logo: {
    // alignItems: 'center',
    // paddingRight:20,
    // justifyContent:'center',
    // borderRadius: 100,
    // flex: 1
    marginLeft:5,
    width:wp('60%'),
    marginBottom:hp('1%'),
    flexDirection:'row',
    justifyContent:'space-between',
    // marginTop: 0,
    // alignItems: 'center',
  },
});

export default OtpScreen;

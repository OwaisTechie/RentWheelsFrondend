import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  PermissionsAndroid,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../../Components/CustomTextField/CustomInput';
import {Colors} from '../../../Theme';
import CustomButton from '../../../Components/Custom_btn/CustomButton';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
const OtpScreen = props => {
  let resendOtpTimerInterval;
  let autoSubmitOtpTimerInterval;
  const RESEND_OTP_TIME_LIMIT = 60; // 30 secs
  const [code, setCode] = useState('');

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );


  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const handleSubmit = () => {
    props.OtpHandler(code);
  }

  return (
    <View>
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{alignItems: 'flex-start', marginBottom: 5}}>
                <Text
                  style={{
                    color: Colors.Black,
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  Enter 5 Digits Code
                </Text>
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={{color: Colors.backgroundMedium}}>
                  Enter your digits code that you received on your email.
                </Text>
              </View>

              <View style={{marginVertical: 10, alignItems: 'center'}}>
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
                    color: '#EFB250',
                  }}
                  // textStyleFocused={{
                  //   color: 'White',
                  // }}
                  autoFocus={true}
                  value={code}
                  codeLength={5}
                  onTextChange={code => setCode(code)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginBottom: hp('2%'),
                }}></View>
              <View style={{width: '100%'}}>
                <CustomButton
                  onPress={handleSubmit}
                  loader={props.loader}
                  title="Continue"
                />
              </View>
              <View>
                {resendButtonDisabledTime > 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginBottom: hp('2%'),
                    }}>
                    <Text>Resend OTP in</Text>
                    <Text style={{marginHorizontal:wp('1%') ,fontWeight:'bold',color:Colors.lightPurple }}>{`${resendButtonDisabledTime}s`}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginBottom: hp('2%'),
                    }}>
                    <TouchableOpacity onPress={() => console.log("Resend")}>
                      {/* <Text style={{fontWeight: 'bold', color: '#9A9A9A'}}> */}
                      <Text
                        style={{fontWeight: 'bold', color: Colors.paleorange,textDecorationLine:'underline'}}>
                        Resend
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default OtpScreen;

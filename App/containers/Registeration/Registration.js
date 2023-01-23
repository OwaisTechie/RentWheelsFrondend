import React, {useState, useRef, useEffect} from 'react';
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
  //   StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import styles from './RegistrationStyle';
// import auth from '@react-native-firebase/auth';
import CustomTextField from '../../Components/CustomTextField/CustomTextField';
import CustomInput from '../../Components/CustomTextField/CustomInput';
import CustomButton from '../../Components/Custom_btn/CustomButton';
// import CustomTextField from '../../Components/CustomTextField/CustomTextField';
import CustomBtn from '../../Components/Custom_btn/Custom_btn';
import {Colors, Images} from '../../Theme';
import {btnStandard} from '../../Helpers/Helper';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from 'react-native-reanimated';
import {mobileNumberMask} from '../../Helpers/Helper';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {
  postMethod,
  globalLoaderState,
  globalAlertState,
  changeUserinfo,
} from '../../Redux/Action/Action';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {useDispatch} from 'react-redux';
import Custom_Loader from '../../Components/Custom_Loader/Custom_Loader';
// import {Config} from '../../Config/Config';
import Validation, { registerUser } from '../Registeration/apiCalls/apiCalls';

const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const icon_color = Colors.White;
// import {Config} from '../../Config/Config';
import PhoneInput from 'react-native-phone-number-input';
export default Registration = ({navigation}) => {
  // const dispatch = useDispatch();

  const username = useRef(null);
  const phoneInput = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({});

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Username is Required'),
      phoneInput: Yup.string()
      .required('Mobile No is required!'),
    email: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .email('Invalid Email')
      .required('Email is required!'),
    password: Yup.string()
      .min(6, 'Password must be 6 or more characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .min(6, 'Password must be 6 or more characters long')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  useEffect(() => {
    if (JSON.stringify(registerInfo) !== '{}') {
      Validation(registerInfo, onSuccess, onFailure);
    }
  }, [registerInfo]);

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    submitCount,
    isSubmitting,
    isValid,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneInput: '',
    },
    onSubmit: payload => {
      // const phone = {
      //   phone: payload?.phone.substring(1).replace(/^/, '+92'),
      // };
      
      payload = {
        ...payload,
        phone:formattedValue
      }
      // setRegisterInfo(payload);
      console.log("formattedValue ->> ",payload)
      setIsLoading(false);
      navigation.navigate('OTP', {registerInfo:payload});
      // registerUser(payload12, onSuccess, onFailure)
      // setShowMessage(true);

      // const responseObj = {...payload, ...phone};
      // setIsLoading(true);
    },
  });

  const onSuccess = data => {
    console.log("Data ->> ",data)
    // const { isLoading, islogin } = this.state;
    setIsLoading(false);
    
    // props.navigation.navigate('OTP');
    // let Data = data;
    // this.setState({
    //   editCustomerInitValues: Data,
    //   isLoading: false,
    //   islogin: true,
    // });
  };

  const onFailure = err => {
    console.log('onFailure =>> ', err);
    setIsLoading(false);

    // const { isLoading, islogin } = this.state;
    // let Data = data;
    // this.setState({
    //   editCustomerInitValues: Data,
    //   isLoading: false,
    //   islogin: true,
    // });
  };


  return (
    // Container Start

    <SafeAreaView style={styles.container}>
      {/*  Header */}
      {/* <View style={{flex: 0.5, overflow: 'hidden'}}> */}

      <View style={{height: hp('10%'), overflow: 'hidden'}}>
        <View style={styles.SignView}>
          <View
            style={{
              flex: 2,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                style={{fontSize: 30, color: Colors.White}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 4,
            }}>
            <Text style={styles.brandViewText}>Sign Up</Text>
          </View>
        </View>
      </View>
      {/*  footer View */}

      <Animatable.View
        style={[
          styles.bottonView,
          {paddingHorizontal: wp('5%'), overflow: 'hidden'},
        ]}
        animation="fadeInUpBig">
        <KeyboardAvoidingView
          // behavior="height"
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <View style={{paddingTop: hp('5%'), marginBottom: hp('1%')}}>
                          <Text style={styles.login}>Login</Text>
                        </View> */}

              <View style={{paddingTop: hp('2%'), marginLeft: wp('3%')}}>
                <CustomInput
                  placeholder="Enter your email"
                  iconName="email-check-outline"
                  type="materialCommunity"
                  label="Email"
                  ref={email}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => {
                    username.current?.focus();
                  }}
                  autoCompleteType="off"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  keyboardAppearance="dark"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                />
                <CustomInput
                  ref={username}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  
                  placeholder="Enter your username"
                  iconName="account-key-outline"
                  type="materialCommunity"
                  label="Username"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                />
                <View >
                  <Text
                    style={{
                      marginVertical: hp('1%'),
                      fontSize: 16,
                      color: '#05375a',
                      // color:Colors.grey,
                    }}>
                    Phone
                  </Text>
                </View>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={value}
                  containerStyle={{
                    height: hp('8%'),
                    width: hp('42%'),
                    backgroundColor: Colors.White,
                    borderRadius: 18,
                    borderWidth: 1,
                    marginBottom: hp('1%'),
                    borderColor: Colors.darkgrey,
                  }}
                  textContainerStyle={{
                    backgroundColor: Colors.White,
                    paddingVertical: 6,
                    borderRadius: 18,
                  }}
                  defaultCode="PK"
                  layout="first"
                  onChangeText={handleChange('phoneInput')}
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                  withDarkTheme
                  withShadow
                  // autoFocus
                />
                {errors.phoneInput && (
          <Text
            style={{
              color: '#FF5A5F',
              fontSize: 12,
              paddingBottom: hp('1%'),
              marginHorizontal: wp('3%'),
            }}>
            {errors.phoneInput}
          </Text>
        )}
                {/* <CustomInput
                  ref={phone}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => {
                    password.current.focus();
                  }}
                  placeholder="03XX-XXXXXXX"
                  iconName="cellphone"
                  label="Phone"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={errors.phone}
                  touched={touched.phone}
                  // masked={mobileNumberMask}
                /> */}

                <CustomInput
                  ref={password}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => {
                    confirmPassword.current.focus();
                  }}
                  placeholder="Enter your password"
                  iconName="lock-outline"
                  type="material"
                  label="Password"
                  password
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                />
                <CustomInput
                  ref={confirmPassword}
                  returnKeyType="go"
                  returnKeyLabel="go"
                  // onSubmitEditing={handleSubmit}
                  onSubmitEditing={handleSubmit}
                  placeholder="Enter your confirm Password"
                  iconName="lock-outline"
                  type="material"
                  label="Confirm Password"
                  // autoCompleteType="confirmPassword"
                  password
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
              </View>
              <View>
                <CustomButton  loader={isLoading} onPress={handleSubmit} title="Sign Up" />
              </View>
              <View style={styles.bottonTextView}>
                <Text style={{color: Colors.Black}}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={{fontWeight: 'bold', color: Colors.paleorange}}>
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Animatable.View>
      {isLoading && <Custom_Loader />}
    </SafeAreaView>
  );
};

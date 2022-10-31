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
  Button
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
import Validation from '../Registeration/apiCalls/apiCalls';

const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const icon_color = Colors.White;
// import {Config} from '../../Config/Config';

export default Registration = ({navigation}) => {
  // const dispatch = useDispatch();

  const username = useRef(null);
  const phone = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registerInfo,setRegisterInfo] = useState({});
  // console.log("Config",Config.baseUrl.main)

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Username is Required'),
    phone: Yup.string()
      .min(11, 'Too Short')
      .max(11, 'Phone Number must be less than 12')
      .matches(/^03[0-9]+$/, 'Invalid Mobile No use 03XXXXXXXXX')
      .required('Mobile No is required!'),
    email: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .email('Invalid Email')
      .required('Email is required!'),
    password: Yup.string().min(6,'Password must be 6 or more characters long').required('Password is required'),
    confirmPassword: Yup.string().min(6,'Password must be 6 or more characters long')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  useEffect(() => {
    if(JSON.stringify(registerInfo) !== '{}'){
      Validation(registerInfo,onSuccess,onFailure);
    }
  },[registerInfo])

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
      username: 'owais',
      email: 'owais@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      phone: '03323766916',
    },
    onSubmit: payload => {
      const phone = {
        phone: payload?.phone.substring(1).replace(/^/, '+92'),
      };
      const responseObj = {...payload, ...phone};
      setIsLoading(true);
      setRegisterInfo(responseObj);
    },
  });

  const onSuccess = (data) => {
    // const { isLoading, islogin } = this.state;
    setIsLoading(false);
    navigation.navigate('OTP',{registerInfo});
    // props.navigation.navigate('OTP');
    // let Data = data;
    // this.setState({
    //   editCustomerInitValues: Data,
    //   isLoading: false,
    //   islogin: true,
    // });
  };

  const onFailure = (err) => {
    console.log("onFailure =>> ",err)
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
                  onSubmitEditing={() => {
                    phone.current?.focus();
                  }}
                  placeholder="Enter your username"
                  iconName="account-key-outline"
                  label="Username"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                />
                <CustomInput
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
                />
                <CustomInput
                  ref={password}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => {
                    confirmPassword.current.focus();
                  }}
                  placeholder="Enter your password"
                  iconName="lock-outline"
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
                <CustomButton onPress={handleSubmit} title="Sign Up" />
              </View>
              <View style={styles.bottonTextView}>
                <Text style={{color: Colors.Black}}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={{fontWeight: 'bold', color: '#9A9A9A'}}>
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

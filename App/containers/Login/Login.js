import React, {useState, useRef,useContext, useEffect} from 'react';
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
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import styles from './LoginStyle';
import CustomTextField from '../../Components/CustomTextField/CustomTextField';
import CustomInput from '../../Components/CustomTextField/CustomInput';
import CustomButton from '../../Components/Custom_btn/CustomButton';
// import CustomTextField from '../../Components/CustomTextField/CustomTextField';
import CustomBtn from '../../Components/Custom_btn/Custom_btn';
import {Colors, Images} from '../../Theme';
import {btnStandard} from '../../Helpers/Helper';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
// import {AuthContext} from '../../Context/context';
// import { useContextValue } from '../../Context/MainContextProvider';
import login from './apiCalls/apiCalls';

import {color} from 'react-native-reanimated';
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
import axios from 'axios';
// import {useDispatch} from 'react-redux';
import {Config} from '../../Config/Config';
const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const icon_color = Colors.White;

export default Login = ({navigation}) => {
  // const dispatch = useDispatch();
  // const [{user},dispatch] = useContextValue();
  const [userDeliver, changeLogin] = useState(true);
  const username = useRef(null);
  const password = useRef(null);

  let fromScreen = '';

  // const {signIn} =useContext(AuthContext);
  // const {signIn} =userAuth();

  // useEffect(() => {
  //   axios
  //     .get('http://10.0.115.157:5000/api/v1/users/abc')
  //     .then((res) => {
  //       // const { data } = res.data;
  //       console.log("response ==> ", res.data.status);
  //     })
  //     .catch((error) => {
  //       console.log(error.response, "Error...");
  //     })
  // })

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Username is Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Password is Required'),
  });

  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {username: 'owais', password: '123456'},
      onSubmit: payload => {
        login(payload,onSuccess,onFailure)
        // signIn()
      },
    });

    const onSuccess = (response) => {
      const payload = {
        Token:response.Token,
        user:response.data.Payload
      }
      // signIn(payload)
    }
    const onFailure = () => {
      
    }

  return (
    // Container Start
    <SafeAreaView style={styles.container}>
      {/*  Header */}
      <View style={{flex: 1, overflow: 'hidden'}}>
        <View style={styles.brandView}>
          <Icon
            name={'location-outline'}
            size={30}
            color={icon_color}
            style={styles.icon_style}
          />
          <Text style={styles.brandViewText}>rent wheels</Text>
        </View>
      </View>
      {/*  footer View */}

      <Animatable.View
        
        style={[
          styles.bottonView,
          {paddingHorizontal: wp('4%'), overflow: 'hidden'},
        ]}
        animation="fadeInUpBig"
        >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{paddingTop: hp('5%'), marginBottom: hp('1%')}}>
                <Text style={styles.login}>Login</Text>
              </View>
              <View>
                <CustomInput
                  placeholder="Enter your username"
                  iconName="account-key-outline"
                  label="Username"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => {
                    password.current.focus();
                  }}
                  ref={username}
                  onBlur={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                  onChangeText={handleChange('username')}
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
                <CustomInput
                  placeholder="Enter your password"
                  password
                  autoCompleteType="password"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  ref={password}
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onSubmitEditing={() => {
                    handleSubmit;
                  }}
                  iconName="lock-outline"
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginBottom: hp('2%'),
                }}>
                <TouchableOpacity onPress={() => console.log('hello')}>
                  {/* <Text style={{fontWeight: 'bold', color: '#9A9A9A'}}> */}
                  <Text style={{fontWeight: 'bold', color: Colors.paleorange}}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width:'100%'}}>
                <CustomButton onPress={handleSubmit} title="Login" />
              </View>
              <View style={styles.bottonTextView}>
                <Text style={{color: Colors.Black}}>
                  Don't have any account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Registration')}>
                  {/* <Text style={{fontWeight: 'bold', color: '#9A9A9A'}}> */}
                  <Text style={{fontWeight: 'bold', color: Colors.paleorange}}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Animatable.View>
    </SafeAreaView>
  );
};

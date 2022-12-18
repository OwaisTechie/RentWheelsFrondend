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
import {
  loginRequest,
  forgotPassword,
  verifyOtp,
  changePassword,
} from './apiCalls/apiCalls';

import {color} from 'react-native-reanimated';
import {
  postMethod,
  globalLoaderState,
  globalAlertState,
  changeUserinfo,
} from '../../Redux/Action/Action';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
// import {useDispatch} from 'react-redux';
import {Config} from '../../Config/Config';
import {useDispatch, useSelector} from 'react-redux';
import {login, modeChange} from '../../Redux/auth/Reducer/authReducer';
import FilterModal from '../Map/FilterModal';
import ModalPoup from '../../Components/CustomModal/ModalPopup';
import EmailScreen from './ForgotPasswordScreens/EmailScreen';
import OtpScreen from './ForgotPasswordScreens/OtpScreen';
import ChangePasswordScreen from './ForgotPasswordScreens/ChangePasswordScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {NotificationListner, requestUserPermission} from '../../Helpers/Helper';
import PushNotification, {Importance} from 'react-native-push-notification';
const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
import notifee from '@notifee/react-native';
export default Login = ({navigation}) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const [modalContent, setModalContent] = useState('emailScreen');
  const [scrollOffset, setScrollOffset] = useState(null);
  const icon_color = Colors.White;
  let submitAction = null;
  const {userMode, users} = useSelector(state => state.auth);
  const [userDeliver, changeLogin] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const username = useRef(null);
  const [forgotEmail, setForgotEmail] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const password = useRef(null);
  const [showfilterModal, setShowFilterModal] = useState(false);
  let fromScreen = '';

  const createChannel = channelId => {
    PushNotification.createChannel(
      {
        channelId: channelId, // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const showNotification = (channelId, Options) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.

      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: Options.bigText, // (optional) default: "message" prop
      subText: Options.title, // (optional) default: none
      bigPictureUrl: Options.bigImage, // (optional) default: undefined
      bigLargeIcon: 'ic_launcher', // (optional) default: undefined
      bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
      color: 'green', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      priority: 'high', // (optional) set notification priority, default: high
      // actions: ['Yes', 'No'],

      title: Options.title, // (optional)
      message: Options.bigText, // (required)
    });
  };

  useEffect(() => {
    // async function requestUserPermission() {
    //   const authStatus = await messaging().requestPermission();
    //   const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //   if (enabled) {
    //     console.log('Authorization status:', authStatus);
    //     getToken()
    //   }
    //   else{
    //     console.log("NOT AUTHORIZED")
    //   }
    // }
    getToken();
    NotificationListner();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken();
    } else {
      console.log('NOT AUTHORIZED');
    }
  }

  async function getToken() {
    let token = await AsyncStorage.getItem('fcmtoken');
    if (!token) {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('token', token);
        if (token) {
          console.log('New Token ->>', token);
          setFcmToken(token);

          //   } catch (err) {
          //     //Do nothing
          //     console.log(err.response.data);
          //     return;
          //   }
          AsyncStorage.setItem('fcmtoken', token);
        }
      } catch (error) {
        console.log(error, 'error in fcmtoken');
      }
    }
    return token;
  }

  // function onMessageReceived(message) {
  //   console.log("NOTIFICATION ->> ",message.data.notifee);
  //   notifee.displayNotification(JSON.parse(message.data.notifee));
  // }

  const NotificationListner = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onMessage(async remoteMessage => {
      console.log('RE', remoteMessage);
      console.log('Body ->> ', remoteMessage.notification.android);

      const channelId = Math.random().toString(36).substring(7);
      createChannel(channelId);
      showNotification(channelId, {
        bigImage: remoteMessage.notification.android.imageUrl,
        bigText: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
      });
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  };

  // const sendFcmToken = async () => {
  //   try {
  //     await messaging().registerDeviceForRemoteMessages();
  //     const token = await messaging().getToken();
  //     console.log("TOKEN ->> ",token)
  //     await axios.post('http://192.168.0.107:8000/api/v1/users/noti', {token})
  //     .then((res) => {
  //       console.log("Response ->> ",res.data);
  //     });
  //   } catch (err) {
  //     //Do nothing
  //     console.log(err.response.data);
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   sendFcmToken();
  // }, []);

  // const getToken = async () => {
  //   let firebaseToken = await messaging().getToken();
  //   console.log("firebaseToken -> ",firebaseToken)
  // }
  // const NotificationListner = async () => {

  //   messaging().getInitialNotification().then(remoteMessage => {
  //     if(remoteMessage){
  //       console.log(
  //         'Notification caused app to open from quit state: ',
  //         remoteMessage.notification
  //       )
  //     }
  //   } )
  // }

  const forgotEmailHandler = payload => {
    const data = {
      username: payload.email,
    };
    setForgotEmail(payload.email);
    setLoader(!loader);

    forgotPassword(data, onForgotPasswordSuccess, onForgotPasswordError);
  };
  const OtpHandler = payload => {
    setLoader(!loader);
    const data = {
      username: forgotEmail,
      otp: payload,
    };
    verifyOtp(data, onOtpRequestSuccess, onOtpRequestError);
  };

  const onOtpRequestSuccess = async response => {
    setLoader(false);
    try {
      // const userToken = ['userToken', response.Token];
      // const userMode = ['userMode', 'P'];
      // await AsyncStorage.multiSet([userToken, userMode]);
      await AsyncStorage.setItem('userToken', response.Token);
      await AsyncStorage.setItem('userMode', 'P');
    } catch (error) {
      console.log(error);
    }
    setOtpToken(response.Token);
    setModalContent('changePasswordScreen');
  };
  const onOtpRequestError = () => {
    setLoader(false);
  };

  const changePasswordHandler = payload => {
    setLoader(!loader);
    let data = {
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    };
    changePassword(data, onSuccessChangePassword, onForgotPasswordError);
  };

  const onSuccessChangePassword = async response => {
    await AsyncStorage.clear();
    setLoader(false);
    setShowFilterModal(false);
    // setModalVisible(false);
    setModalContent('emailScreen');
  };

  const MODAL_STATES = {
    emailScreen: (
      <EmailScreen loader={loader} onEmailSubmit={forgotEmailHandler} />
    ),
    otpScreen: <OtpScreen loader={loader} OtpHandler={OtpHandler} />,
    changePasswordScreen: (
      <ChangePasswordScreen
        loader={loader}
        changePasswordHandler={changePasswordHandler}
      />
    ),
  };

  const onForgotPasswordSuccess = payload => {
    setLoader(false);
    setModalContent('otpScreen');
  };
  const onForgotPasswordError = () => {
    setLoader(false);
  };

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
      initialValues: {username: '', password: ''},
      onSubmit: payload => {
        setLoader(!loader);
        var Payload = {
          ...payload,
          firebaseToken: fcmToken,
        };
        // console.log("navigation.navigate --> ",navigation.navigate)
        // navigation.navigate('HomeNavigator');
        loginRequest(Payload, onSuccess, onFailure);
      },
    });

  const onSuccess = async response => {
    const payload = {
      userToken: response.Token,
      user: response.data.Payload,
      isLoading: false,
    };
    console.log("first =>>" ,payload);
    let Mode = {
      user: 'P',
    };
    const userToken = ['userToken', response.Token];
    const userMode = ['userMode', 'P'];
    const userDetail =['userDetail',JSON.stringify(response.data.Payload)]

    try {
      await AsyncStorage.multiSet([userToken,userMode,userDetail]);
      // await AsyncStorage.set('userToken',response.Token);
      // await AsyncStorage.set('userMode',response.Token);
      // await AsyncStorage.set('userDetail',JSON.stringify(response.data.Payload));
    } catch (error) {
      console.log(error);
    }
    dispatch(modeChange(Mode));
    dispatch(login(payload));
    setLoader(false);

    navigation.navigate('AppStack', {screen: 'LeftDrawerScreen'});
    // signIn(payload)
  };
  const onFailure = () => {
    setLoader(false);
  };

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = p => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  const onCloseModal = () => {
    setShowFilterModal(false);
    setLoader(false);
    setModalContent('emailScreen');
  };

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
        animation="fadeInUpBig">
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
                  type="materialCommunity"
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
                  type="materialCommunity"
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
                <TouchableOpacity onPress={() => setShowFilterModal(true)}>
                  {/* <Text style={{fontWeight: 'bold', color: '#9A9A9A'}}> */}
                  <Text style={{fontWeight: 'bold', color: Colors.paleorange}}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <CustomButton
                  loader={loader}
                  onPress={handleSubmit}
                  title="Login"
                />
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

      <ModalPoup visible={showfilterModal} onClose={onCloseModal}>
        {MODAL_STATES[modalContent]}
      </ModalPoup>
    </SafeAreaView>
  );
};

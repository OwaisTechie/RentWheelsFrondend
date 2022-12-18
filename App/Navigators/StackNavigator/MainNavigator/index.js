import React, {
  useEffect,
  useMemo,
  useState,
  useContext,
  useReducer,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AuthToken from '../apiCalls/apiCalls';

import {
  loginReducer,
  initialLoginState,
} from '../../../Redux/auth/Reducer/loginReducer';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from '../../../containers/Login/Login';
import Registration from '../../../containers/Registeration/Registration';
import CustomLoader from '../../../Components/Custom_Loader/CustomLoader';
// import Custom_Loader from '../../Components/Custom_Loader/Custom_Loader';
import AppStack from '../../DrawerNavigator/AppNavigator';
import AuthNavigator from '../AuthNavigator/AuthNavigator';
import LottieView from 'lottie-react-native';
import {Colors, Images} from '../../../Theme';
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from '../../../containers/SplashScreen/SplashScreen';
import OtpScreen from '../../../containers/Otp/OtpScreen';
// import Home from '../../containers/Home/home';
// import {AuthContext} from '../../Components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

import {useContextValue} from '../../../Context/MainContextProvider';
import AppSliderIntro from '../../../containers/AppSliderIntro/AppSliderIntro';
import mainReducer from '../../../Redux/auth/Reducer';
import {AuthContext} from '../../../Context/MainContextProvider';
import { useSelector,useDispatch } from 'react-redux';
import { logout,login,retrieveToken,modeChange } from '../../../Redux/auth/Reducer/authReducer';
// import RentalNavigator from '../../DrawerNavigator/RentalNavigator';
import CustomModal from '../../../Components/CustomModal/CustomModal';
// function HeaderLeft(properties) {
//   console.log('sds', properties);
//   return (
//     <TouchableOpacity
//       style={{alignSelf: 'center', marginLeft: 8}}
//       onPress={() => {
//         properties.onPress();
//       }}>
//       <Icon size={width / 12} color={'grey'} name={'ios-arrow-back-circle'} />
//     </TouchableOpacity>
//   );
// }
// function Headercenter(props) {
//   console.log('PROPS ', props);
//   return (
//     <View style={{alignSelf: 'center'}}>
//       <Text
//         style={{
//           color: Colors.header_left_btn_color,
//           fontWeight: 'bold',
//           alignSelf: 'center',
//           fontSize: 16,
//         }}>
//         {props.children}
//       </Text>
//     </View>
//   );
// }
// function HeaderRight(props) {
//   return <Icon name={'chevron-back'} size={27} color={Colors.White} />;
// }

// const header = {
//   headerStyle: {
//     height: height / 14,
//   },
//   gestureEnabled: false,
//   //...TransitionPresets.ModalPresentationIOS,
//   gestureVelocityImpact: 0.5,
//   gestureDirection: 'vertical',
//   headerTitleStyle: {
//     shadowOpacity: 0,
//     justifyContent: 'space-between',
//     textAlign: 'center',
//   },
//   headerTintColor: Colors.primary_green,
// };

const MainApp = () => {
  const {userMode,users} = useSelector(state => state.auth);
  const [checkInternet,setCheckInternet] = useState(false);
  const dispatch = useDispatch();
  const [modalState,setModalState] = useState(false);
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(netInfo => {
      if(netInfo.isConnected){
        console.log("NETWORK ON")
        check();
      }
      else{
        console.log("NETWORK OFF")
        setModalState(true);
        console.log("INTERNET ISSUE")
      }
    });

    async function check() {
      var userToken = await AsyncStorage.getItem('userToken');
      var userMode = await AsyncStorage.getItem('userMode');
      
      console.log("CHECK ->> ",userMode)
      console.log("userToken -> ",userToken);
      let payload={
        user:userMode
      }
      
      dispatch(modeChange(payload))
      if (userToken != null || userToken != undefined) {
        console.log("HAHA")
        AuthToken(onSuccess, onFailure);
      } else {
        console.log("LOGOUT")
        dispatch(logout());
        // dispatch({type: 'LOGOUT'});
      }
    }
    // Unsubscribe
    unsubscribe();
   
  }, [checkInternet]);

  const onSuccess = async (data, userToken) => {
    // userToken = await AsyncStorage.getItem('userToken', userToken);
    // console.log('ONSUCCESS =>> ', data);
    console.log('ONSUCCESS Token =>> ', userToken.headers);
    var userDetail = await AsyncStorage.getItem('userDetail');
    let Token = userToken.headers.Authorization
    let payload={
      userToken:Token.includes("Bearer") ? Token.substring(7, Token.length - 1) : Token
    }

    let userPayload = {
      userToken: Token.includes("Bearer") ? Token.substring(7, Token.length - 1) : Token,
      user: userDetail,
      isLoading: false,
    }

    dispatch(login(userPayload));
    // dispatch(retrieveToken(payload));
    // dispatch({type: 'RETRIEVE_TOKEN', userToken: payload});
  };
  const onFailure = async () => {
    try {
      console.log("OnFailure")
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.log('ERR ', error);
    }
    dispatch(logout());
  };



  if (users.isLoading) {

    const isModalOpen = () => {
      console.log("first")
        setCheckInternet(true);
        setModalState(false);
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <LottieView
            resizeMode="cover"
            source={require('../../../Assets/animations/lf30_editor_uuvbel7z.json')}
            autoPlay
            loop
          />
          <Text
            style={{
              fontSize: 20,
              marginTop: height / 5,
              color: Colors.lightPurple,
            }}>
            Request Processing...
          </Text>
        </View>

        {modalState && (
        <CustomModal
          visible={modalState}
          modalText = {`looks like you're having internet issues!`}
          modalButtonText={'Close'}
          onPressModal={isModalOpen}
          headtext={'Information'}
        />
      )}
      </View>
     
    );
  }

  return (
    <NavigationContainer>
      {users.userToken == null ? <AuthNavigator /> : <AppStack />}
      {/* <AppStack/> */}
    </NavigationContainer>
  );
};

export default MainApp;

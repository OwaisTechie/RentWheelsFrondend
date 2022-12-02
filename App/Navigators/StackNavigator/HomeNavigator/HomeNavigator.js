import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../../containers/Login/Login';
import Registration from '../../../containers/Registeration/Registration';
import AppSliderIntro from '../../../containers/AppSliderIntro/AppSliderIntro';
import {
  REGISTER,
  LOGIN,
  APPINTRO,
  SPLASH_SCREEN,
  OTP,
} from '../../../Constant/routeName';
import {Colors, Images} from '../../../Theme';
import SplashScreen from '../../../containers/SplashScreen/SplashScreen';
import OtpScreen from '../../../containers/Otp/OtpScreen';
import Home from '../../../containers/Home/Home';
import VehicleInfo from '../../../containers/Vehicle/VehicleDetails';
import Profile from '../../../containers/Profile/Profile';
import VehicleMap from '../../../containers/Vehicle/VehicleMap';
import DateAndLocation from '../../../containers/Booking.js/DateAndLocation';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import VisionCamera from '../../../containers/VisionCamera/VisionCamera';
import PaymentCard from '../../../containers/Card/PaymentCard';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const HomeNavigator = () => {
  function HeaderLeft(properties) {
    console.log('sds', properties);
    return (
      <TouchableOpacity
        style={{alignSelf: 'center', marginLeft: 8}}
        onPress={() => {
          properties.onPress();
        }}>
        <Icon size={width / 12} color={'grey'} name={'ios-arrow-back-circle'} />
      </TouchableOpacity>
    );
  }
  function Headercenter(props) {
    console.log('PROPS ', props);
    return (
      // <View style={{alignItems: 'center',justifyContent:'center'}}>
      <View style={props.style}>
        <Text
          style={{
            color: Colors.lightPurple,
            fontWeight: 'bold',
            alignSelf: 'center',
            fontSize: 16,
          }}>
          {props.children}
        </Text>
      </View>
    );
  }
  function HeaderRight(props) {
    return <Icon name={'chevron-back'} size={27} color={Colors.White} />;
  }

  const header = {
    headerStyle: {
      height: height / 14,
    },
    gestureEnabled: false,
    //...TransitionPresets.ModalPresentationIOS,
    gestureVelocityImpact: 0.5,
    gestureDirection: 'vertical',
    headerTitleStyle: {
      shadowOpacity: 0,
      justifyContent: 'space-between',
      textAlign: 'center',
    },
    headerTintColor: Colors.primary_green,
  };

  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={header}
      initialRouteName={'Home'}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          headerShown: false,
          // headerTitle: props => <Headercenter {...props} />,
          // headerLeft: props => <HeaderLeft {...props} />,
          // headerRight: props => <HeaderRight {...props} />,
        }}
      />
      <HomeStack.Screen
        name="DateAndLocation"
        component={DateAndLocation}
        options={{
          // drawerIcon: ({color}) => (
          //   <Ionicons name="home-outline" size={22} color={color} />
          // ),
          title: 'Date And Location',
          headerShown: true,
          headerTitle: props => <Headercenter {...props} />,
          headerLeft: props => <HeaderLeft {...props} />,
          // headerRight: props => <HeaderRight {...props} />,
        }}
      />
      <HomeStack.Screen
        name={'VehicleInfo'}
        component={VehicleInfo}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="VehicleMap"
        component={VehicleMap}
        options={{
          headerShown: false,
        }}
      />
       <HomeStack.Screen
               name="Card"
               component={PaymentCard}
               options={{
                 headerShown: false,
               }}
              
            />
      <HomeStack.Screen
        name="VisionCamera"
        component={VisionCamera}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;

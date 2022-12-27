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
import Bookings from '../../../containers/Rental/Bookings/Bookings';
import BookingDetails from '../../../containers/Rental/Bookings/BookingDetails';
import CompletedAndOngoing from '../../../containers/Rental/Bookings/OngoingAndCompleted/CompletedAndOngoing';
import CompletedBookingDetails from '../../../containers/Rental/Bookings/OngoingAndCompleted/CompletedBookingDetails';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const OnGoingBookingNavigator = (props) => {
    const {navigation}= props;
  function HeaderLeft(properties) {
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
  function BookingHeaderLeft(props) {
    return (
      <TouchableOpacity
        style={{alignSelf: 'center', marginLeft: 8}}
        onPress={() => {
            navigation.openDrawer();
        }}>
        <Icon size={35} color={Colors.lightPurple} name={'ios-menu-sharp'} />
      </TouchableOpacity>
    );
  }
  function Headercenter(props) {
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

  const BookingStack = createStackNavigator();
  return (
    <BookingStack.Navigator
      screenOptions={header}
      initialRouteName={'Booking'}>
      <BookingStack.Screen
        name="CompletedAndOngoing"
        component={CompletedAndOngoing}
        options={{
            // drawerLabel:'List of Bookings',
            drawerIcon: ({color}) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
            title: 'List of Rentals',
            headerTitle: props => <Headercenter {...props} />,
            headerLeft: props => <BookingHeaderLeft {...props} />
        }}
      />

      <BookingStack.Screen
        name={'CompletedBookingDetails'}
        component={CompletedBookingDetails}
        options={{headerShown: false}}
      />
       <BookingStack.Screen
          name="onGoingBookingDetailsMap"
          component={VehicleMap}
          options={{
            headerShown: false,
          }}
        />
    </BookingStack.Navigator>
  );
};

export default OnGoingBookingNavigator;

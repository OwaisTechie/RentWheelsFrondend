import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from '../../../Theme';

import VehicleMap from '../../../containers/Vehicle/VehicleMap';

import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RenteeCompletedAndOngoing from '../../../containers/RenteeBooking/OngoingAndCompleted/RenteeCompletedAndOngoing';
import RenteeCompletedBookingDetails from '../../../containers/RenteeBooking/OngoingAndCompleted/RenteeCompletedBookingDetails';
import Review from '../../../containers/RenteeBooking/Review/Review';


const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const RenteeOnGoingBookingNavigator = (props) => {
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
        name="RenteeCompletedAndOngoing"
        component={RenteeCompletedAndOngoing}
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
        name={'RenteeCompletedBookingDetails'}
        component={RenteeCompletedBookingDetails}
        options={{headerShown: false}}
      />
      <BookingStack.Screen
        name={'Review'}
        component={Review}
        options={{headerShown: false}}
      />
       <BookingStack.Screen
          name="RenteeonGoingBookingDetailsMap"
          component={VehicleMap}
          options={{
            headerShown: false,
          }}
        />
    </BookingStack.Navigator>
  );
};

export default RenteeOnGoingBookingNavigator;

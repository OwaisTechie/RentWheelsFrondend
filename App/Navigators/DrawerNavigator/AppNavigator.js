import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';

import Profile from '../../containers/Profile/Profile';

import {useSelector, useDispatch} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import CustomDrawer from './CustomDrawer/CustomDrawer';
import {Colors, CustomIcons} from '../../Theme';

import RegisteredVehicles from '../../containers/Rental/RegisteredVehicles/RegisteredVehicles';
import {useNavigation} from '@react-navigation/native';

import RentalVehicle from '../../containers/Rental/RentalVehicle/RentalVehicle';
import Vehicle from '../../containers/Vehicle/Vehicle';
import HomeNavigator from '../StackNavigator/HomeNavigator/HomeNavigator';
import VehicleMap from '../../containers/Vehicle/VehicleMap';
// import FilterDrawerContent from '../../containers/Home/FilterDrawerContent';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import VehicleRegistration from '../../containers/Rental/VehicleRegistration/VehicleRegistration';
import DateAndLocation from '../../containers/Booking.js/DateAndLocation';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../containers/Card/PaymentCard';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const AppStack = () => {
  // const [state, dispatch] = useContext(AuthContext);
  const {userMode, users, isLoading} = useSelector(state => state.auth);
  console.log('USER ->> ', userMode);
  const Drawer = createDrawerNavigator();
  const RightDrawer = createDrawerNavigator();

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
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
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

  function LeftDrawerScreen() {
    return (
      <Drawer.Navigator
        id="LeftDrawer"
        useLegacyImplementation
        // initialRouteName={userMode === 'P' ? 'Home' : 'RenterVehicles'}
        initialRouteName={'HomeNavigator'}
        screenOptions={{
          drawerPosition: 'left',
          // headerShown: false,
          headerTintColor: Colors.lightPurple,
          // headerStyle: {
          //   backgroundColor: 'red',
          // },
          drawerActiveBackgroundColor: Colors.lightPurple,
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: -25,
            fontFamily: 'Roboto-Medium',
            fontSize: 15,
          },
        }}
        drawerContent={props => <CustomDrawer {...props} />}>
        {userMode === 'P' ? (
          <>
            <Drawer.Screen
              name="Card"
              component={Card}
              options={{
                drawerLabel: () => null,
                title: 'Add Card',
                drawerIcon: () => null,
                headerTitle: props => <Headercenter {...props} />,
              }}
            />
            <Drawer.Screen
              name="HomeNavigator"
              component={HomeNavigator}
              options={{
                headerShown: false,
                drawerLabel: 'Home',
                drawerIcon: ({color}) => (
                  <CustomIcons
                    type="ionicon"
                    name="home-outline"
                    size={22}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="AllVehicle"
              component={Vehicle}
              options={{
                headerShown: false,
                drawerLabel: 'Vehicles',
                drawerIcon: ({color}) => (
                  <CustomIcons
                    type="material"
                    name="car-rental"
                    size={25}
                    color={color}
                  />
                ),
                headerTitle: props => <Headercenter {...props} />,
              }}
            />

            {/* <Drawer.Screen name="HomeDrawer" component={RightDrawerScreen} /> */}

            <Drawer.Screen
              name="Profile"
              component={Profile}
              options={{
                drawerIcon: ({color}) => (
                  <CustomIcons
                    type="ionicon"
                    name="person-circle-outline"
                    size={25}
                    color={color}
                  />
                ),
                // headerTitle: props => <Headercenter {...props} />,
                // headerLeft: props => <HeaderLeft {...props} />,
                // headerRight: props => <HeaderRight {...props} />,
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name={'RegisteredVehicles'}
              component={RegisteredVehicles}
              options={{
                drawerIcon: ({color}) => (
                  <Ionicons name="home-outline" size={22} color={color} />
                ),
                title: 'Vehicle Registration',
                headerTitle: props => <Headercenter {...props} />,
              }}
            />
            <Drawer.Screen
              name="RentalVehicle"
              component={RentalVehicle}
              options={{
                // drawerLabel:'Hello',
                drawerIcon: ({color}) => (
                  <Ionicons name="home-outline" size={22} color={color} />
                ),
                headerTitle: props => <Headercenter {...props} />,
                // headerLeft: props => <HeaderLeft {...props} />,
                // headerRight: props => <HeaderRight {...props} />,
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={Profile}
              options={{
                drawerIcon: ({color}) => (
                  <Ionicons name="home-outline" size={22} color={color} />
                ),

                headerTitle: props => <Headercenter {...props} />,
                // headerLeft: props => <HeaderLeft {...props} />,
                // headerRight: props => <HeaderRight {...props} />,
              }}
            />

            {/* <Drawer.Screen
              name={'VehicleRegistration'}
              component={VehicleRegistration}
              options={{headerShown: false}}
            /> */}
          </>
        )}
      </Drawer.Navigator>
    );
  }

  function RightDrawerScreen() {
    return (
      <RightDrawer.Navigator
        useLegacyImplementation
        id="RightDrawer"
        // drawerContent={(props) => <FilterDrawerContent {...props} />}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
        }}>
        <RightDrawer.Screen name="RightDrawer" component={LeftDrawerScreen} />
      </RightDrawer.Navigator>
    );
  }

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return <LeftDrawerScreen />;
};

export default AppStack;

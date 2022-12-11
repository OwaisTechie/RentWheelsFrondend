import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors, Images} from '../../Theme';
import RegisteredVehicles from '../../containers/Rental/RegisteredVehicles/RegisteredVehicles';
// import RentalVehicle from '../../containers/Rental/RentalVehicle/RentalVehicle';
import AppStack from './AppNavigator';
import Profile from '../../containers/Profile/Profile';
import VehicleMap from '../../containers/Vehicle/VehicleMap';

const RentalNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'RegisteredVehicles'}>
      <Stack.Group
        screenOptions={{
          headerStyle: {backgroundColor: 'papayawhip'},
        }}>
        {/* <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
            headerTitle: props => <Headercenter {...props} />,
            headerLeft: props => <HeaderLeft {...props} />,
            headerRight: props => <HeaderRight {...props} />,
          }}
        /> */}

        {/* <Stack.Screen
          name={'Rental'}
          component={RentalVehicle}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name={'RegisteredVehicles'}
          component={RegisteredVehicles}
          options={{headerShown: false}}
        />
       
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RentalNavigator;

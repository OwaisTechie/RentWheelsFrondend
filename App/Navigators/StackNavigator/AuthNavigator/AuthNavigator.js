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
import {Colors, Images} from '../../Theme';
import SplashScreen from '../../../containers/SplashScreen/SplashScreen';
import OtpScreen from '../../../containers/Otp/OtpScreen';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator initialRouteName={APPINTRO}>
      <AuthStack.Screen
        name={SPLASH_SCREEN}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={LOGIN}
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={REGISTER}
        component={Registration}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={OTP}
        component={OtpScreen}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name={APPINTRO}
        component={AppSliderIntro}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

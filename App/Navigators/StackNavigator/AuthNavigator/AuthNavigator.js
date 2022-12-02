import React, { useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const [firstLaunch, setFirstLaunch] = React.useState(null);

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.clear();
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem('appLaunched', 'false');
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  const AuthStack = createStackNavigator();
  return (
    firstLaunch != null && (
      <AuthStack.Navigator initialRouteName={APPINTRO}>
        {firstLaunch && (
          <AuthStack.Screen
            name={APPINTRO}
            component={AppSliderIntro}
            options={{
              headerShown: false,
            }}
          />
        )}

        {/* <AuthStack.Screen
        name={SPLASH_SCREEN}
        component={SplashScreen}
        options={{headerShown: false}}
      /> */}
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
      </AuthStack.Navigator>
    )
  );
};

export default AuthNavigator;

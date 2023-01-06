import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, CustomIcons, Images} from '../../../Theme';
import {AuthContext} from '../../../Context/MainContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector,useDispatch } from 'react-redux';
import { modeChange ,globalLoader, logout} from '../../../Redux/auth/Reducer/authReducer';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const CustomDrawer = props => {
  const [mode, setMode] = useState(true);
  // const [state, dispatch] = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigation =useNavigation();

  const {userMode,isLoading,users:{user}} = useSelector(state => state.auth);
  var  Username;
  var  userProfile;
  if(typeof user == "string"){

    Username=JSON.parse(user);
  }
  else{
    Username=user;
  }
  // useEffect(() => {
  //   let payload;
  //   if (mode) {
  //     console.log("Child True ->> ",mode)
  //     payload = {
  //       modeP: 'P',
  //     };
  //     isMode(payload);
  //     // props.navigation.navigate('PassengerNavigator' , {screen:'Home'});
  //   } else {
  //     console.log("Child False ->> ",mode)
  //     payload = {
  //       modeP: 'R',
  //     };
  //     isMode(payload);
  //     // navigation.navigate('RentalNavigator' , {screen:'Rental'});
  //   }
    
  // }, [mode]);

  const isMode = async (data) => {
  
    if (data) {
  
      try {
        await AsyncStorage.setItem('userMode', data?.user);
      } catch (e) {
        console.log('ERR ', e);
      }
    }

    console.log("data usedatarMode - >>",data)
    dispatch(modeChange(data));
    dispatch(globalLoader(false));
  }

  const logOut = async () => {
    console.log("ssss",navigation)
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log('ERR ', e);
    }
    dispatch(logout())
    navigation.navigate('AuthNavigator', { screen: 'Login' });
  };
  const changeUserMode = async () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
    dispatch(globalLoader(true));
    console.log("CHANGEMODE");
    console.log("changeUserCheck ->> ",userMode)
    
    if (userMode == "P"){
      let payload = {
        user: "R",
      };
      
      isMode(payload)

      console.log("payload userMode - >>",payload)
    }
    else {

      let payload = {
        user: "P",
      };
      
      isMode(payload)
      console.log("payload userMode - >>",payload)
    }
    // setMode(!mode);

  
    // 
    // 
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground source={Images.menu11} style={{padding: 20}}>
          <Image
            source={Username.profilePicture ? Username.profilePicture : Images.menProfile}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {Username.username}
          </Text>
          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              280 Coins
            </Text>
            {/* <FontAwesome5 name="coins" size={14} color="#fff" /> */}
          {/* </View> */} 
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={changeUserMode}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomIcons type='materialCommunity' name="account-convert-outline" size={22} color={Colors.paleorange} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              {userMode === "P" ? 'Rental Mode' : 'Passenger Mode'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} color={Colors.paleorange} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={Colors.paleorange}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
